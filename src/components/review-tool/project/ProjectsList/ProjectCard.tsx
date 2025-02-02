import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

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

  const projectActions = getProjectActions(project);

  return (
    <div className="group/project-card relative flex flex-col">
      <button
        type="button"
        aria-label={`Open project ${project.name}`}
        className="cursor-default absolute-cursor border border-foreground-300 p-px rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2"
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectCardImage image={project.cover} />
      </button>
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
        <div className="p-1">
          <ProjectMembersThumbnails members={project.members} />
        </div>
      </div>
      {projectActions.length > 0 && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              type="button"
              size="sm"
              isIconOnly
              variant="faded"
              aria-label={`Open project ${project.name} options`}
              className="absolute top-2 right-2 opacity-0 group-focus-within/project-card:opacity-100 group-hover/project-card:opacity-100"
            >
              <Icon icon="dots" />
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
  );
};
