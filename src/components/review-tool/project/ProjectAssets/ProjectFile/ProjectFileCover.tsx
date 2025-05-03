import { Chip, Image, Spinner } from '@heroui/react';
import React from 'react';

import { ProjectFileDto } from '../../../../../services/review-tool/types';
import { formatBytes } from '../../../../../utils/formatBytes';

interface Props {
  file: ProjectFileDto;
  isLoading?: boolean;
}

export const ProjectFileCover = ({ file, isLoading = false }: Props) => {
  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  return (
    <div className="relative overflow-hidden aspect-video border border-foreground-300 rounded-2xl bg-foreground-50 flex justify-center">
      <Image
        src={previewUrl}
        radius="none"
        classNames={{ wrapper: 'flex items-center select-none' }}
        className="max-h-full"
        draggable={false}
        alt={file.name}
      />
      <Chip size="sm" variant="faded" className="absolute border-1 bottom-2 right-2 z-10">
        <span className="font-medium text-foreground-700">{formatBytes(file.fileSize)}</span>
      </Chip>
      {isLoading && (
        <div className="absolute bg-foreground-50/75 p-4 inset-0 z-10 flex items-center justify-center">
          <Spinner color="secondary" />
        </div>
      )}
    </div>
  );
};
