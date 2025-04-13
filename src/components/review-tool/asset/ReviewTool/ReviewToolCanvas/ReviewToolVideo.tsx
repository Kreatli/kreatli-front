import { Image } from '@nextui-org/react';
import React from 'react';

import { useFileContext } from '../../../../../contexts/review-tool/File';
import { useReviewToolContext } from '../../../../../contexts/review-tool/ReviewTool';
import { FileDto } from '../../../../../services/review-tool/types';
import { getIsMediaHtmlElement } from '../../../../../utils/review-tool/getIsMediaHtmlElement';

interface Props {
  videoFile: FileDto;
  onLoad: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export const ReviewToolVideo = ({ videoFile, onLoad }: Props) => {
  const { activeTool, fileRef } = useReviewToolContext();
  const { activeComment, replyingComment, setActiveComment } = useFileContext();

  React.useEffect(() => {
    if (getIsMediaHtmlElement(fileRef.current) && activeComment) {
      fileRef.current.pause();

      if (activeComment?.timestamp?.[0]) {
        fileRef.current.currentTime = activeComment?.timestamp[0];
      }
    }
  }, [activeComment, fileRef]);

  React.useEffect(() => {
    if (getIsMediaHtmlElement(fileRef.current) && replyingComment) {
      fileRef.current.pause();

      if (replyingComment?.timestamp?.[0]) {
        fileRef.current.currentTime = replyingComment?.timestamp[0];
      }
    }
  }, [replyingComment, fileRef]);

  const handlePlay = () => {
    setActiveComment(null);
  };

  return (
    <>
      {videoFile.metadata.thumbnailUrl && (
        <div className="absolute -inset-12 pointer-events-none">
          <Image
            src={videoFile.metadata.thumbnailUrl}
            removeWrapper
            radius="none"
            className="absolute inset-0 h-full w-full blur-xl grayscale select-none"
          />
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        // @ts-ignore
        ref={fileRef}
        controls={!activeTool}
        className="relative max-h-full max-w-full h-auto overflow-hidden z-10 rounded-lg"
        onPlay={handlePlay}
        onLoadedMetadata={onLoad}
      >
        <source src={videoFile.url} />
      </video>
    </>
  );
};
