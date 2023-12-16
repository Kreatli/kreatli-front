import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react';
import { ProfileUnverifiedTooltip } from 'components/profile/Profile/ProfileUnverifiedTooltip';
import { Icon } from 'components/various/Icon';
import { ImagePreview } from 'components/various/ImagePreview';
import { TextEditor } from 'components/various/TextEditor';
import { VideoUploaderModal } from 'components/various/VideoUploaderModal';
import { useImagesUpload } from 'hooks/useImagesUpload';
import { useNotifications } from 'hooks/useNotifications';
import { useSession } from 'hooks/useSession';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { requestPostCreation } from 'services/feed';
import { getErrorMessage } from 'utils/getErrorMessage';

import { VideoPreview } from './VideoPreview';

export const CreatePost = () => {
  const [content, setContent] = React.useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const [videoIds, setVideoIds] = React.useState<string[]>([]);

  const { currentUser } = useSession();
  const { images, getInputProps, getRootProps, removeImage, setImages } = useImagesUpload();
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(requestPostCreation, {
    onSuccess: () => {
      setContent('');
      setImages([]);
      setVideoIds([]);
      queryClient.invalidateQueries('posts');
      pushNotification({
        message: 'The post was published',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleVideoRemove = (id: string) => {
    setVideoIds((ids) => ids.filter((videoId) => videoId !== id));
  };

  const handleVideoUpload = (id: string) => {
    setVideoIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  };

  const handlePublishPost = (key: React.Key) => {
    const media = [
      ...images.map(({ src }) => ({ type: 'image' as const, src })),
      ...videoIds.map((id) => ({ type: 'video' as const, videoId: id, src: `https://www.youtube.com/embed/${id}` })),
    ];

    mutate({
      content,
      isFeedback: key === 'feedbackPost',
      media,
    });
  };

  const isImageUploadDisabled = images.length > 4;
  const isVideoUploadDisabled = videoIds.length > 4;

  return (
    <>
      <Card>
        <CardBody className="px-5 py-2">
          <TextEditor
            value={content}
            namespace="createPost"
            placeholder="Share your thoughts or ask for a feedback..."
            onChange={setContent}
          >
            <Tooltip isDisabled={!isImageUploadDisabled} content="You've already uploaded 5 images, which is the maximum limit allowed">
              <Button
                tabIndex={-1}
                className="text-default-400"
                isDisabled={isImageUploadDisabled}
                isIconOnly
                variant="light"
                size="sm"
              >
                <div {...getRootProps()}>
                  <Icon icon="addImage" size={20} />
                  <input {...getInputProps()} />
                </div>
              </Button>
            </Tooltip>
            <Tooltip isDisabled={!isVideoUploadDisabled} content="You've already uploaded 5 videos, which is the maximum limit allowed">
              <span>
                <Button
                  className="text-default-400"
                  isIconOnly
                  isDisabled={isVideoUploadDisabled}
                  startContent={<Icon icon="addVideo" size={20} />}
                  variant="light"
                  size="sm"
                  onClick={() => setIsVideoModalOpen(true)}
                />
              </span>
            </Tooltip>
          </TextEditor>
          <div className="flex w-full items-end justify-end">
            {(images.length > 0 || videoIds.length > 0) && (
              <div className="flex-1 mt-3 flex gap-2">
                {images.map((image) => (
                  <ImagePreview
                    key={image.src}
                    src={image.src}
                    isLoading={image.isLoading}
                    onRemove={() => removeImage(image.src)}
                  />
                ))}
                {videoIds.map((id) => (
                  <VideoPreview key={id} videoId={id} onRemove={() => handleVideoRemove(id)} />
                ))}
              </div>
            )}
            <ProfileUnverifiedTooltip>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    isLoading={isLoading}
                    radius="full"
                    isDisabled={content.trim() === '' || !currentUser?.isVerified}
                    color="secondary"
                    variant="light"
                    startContent={!isLoading && <Icon icon="send" />}
                  />
                </DropdownTrigger>
                <DropdownMenu variant="flat" onAction={handlePublishPost}>
                  <DropdownItem key="post">
                    Post
                  </DropdownItem>
                  <DropdownItem key="feedbackPost" color="secondary">
                    Feedback Post
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ProfileUnverifiedTooltip>
          </div>
        </CardBody>
      </Card>
      <VideoUploaderModal
        isOpen={isVideoModalOpen}
        onUpload={handleVideoUpload}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
};
