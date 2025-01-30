import { Chip, Image, Spinner } from '@nextui-org/react';
import React from 'react';

import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useSession } from '../../../../../hooks/review-tool/useSession';
import { ProjectFileDto } from '../../../../../services/review-tool/types';
import { formatBytes } from '../../../../../utils/formatBytes';
import { ProjectFileStatus } from './ProjectFileStatus';

interface Props {
  file: ProjectFileDto;
  isLoading?: boolean;
}

export const ProjectFileCover = ({ file, isLoading = false }: Props) => {
  const { project } = useProjectContext();

  const { user } = useSession();
  const memberRole = project.members.find((member) => member.user?.id === user?.id)?.role;

  const previewUrl = file.metadata.thumbnailUrl ?? file.url;

  return (
    <div className="relative overflow-hidden aspect-video border border-foreground-300 rounded-2xl bg-foreground-50 flex justify-center">
      <Image
        src={previewUrl}
        radius="none"
        classNames={{ wrapper: 'flex items-center' }}
        className="max-h-full"
        alt={file.name}
      />
      <ProjectFileStatus projectId={project.id} file={file} memberRole={memberRole} />
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
