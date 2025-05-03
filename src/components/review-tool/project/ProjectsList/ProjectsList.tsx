import { Button, Skeleton } from '@heroui/react';
import React from 'react';

import { ProjectContextProvider } from '../../../../contexts/review-tool/Project';
import { GetProjectsQueryParams, ProjectDto } from '../../../../services/review-tool/types';
import { EmptyState } from '../../../various/EmptyState';
import { Icon } from '../../../various/Icon';
import { ProjectCard } from './ProjectCard';

interface Props {
  status: GetProjectsQueryParams['status'];
  search: string;
  projects?: ProjectDto[];
  isLoading?: boolean;
  isError?: boolean;
  onCreateProject?: () => void;
}

export const ProjectsList = ({
  status,
  search,
  projects,
  isLoading = false,
  isError = false,
  onCreateProject,
}: Props) => {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  const selectedProject = React.useMemo(() => {
    return projects?.find((project) => project.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-video rounded-2xl mb-4" />
            <Skeleton className="w-full h-5 rounded-md mb-1" />
            <Skeleton className="w-[50%] h-5 rounded-md mb-1" />
            <Skeleton className="w-[50%] h-5 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon="error"
        title="Something went wrong"
        text="Please refresh the page or contact our support team to help you resolve the issue."
      />
    );
  }

  const getTitle = () => {
    if (search) {
      return `No projects found for "${search}"`;
    }

    switch (status) {
      case 'active':
        return 'No active projects';
      case 'completed':
        return 'No completed projects';
      case 'archived':
        return 'No archived projects';
      default:
        return 'No projects';
    }
  };

  const getText = () => {
    if (search) {
      return 'Try to change your search query.';
    }

    switch (status) {
      case 'active':
        return "You don't have any active projects yet. Go ahead and create one.";
      case 'completed':
        return "You don't have any completed projects yet.";
      case 'archived':
        return "You don't have any archived projects yet.";
      default:
        return "You don't have any projects yet. Go ahead and create one.";
    }
  };

  if (!projects || projects?.length === 0) {
    return (
      <EmptyState title={getTitle()} text={getText()}>
        {!search && (status === 'active' || status === 'all') && (
          <Button className="bg-foreground text-content1 mt-4" onClick={onCreateProject}>
            <Icon icon="plus" size={18} />
            Create project
          </Button>
        )}
      </EmptyState>
    );
  }

  return (
    <ProjectContextProvider selectedProject={selectedProject} setSelectedProjectId={setSelectedProjectId}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </ProjectContextProvider>
  );
};
