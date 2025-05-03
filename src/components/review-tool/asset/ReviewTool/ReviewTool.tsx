import React from 'react';

import { AssetContextProvider } from '../../../../contexts/review-tool/Asset';
import { useFileContext } from '../../../../contexts/review-tool/File';
import {
  ReviewToolCanvasShapesContextProvider,
  ReviewToolContextProvider,
} from '../../../../contexts/review-tool/ReviewTool';
import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewToolFooter } from './ReviewToolFooter';
import { ReviewToolHeader } from './ReviewToolHeader';
import { ReviewToolLoading } from './ReviewToolLoading';

export const ReviewTool = () => {
  const { file, project, isLoading } = useFileContext();

  if (isLoading || !file || !project) {
    return <ReviewToolLoading />;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ReviewToolContextProvider>
        <ReviewToolCanvasShapesContextProvider>
          <AssetContextProvider projectId={project.id} selectedAsset={file} project={project}>
            <ReviewToolHeader file={file} project={project} />
          </AssetContextProvider>
          <ReviewToolCanvas file={file} />
          <ReviewToolFooter />
        </ReviewToolCanvasShapesContextProvider>
      </ReviewToolContextProvider>
    </div>
  );
};
