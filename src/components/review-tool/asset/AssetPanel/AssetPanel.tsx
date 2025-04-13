import React from 'react';

import { useFileContext } from '../../../../contexts/review-tool/File';
import { AssetComments } from '../AssetComments';
import { AssetDescription } from '../AssetDescription';
import { AssetPanelHeader } from './AssetPanelHeader';

export const AssetPanel = () => {
  const { file, isLoading, commentsRef } = useFileContext();

  return (
    <div className="overflow-hidden flex flex-col">
      <AssetPanelHeader />
      <div ref={commentsRef} className="overflow-auto">
        {isLoading || !file ? 'Loading...' : <AssetDescription file={file} />}
        {file && <AssetComments fileId={file.id} />}
      </div>
    </div>
  );
};
