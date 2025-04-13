import { Avatar, Button, Checkbox, cn, Tooltip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import { useFileContext } from '../../../../contexts/review-tool/File';
import { useNotifications } from '../../../../hooks/useNotifications';
import {
  useDeleteAssetFileIdCommentCommentId,
  usePatchAssetFileIdCommentCommentId,
} from '../../../../services/review-tool/hooks';
import { AssetCommentDto } from '../../../../services/review-tool/types';
import { formatRelativeTime } from '../../../../utils/dates';
import { formatDuration } from '../../../../utils/review-tool/formatDuration';
import { Icon } from '../../../various/Icon';

interface Props {
  fileId: string;
  comment: AssetCommentDto;
  isResolvable?: boolean;
  isResolved?: boolean;
  onUpdate: () => void;
  onRemove: () => void;
}

export const AssetComment = ({ fileId, comment, isResolvable = true, onUpdate, onRemove, ...rest }: Props) => {
  const { createdBy, id, message, createdAt, timestamp, canvas } = comment;
  const { pushNotification } = useNotifications();
  const { mutate: updateComment, isPending: isUpdatingComment } = usePatchAssetFileIdCommentCommentId();
  const { mutate: removeComment, isPending: isRemoving } = useDeleteAssetFileIdCommentCommentId();
  const { activeComment, replyingComment, setActiveComment, setReplyingComment } = useFileContext();

  const [isResolved, setIsResolved] = useState(comment.isResolved || (rest.isResolved ?? false));

  useEffect(() => {
    setIsResolved(comment.isResolved || (rest.isResolved ?? false));
  }, [comment.isResolved, rest.isResolved]);

  const handleRemove = () => {
    if (replyingComment === comment) {
      setReplyingComment(null);
    }

    if (activeComment === comment) {
      setActiveComment(null);
    }

    removeComment(
      { id: fileId, commentId: id },
      {
        onSuccess: onRemove,
        onError: () => {
          pushNotification({ message: 'Failed to remove the comment', icon: 'error' });
        },
      },
    );
  };

  const handleCheckboxChange = () => {
    setIsResolved((resolved) => !resolved);
    updateComment(
      { id: fileId, commentId: id, requestBody: { isResolved: !isResolved } },
      {
        onSuccess: onUpdate,
      },
    );
  };

  const handleClick = () => {
    if (!comment.canvas) {
      return;
    }

    setActiveComment(comment);
    setReplyingComment(null);
  };

  const handleReply = () => {
    setReplyingComment(replyingComment === comment ? null : comment);
  };

  return (
    <div
      className={cn(
        'relative rounded-md p-2 border border-foreground-200 hover:bg-foreground-50 transition-[background-color,border,opacity]',
        {
          'opacity-50': isResolved || id.includes('placeholder') || isUpdatingComment,
          'bg-foreground-50 border border-foreground-400 opacity-100': activeComment?.id === id,
          'bg-primary-50 hover:bg-primary-50 border-primary-400 opacity-100': comment === replyingComment,
        },
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
          <Avatar
            src={createdBy.avatar?.url ?? ''}
            size="sm"
            className="cursor-pointer !size-6"
            fallback={
              <div className="text-xs text-foreground-500 select-none">{createdBy.name.slice(0, 1).toUpperCase()}</div>
            }
          />
          <div className="text-xs">{createdBy.name}</div>
        </div>
        <div className="flex items-center gap-1 z-10">
          <Tooltip content="Delete comment">
            <Button variant="light" radius="full" size="sm" isLoading={isRemoving} isIconOnly onClick={handleRemove}>
              <Icon icon="trash" size={16} />
            </Button>
          </Tooltip>
          {isResolvable && (
            <Tooltip content={isResolved ? 'Unresolve comment' : 'Resolve comment'} offset={20}>
              <Checkbox
                radius="full"
                size="sm"
                color="default"
                isSelected={isResolved}
                onChange={handleCheckboxChange}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <button
        type="button"
        className="block after:absolute after:inset-0 text-sm font-medium pb-2 text-left whitespace-pre-wrap"
        onClick={handleClick}
      >
        {(canvas?.shapes?.length ?? 0) > 0 && <Icon icon="paint" size={16} className="inline mr-1 text-primary" />}
        {timestamp?.[0] !== undefined && <span className="text-foreground-500">{formatDuration(timestamp[0])} </span>}
        {message}
      </button>
      <div className="relative flex justify-between items-end">
        <button
          type="button"
          className={cn('text-foreground-500 text-xs flex items-center', {
            'text-primary': comment === replyingComment,
          })}
          onClick={handleReply}
        >
          <Icon icon="reply" size={16} />
          Reply
        </button>
        <div className="text-xs text-foreground-500">{formatRelativeTime(createdAt)}</div>
      </div>
    </div>
  );
};
