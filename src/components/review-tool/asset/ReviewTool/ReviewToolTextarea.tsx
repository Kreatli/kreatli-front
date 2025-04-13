import { Avatar, Button, Textarea } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';

import { useFileContext } from '../../../../contexts/review-tool/File';
import { useReviewToolContext, useReviewToolCanvasShapesContext } from '../../../../contexts/review-tool/ReviewTool';
import { useSession } from '../../../../hooks/review-tool/useSession';
import { usePostAssetFileIdComment } from '../../../../services/review-tool/hooks';
import { getAssetFileIdComments } from '../../../../services/review-tool/services';
import { AssetCommentsResponse } from '../../../../services/review-tool/types';
import { getIsMediaHtmlElement } from '../../../../utils/review-tool/getIsMediaHtmlElement';
import { Icon } from '../../../various/Icon';

export const ReviewToolTextarea = () => {
  const [message, setMessage] = React.useState('');
  const { fileRef, setActiveTool } = useReviewToolContext();
  const { file, replyingComment, commentsRef, setActiveComment, setReplyingComment } = useFileContext();
  const { shapes, resetCanvas } = useReviewToolCanvasShapesContext();

  const { user } = useSession();
  const queryClient = useQueryClient();
  const { mutate } = usePostAssetFileIdComment();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const isMediaFile = getIsMediaHtmlElement(fileRef.current);

  React.useEffect(() => {
    if (replyingComment) {
      setMessage(`${replyingComment.createdBy.name}, `);
      textareaRef.current?.focus();
    }
  }, [replyingComment]);

  const handleSubmit = () => {
    if (!file || !message) {
      setIsInvalid(true);

      return;
    }

    setMessage('');
    resetCanvas();
    setActiveTool(null);
    setReplyingComment(null);
    textareaRef.current?.blur();

    if (isMediaFile) {
      fileRef.current.play();
    }

    const parent = replyingComment?.parent ?? replyingComment?.id;

    const commentPlaceholder = {
      id: `placeholder-${nanoid()}`,
      message,
      createdAt: new Date().toString(),
      createdBy: user!,
      isResolved: false,
      replies: [],
      parent,
      canvas: { shapes },
      timestamp: isMediaFile ? [fileRef.current.currentTime, fileRef.current.currentTime] : undefined,
    };

    queryClient.setQueryData<AssetCommentsResponse>([getAssetFileIdComments.key, file.id], (data) => {
      const dataComments = data?.comments ?? [];

      if (commentPlaceholder.parent) {
        const parentComment = dataComments.find((comment) => comment.id === commentPlaceholder.parent);

        return {
          comments: dataComments.map((comment) =>
            parentComment === comment
              ? {
                  ...parentComment,
                  replies: [...parentComment.replies, commentPlaceholder],
                }
              : comment,
          ),
        };
      }

      return {
        comments: [...dataComments, commentPlaceholder],
      };
    });

    if (!parent) {
      setTimeout(() => {
        commentsRef.current?.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' });
      });
    }

    mutate(
      {
        id: file.id,
        requestBody: {
          message,
          parent,
          timestamp: isMediaFile ? [fileRef.current.currentTime, fileRef.current.currentTime] : undefined,
          ...(shapes.length > 0 && { canvas: { shapes } }),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, file.id] });
        },
      },
    );
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setIsInvalid(false);
    setActiveComment(null);

    if (isMediaFile) {
      fileRef.current.pause();
    }
  };

  return (
    <form className="relative w-full max-w-screen-xl" onSubmit={handleSubmit}>
      <Textarea
        value={message}
        ref={textareaRef}
        classNames={{ input: 'ml-6 text-foreground' }}
        color={replyingComment ? 'primary' : 'default'}
        placeholder="Click here to start typing or drawing"
        isInvalid={isInvalid}
        rows={2}
        maxRows={2}
        onKeyDown={handleTextareaKeyDown}
        onFocus={handleFocus}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        size="sm"
        isIconOnly
        variant="light"
        radius="full"
        className="absolute bottom-1 right-1"
        onClick={handleSubmit}
      >
        <Icon icon="send" size={20} />
      </Button>
      {user && (
        <Avatar
          src={user.avatar?.url ?? ''}
          size="sm"
          className="pointer-events-none !size-6 absolute top-1.5 left-1.5"
          fallback={
            <div className="text-xs text-foreground-500 select-none">{user.name.slice(0, 1).toUpperCase()}</div>
          }
        />
      )}
      {replyingComment && (
        <div className="absolute bottom-full pb-0.5 flex items-center gap-1 left-2 right-2 text-primary">
          <Icon icon="reply" size={16} className="shrink-0" />
          <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{replyingComment.message}</div>
        </div>
      )}
    </form>
  );
};
