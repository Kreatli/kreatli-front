import Konva from 'konva';
import React from 'react';

import { ReviewTool } from '../../../../../typings/marketplace/reviewTool';
import { ReviewToolCanvasArrow } from './ReviewToolCanvasArrow';
import { ReviewToolCanvasLine } from './ReviewToolCanvasLine';

interface Props {
  shape: ReviewTool.Shape;
  isDrawing: React.RefObject<boolean>;
  onDragStart: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<DragEvent>) => void;
  onRemove: (shape: ReviewTool.Shape) => void;
}

export const ReviewToolCanvasShape = ({ shape, isDrawing, onDragStart, onDragEnd, onRemove }: Props) => {
  if (shape.type === 'arrow') {
    return (
      <ReviewToolCanvasArrow
        arrow={shape}
        isDrawing={isDrawing}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onRemove={onRemove}
      />
    );
  }

  return <ReviewToolCanvasLine line={shape} onRemove={onRemove} />;
};
