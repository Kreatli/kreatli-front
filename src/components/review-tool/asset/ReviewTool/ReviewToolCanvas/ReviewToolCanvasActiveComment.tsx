import { Avatar, Button } from '@heroui/react';
import React from 'react';

import { useFileContext } from '../../../../../contexts/review-tool/File';
import { Icon } from '../../../../various/Icon';

export const ReviewToolCanvasActiveComment = () => {
  const { activeComment, setActiveComment } = useFileContext();

  if (!activeComment) {
    return;
  }

  const handleClose = () => {
    setActiveComment(null);
  };

  return (
    <div className="absolute top-4 right-4 pl-3 pr-2 py-2 rounded-md bg-foreground-50 shadow-md max-w-80 z-10">
      <div className="flex items-center gap-2">
        <Avatar
          src={activeComment.createdBy.avatar?.url ?? ''}
          size="sm"
          className="cursor-pointer !size-6"
          fallback={
            <div className="text-xs text-foreground-500 select-none">
              {activeComment.createdBy?.name.slice(0, 1).toUpperCase()}
            </div>
          }
        />
        <div className="py-1 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{activeComment?.message}</div>
        <Button isIconOnly size="sm" variant="light" radius="full" onClick={handleClose}>
          <Icon icon="cross" />
        </Button>
      </div>
    </div>
  );
};
