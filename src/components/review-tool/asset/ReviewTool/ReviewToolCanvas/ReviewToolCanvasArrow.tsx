import Konva from 'konva';
import React from 'react';
import { Arrow } from 'react-konva';

import { EDITOR_COLOR_HEX } from '../../../../../constants/review-tool/colors';
import { useReviewToolContext } from '../../../../../contexts/review-tool/ReviewTool';
import { ReviewTool } from '../../../../../typings/marketplace/reviewTool';

interface Props {
  arrow: ReviewTool.Arrow;
  isDrawing: React.RefObject<boolean>;
  onRemove: (shape: ReviewTool.Shape) => void;
  onDragStart: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<DragEvent>) => void;
}

export const ReviewToolCanvasArrow = ({ arrow, isDrawing, onDragStart, onDragEnd, onRemove }: Props) => {
  const { activeTool, canvasRef } = useReviewToolContext();

  const isDragging = React.useRef(false);
  const isOver = React.useRef(false);

  const handleMouseEnter = () => {
    if (isDrawing.current || activeTool === 'eraser' || !canvasRef.current) {
      return;
    }

    canvasRef.current.content.style.cursor = 'move';
    isOver.current = true;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isOver.current = false;

      return;
    }

    if (canvasRef.current) {
      canvasRef.current.content.style.cursor = '';
    }
  };

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === 'eraser') {
      return;
    }

    isDragging.current = true;
    onDragStart(arrow, event);
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    isDragging.current = false;
    onDragEnd(arrow, event);

    if (!isOver.current && canvasRef.current) {
      canvasRef.current.content.style.cursor = '';
    }
  };

  const handleClick = () => {
    isDragging.current = false;

    if (activeTool !== 'eraser') {
      return;
    }

    onRemove(arrow);
  };

  return (
    <>
      <Arrow
        points={arrow.points}
        stroke={EDITOR_COLOR_HEX[arrow.color]}
        strokeWidth={5}
        draggable={activeTool !== 'eraser'}
        onMouseDown={handleMouseDown}
        onDragEnd={handleDragEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <Arrow
        points={arrow.points}
        stroke={EDITOR_COLOR_HEX[arrow.color]}
        strokeWidth={15}
        opacity={0}
        listening={activeTool === 'eraser'}
        onClick={handleClick}
      />
    </>
  );
};
