import { Button, Link, Popover, PopoverContent, PopoverTrigger, Textarea, Tooltip } from '@nextui-org/react';
import cx from 'classnames';
import { EmojiPicker } from 'components/various/EmojiPicker';
import { FilePreview } from 'components/various/FilePreview';
import { Icon } from 'components/various/Icon';
import { ImagePreview } from 'components/various/ImagePreview';
import { ChatContext } from 'contexts/Chat/ChatContext';
import { useFilesUpload } from 'hooks/useFilesUpload';
import { useImagesUpload } from 'hooks/useImagesUpload';
import { useIsTouchScreen } from 'hooks/useIsTouchScreen';
import { useNotifications } from 'hooks/useNotifications';
import { useSession } from 'hooks/useSession';
import { omit } from 'ramda';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { requestChatUpdate } from 'services/chat';
import { getErrorMessage } from 'utils/getErrorMessage';

export const AddMessage = () => {
  const editorRef = React.useRef<HTMLInputElement>(null);
  const [isEmojiPickerOpened, setIsEmojiPickerOpen] = React.useState(false);

  const { addMessage, activeChat, participant, participantId } = React.useContext(ChatContext);

  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();
  const { currentUserId } = useSession();
  const isTouchScreen = useIsTouchScreen();
  const {
    images,
    getInputProps: getImageInputProps,
    getRootProps: getImageRootProps,
    removeImage,
    setImages,
  } = useImagesUpload();
  const {
    files,
    getInputProps: getFileInputProps,
    getRootProps: getFileRootProps,
    removeFile,
    setFiles,
  } = useFilesUpload();

  const { mutate: moveRequestToChat } = useMutation(() => requestChatUpdate([participantId!, { isRequest: false }]), {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', participantId]);
      queryClient.invalidateQueries(['chat-requests']);
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const sendMessage = () => {
    const value = editorRef.current?.value ?? '';

    const hasContent = !!value.trim();
    const hasImages = images.length > 0;
    const hasFiles = files.length > 0;

    if (!hasContent && !hasImages && !hasFiles) {
      return;
    }

    const isLoadingImagesOrFiles = [...images, ...files].some(({ isLoading }) => isLoading);

    if (isLoadingImagesOrFiles) {
      return;
    }

    addMessage({
      media: images.map(({ src }) => ({ type: 'image' as const, src })),
      content: editorRef.current?.value.trimStart().trimEnd() ?? '',
      files: files.map(omit(['isLoading'])),
    });
    setImages([]);
    setFiles([]);

    if (editorRef.current) {
      editorRef.current.value = '';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = ({ native }: { native: string }) => {
    const selectionStart = editorRef.current?.selectionStart ?? 0;
    const selectionEnd = editorRef.current?.selectionEnd ?? 0;

    editorRef.current?.setRangeText(native, selectionStart, selectionEnd, 'end');
    editorRef.current?.focus();
  };

  const isImageUploadDisabled = images.length > 4;
  const isFileUploadDisabled = files.length > 4;
  const emojiTriggerClassName = isTouchScreen
    ? 'hidden'
    : 'text-foreground-400';

  const isRequestChat = activeChat?.isRequest;
  const isCurrentUserRequest = activeChat?.lastMessage?.sender === currentUserId;

  if (isRequestChat) {
    if (isCurrentUserRequest) {
      return (
        <div className="border-t-1 border-default-200 w-full p-2 text-sm text-center text-default-500">
          You have sent this message to {participant?.name}.<br />
          To continue the conversation, wait until they answer you or accept your connection request.
        </div>
      );
    }

    return (
      <div className="border-t-1 border-default-200 w-full p-2 text-center">
        <span className="text-sm text-default-500">
          To respond to the message from {participant?.name},{' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link as="button" size="sm" color="secondary" underline="hover" onClick={() => moveRequestToChat()}>
            move this conversion to chats.
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(images.length > 0 || files.length > 0) && (
        <div className="flex gap-2">
          {images.map((image) => (
            <ImagePreview
              key={image.src}
              src={image.src}
              isLoading={image.isLoading}
              onRemove={() => removeImage(image.src)}
            />
          ))}
          {files.map((file) => (
            <FilePreview
              key={file.url}
              name={file.name}
              format={file.format}
              isLoading={file.isLoading}
              onRemove={() => removeFile(file.url)}
            />
          ))}
        </div>
      )}
      <div className="relative">
        <Textarea
          ref={editorRef}
          placeholder="Type to add your message"
          minRows={2}
          maxRows={3}
          variant="bordered"
          classNames={{ input: isTouchScreen ? 'pr-28' : 'pr-36', inputWrapper: 'bordered' }}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute bottom-2 right-2 flex items-center">
          <Popover isOpen={isEmojiPickerOpened} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger>
              <Button variant="light" className={cx(emojiTriggerClassName, 'text-default-400')} size="sm" isIconOnly aria-label="Add emoji">
                <Icon icon="emojiHappy" size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <EmojiPicker
                maxFrequentRows={2}
                onEmojiSelect={handleEmojiClick}
              />
            </PopoverContent>
          </Popover>
          <Tooltip content={isImageUploadDisabled ? 'You\'ve already uploaded 5 images, which is the maximum limit allowed' : 'Upload image'}>
            <Button disabled={isImageUploadDisabled} variant="light" className="text-default-400" size="sm" isIconOnly aria-label="Upload image">
              <div {...getImageRootProps()}>
                <Icon icon="addImage" size={20} />
                <input {...getImageInputProps()} />
              </div>
            </Button>
          </Tooltip>
          <Tooltip content={isFileUploadDisabled ? 'You\'ve already uploaded 5 files, which is the maximum limit allowed' : 'Upload file'}>
            <Button disabled={isFileUploadDisabled} variant="light" className="text-default-400" size="sm" isIconOnly aria-label="Upload file">
              <div {...getFileRootProps()}>
                <Icon icon="file" size={20} />
                <input {...getFileInputProps()} />
              </div>
            </Button>
          </Tooltip>
          <Button className="md:ml-2" isIconOnly color="secondary" radius="full" variant="light" aria-label="Send message" onClick={sendMessage}>
            <Icon icon="send" />
          </Button>
        </div>
      </div>
    </div>
  );
};
