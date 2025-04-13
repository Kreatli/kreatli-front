import React from 'react';

import { useFileContext } from '../../../../contexts/review-tool/File';
import {
  ReviewToolContextProvider,
  ReviewToolCanvasShapesContextProvider,
} from '../../../../contexts/review-tool/ReviewTool';
import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewToolFooter } from './ReviewToolFooter';
import { ReviewToolHeader } from './ReviewToolHeader';

export const ReviewTool = () => {
  const { file, project, isLoading } = useFileContext();

  return (
    <div className="flex flex-col overflow-hidden">
      {isLoading || !file || !project ? (
        'Loading...'
      ) : (
        <ReviewToolContextProvider>
          <ReviewToolCanvasShapesContextProvider>
            <ReviewToolHeader file={file} project={project} />
            <ReviewToolCanvas file={file} />
            <ReviewToolFooter />
          </ReviewToolCanvasShapesContextProvider>
        </ReviewToolContextProvider>
      )}
    </div>
  );
};
