import React, { useEffect, useState } from 'react';

import { ReviewTool } from '../../../typings/marketplace/reviewTool';
import { useFileContext } from '../File';

interface Context {
  shapes: ReviewTool.Shape[];
  setShapes: React.Dispatch<React.SetStateAction<ReviewTool.Shape[]>>;
  canRedo: boolean;
  canUndo: boolean;
  isReadOnly: boolean;
  undo: () => void;
  redo: () => void;
  pushHistory: (historyItem: ReviewTool.Shape[]) => void;
  resetCanvas: () => void;
}

const ReviewToolCanvasShapesContext = React.createContext<Context | null>(null);

export const useReviewToolCanvasShapesContext = () => {
  const context = React.useContext(ReviewToolCanvasShapesContext);

  if (!context) {
    throw new Error('useReviewToolCanvasShapesContext must be used within a ReviewToolCanvasShapesContextProvider');
  }

  return context;
};

const MAX_HISTORY_LENGTH = 10;

export const ReviewToolCanvasShapesContextProvider = ({ children }: React.PropsWithChildren) => {
  const { activeComment } = useFileContext();

  const [shapes, setShapes] = React.useState<ReviewTool.Shape[]>([]);

  const history = React.useRef<ReviewTool.Shape[][]>([[]]);
  const historyStep = React.useRef(0);

  const [canRedo, setCanRedo] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  const isReadOnly = !!activeComment;

  useEffect(() => {
    setShapes(activeComment?.canvas?.shapes ?? []);
    setCanUndo(false);
    setCanRedo(false);
    history.current = [[]];
    historyStep.current = 0;
  }, [activeComment]);

  const pushHistory = (historyItem: ReviewTool.Shape[]) => {
    history.current = history.current.slice(-MAX_HISTORY_LENGTH, historyStep.current + 1);
    history.current = history.current.concat([historyItem]);

    if (historyStep.current < MAX_HISTORY_LENGTH) {
      historyStep.current += 1;
    }

    setCanUndo(true);
    setCanRedo(false);
  };

  const undo = () => {
    historyStep.current -= 1;

    setCanUndo(historyStep.current !== 0);
    setCanRedo(historyStep.current !== history.current.length - 1);
    setShapes(history.current[historyStep.current]);
  };

  const redo = () => {
    historyStep.current += 1;

    setCanUndo(historyStep.current !== 0);
    setCanRedo(historyStep.current !== history.current.length - 1);
    setShapes(history.current[historyStep.current]);
  };

  const resetCanvas = () => {
    setShapes([]);
    setCanUndo(false);
    setCanRedo(false);
    history.current = [[]];
    historyStep.current = 0;
  };

  return (
    <ReviewToolCanvasShapesContext.Provider
      value={{ shapes, isReadOnly, setShapes, undo, redo, canRedo, canUndo, pushHistory, resetCanvas }}
    >
      {children}
    </ReviewToolCanvasShapesContext.Provider>
  );
};
