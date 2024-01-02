import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  onUpload: (src: string) => void;
  onClose: () => void;
}

const YOUTUBE_VIDEO_PATTERN = /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']+)/;

export const VideoUploaderModal = ({ isOpen, onUpload, onClose }: Props) => {
  const [src, setUrl] = React.useState('');
  const [shouldShowError, setShouldShowError] = React.useState(false);

  const videoId = React.useMemo(() => {
    const match = src.match(YOUTUBE_VIDEO_PATTERN);
    const id = match?.[1];

    return id;
  }, [src]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldShowError(false);
    setUrl(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setUrl('');
  };

  const handleAdd = () => {
    if (!videoId) {
      setShouldShowError(true);

      return;
    }

    onUpload(videoId);
    handleClose();
  };

  return (
    <Modal
      placement="center"
      backdrop="blur"
      size="xl"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalContent>
        <ModalHeader>
          <h3>Upload YouTube video</h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Input
              label="YouTube video"
              isInvalid={shouldShowError}
              errorMessage={shouldShowError && 'Please provide a valid URL'}
              placeholder="Paste the URL here"
              onChange={handleChange}
            />
            {videoId
              ? (
                <div className="rounded-lg h-80 overflow-hidden">
                  <iframe
                    title={videoId}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-presentation"
                  />
                </div>
              )
              : (
                <div className="flex items-center justify-center text-default-400 p-4 text-center border-1 border-dashed border-default-200 rounded-lg h-80 text-sm">
                  If the video URL is valid, the video preview will be displayed here
                </div>
              )}
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button color="secondary" variant="light" onClick={handleClose}>Cancel</Button>
          <Button color="secondary" variant="flat" onClick={handleAdd}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
