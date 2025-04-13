import Konva from 'konva';
import React from 'react';

import { ReviewTool } from '../../../../../typings/marketplace/reviewTool';
import { ReviewToolCanvasShape } from './ReviewToolCanvasShape';

interface Props {
  shapes: ReviewTool.Shape[];
  isDrawing: React.RefObject<boolean>;
  onDragStart: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<DragEvent>) => void;
  onRemove: (shape: ReviewTool.Shape) => void;
}

export const ReviewToolCanvasShapes = ({ shapes, isDrawing, onDragStart, onDragEnd, onRemove }: Props) => {
  return (
    <>
      {shapes.map((shape, idx) => (
        <ReviewToolCanvasShape
          key={idx}
          shape={shape}
          isDrawing={isDrawing}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
