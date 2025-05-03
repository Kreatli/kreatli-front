import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import React, { useMemo } from 'react';

import { useAssetContext } from '../../../../contexts/review-tool/Asset';
import { useSession } from '../../../../hooks/review-tool/useSession';
import { FileDto, ProjectDto } from '../../../../services/review-tool/types';
import { formatBytes } from '../../../../utils/formatBytes';
import { Icon } from '../../../various/Icon';
import { ProjectFileAssignee } from '../../project/ProjectAssets/ProjectFile/ProjectFileAssignee';
import { ProjectFileStatus } from '../../project/ProjectAssets/ProjectFile/ProjectFileStatus';

interface Props {
  file: FileDto;
  project: ProjectDto;
}

export const ReviewToolHeader = ({ file, project }: Props) => {
  const { getAssetActions } = useAssetContext();
  const { user } = useSession();
  const actions = useMemo(() => getAssetActions(file), [file, getAssetActions]);

  const parentPath = useMemo(() => {
    if (!file.parent) {
      return `/project/${project.id}`;
    }

    return `/project/${project.id}/assets/folder/${file.parent.id}`;
  }, [file.parent, project.id]);

  const path = useMemo(() => {
    return [project.name, ...file.path.map((folder) => folder.name)];
  }, [file.path, project.name]);

  const memberRole = useMemo(() => {
    return project.members.find((member) => member.user?.id === user?.id)?.role;
  }, [project.members, user?.id]);

  return (
    <div className="flex items-center gap-4 bg-foreground-50 p-3 pr-0">
      <div className="flex-1 flex items-center gap-2">
        <Button
          as={NextLink}
          href={parentPath}
          size="sm"
          variant="light"
          radius="full"
          startContent={<Icon icon="chevronDown" className="rotate-90" size={20} />}
          isIconOnly
        />
        <ProjectFileAssignee projectId={project.id} file={file} members={project.members} />
        <div className="ml-2">
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
      <ProjectFileStatus projectId={project.id} file={file} memberRole={memberRole} />
      <div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button startContent={<Icon icon="dots" />} radius="full" isIconOnly variant="flat" />
          </DropdownTrigger>
          <DropdownMenu aria-label="File actions" variant="flat">
            {actions.map((action, index) => (
              <DropdownItem
                key={index}
                startContent={<Icon icon={action.icon} size={16} />}
                color={action.color}
                onPress={action.onClick}
              >
                {action.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
