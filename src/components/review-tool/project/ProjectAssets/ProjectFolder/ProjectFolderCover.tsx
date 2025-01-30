import React from 'react';

import { Icon } from '../../../../various/Icon';

export const ProjectFolderCover = () => {
  return (
    <div className="aspect-video bg-foreground-50 border border-foreground-300 rounded-2xl text-foreground-100">
      <div className="w-full h-full flex items-center justify-center">
        <Icon icon="folder" className="text-foreground-400 size-9" />
      </div>
    </div>
  );
};
