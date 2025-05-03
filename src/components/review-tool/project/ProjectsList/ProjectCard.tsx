import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { useProjectContext } from '../../../../contexts/review-tool/Project';
import { ProjectDto } from '../../../../services/review-tool/types';
import { formatRelativeTime } from '../../../../utils/dates';
import { formatBytes } from '../../../../utils/formatBytes';
import { handleSpaceAndEnter } from '../../../../utils/keydown';
import { Icon } from '../../../various/Icon';
import { ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectCardImage } from './ProjectCardImage';

interface Props {
  project: ProjectDto;
}

export const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  const { getProjectActions } = useProjectContext();

  const handleClick = () => {
    router.push(`/project/${project.id}`);
  };

  const projectActions = useMemo(
    () => getProjectActions(project).filter((action) => !action.hideInCard),
    [getProjectActions, project],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'success';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="relative flex flex-col">
      <button
        type="button"
        aria-label={`Open project ${project.name}`}
        className="cursor-default absolute-cursor border border-foreground-300 p-px rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2 relative"
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectCardImage image={project.cover} />
      </button>
      <div className="absolute top-1 left-2 right-2 flex justify-between items-center gap-2">
        <Chip size="sm" variant="dot" color={getStatusColor(project.status)} className="bg-default-100 z-10">
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Chip>
        {projectActions.length > 0 && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                type="button"
                size="sm"
                isIconOnly
                radius="full"
                className="mt-1"
                variant="faded"
                aria-label={`Open project ${project.name} options`}
              >
                <Icon icon="dots" size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              {projectActions.map((action) => (
                <DropdownItem
                  key={action.label}
                  color={action.color}
                  showDivider={action.showDivider}
                  startContent={<Icon icon={action.icon} size={16} />}
                  onPress={action.onClick}
                >
                  {action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <div className="flex justify-between px-2 mt-4">
        <div className="select-none">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <div>
            {project.fileCount} items, {formatBytes(project.totalFileSize)}
          </div>
          <div className="text-foreground-500 text-sm">
            Last modified {formatRelativeTime(project.updatedAt ?? project.createdAt)}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="p-1">
            <ProjectMembersThumbnails members={project.members} />
          </div>
        </div>
      </div>
    </div>
  );
};
