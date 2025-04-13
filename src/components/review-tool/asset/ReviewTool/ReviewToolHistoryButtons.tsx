import { Button } from '@nextui-org/react';
import React from 'react';

import { useReviewToolCanvasShapesContext } from '../../../../contexts/review-tool/ReviewTool';
import { Icon } from '../../../various/Icon';

export const ReviewToolHistoryButtons = () => {
  const { canRedo, canUndo, redo, undo } = useReviewToolCanvasShapesContext();

  return (
    <div className="flex gap-0.5 items-center">
      <Button size="sm" variant="light" isIconOnly radius="full" isDisabled={!canUndo} onClick={undo}>
        <Icon icon="undo" />
      </Button>
      <Button size="sm" variant="light" isIconOnly radius="full" isDisabled={!canRedo} onClick={redo}>
        <Icon icon="redo" />
      </Button>
    </div>
  );
};
