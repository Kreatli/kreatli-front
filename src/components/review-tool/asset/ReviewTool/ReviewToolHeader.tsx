import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import React, { useMemo } from 'react';

import { FileDto, ProjectDto } from '../../../../services/review-tool/types';
import { formatBytes } from '../../../../utils/formatBytes';
import { Icon } from '../../../various/Icon';

interface Props {
  file: FileDto;
  project: ProjectDto;
}

export const ReviewToolHeader = ({ file, project }: Props) => {
  const parentPath = useMemo(() => {
    if (!file.parent) {
      return `/project/${project.id}`;
    }

    return `/project/${project.id}/assets/folder/${file.parent.id}`;
  }, [file.parent, project.id]);

  const path = useMemo(() => {
    return [project.name, ...file.path.map((folder) => folder.name)];
  }, [file.path, project.name]);

  return (
    <div className="flex items-center gap-4 bg-foreground-50 p-3 pr-0">
      <div className="flex-1 flex items-center gap-1">
        <Button
          as={NextLink}
          href={parentPath}
          size="sm"
          variant="light"
          radius="full"
          startContent={<Icon icon="chevronDown" className="rotate-90" size={20} />}
          isIconOnly
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{file.name}</span>
            <span className="text-sm text-foreground-500">{formatBytes(file.fileSize)}</span>
          </div>
          <div className="flex items-center text-foreground-400">
            {path.map((pathName, index) => (
              <div key={index} className="flex items-center text-xs">
                {index !== 0 && <Icon icon="chevronDown" className="rotate-90" size={14} />}
                <div>{pathName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>{file.status ?? 'No status'}</div>
      <div>
        <Button startContent={<Icon icon="dots" />} isIconOnly />
      </div>
    </div>
  );
};
