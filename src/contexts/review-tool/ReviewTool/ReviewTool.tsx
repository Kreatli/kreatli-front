import React from 'react';

import { ReviewTool } from '../../../typings/marketplace/reviewTool';
import { Stage } from 'konva/lib/Stage';

interface Context {
  activeTool: ReviewTool.ToolType | null;
  activeColor: ReviewTool.Color;
  canvasRef: React.RefObject<Stage>;
  fileRef: React.RefObject<HTMLImageElement | HTMLVideoElement>;
  setActiveTool: (shape: ReviewTool.ToolType | null) => void;
  setActiveColor: (color: ReviewTool.Color) => void;
}

const ReviewToolContext = React.createContext<Context | null>(null);

export const useReviewToolContext = () => {
  const context = React.useContext(ReviewToolContext);

  if (!context) {
    throw new Error('useReviewToolContext must be used within a ReviewToolContextProvider');
  }

  return context;
};

export const ReviewToolContextProvider = ({ children }: React.PropsWithChildren) => {
  const [activeTool, setActiveTool] = React.useState<ReviewTool.ToolType | null>(null);
  const [activeColor, setActiveColor] = React.useState<ReviewTool.Color>('red');

  const canvasRef = React.useRef<Stage>(null);
  const fileRef = React.useRef<HTMLImageElement | HTMLVideoElement>(null);

  return (
    <ReviewToolContext.Provider value={{ activeColor, activeTool, fileRef, canvasRef, setActiveColor, setActiveTool }}>
      {children}
    </ReviewToolContext.Provider>
  );
};
