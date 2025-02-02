/* eslint-disable @typescript-eslint/indent */
import { MenuItemProps } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectMembersModal } from '../../../components/review-tool/project/ProjectMembers';
import { ArchiveProjectModal } from '../../../components/review-tool/project/ProjectModals/ArchiveProjectModal';
import { ChangeProjectCoverModal } from '../../../components/review-tool/project/ProjectModals/ChangeProjectCoverModal';
import { CompleteProjectModal } from '../../../components/review-tool/project/ProjectModals/CompleteProjectModal';
import { DeleteProjectModal } from '../../../components/review-tool/project/ProjectModals/DeleteProjectModal';
import { EditProjectModal } from '../../../components/review-tool/project/ProjectModals/EditProjectModal';
import { RenameProjectModal } from '../../../components/review-tool/project/ProjectModals/RenameProjectModal';
import { RestoreProjectModal } from '../../../components/review-tool/project/ProjectModals/RestoreProjectModal';
import { IconType } from '../../../components/various/Icon';
import { useSession } from '../../../hooks/review-tool/useSession';
import { ProjectDto } from '../../../services/review-tool/types';

interface Context {
  getProjectActions: (project: ProjectDto) => {
    label: string;
    icon: IconType;
    showDivider?: boolean;
    color?: MenuItemProps['color'];
    onClick: () => void;
  }[];
  isProjectOwner: boolean;
  uploadingFiles: File[];
  setUploadingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  project: ProjectDto;
}

export const ProjectContext = React.createContext<Context | null>(null);

export const useProjectContext = () => {
  const context = React.useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider');
  }

  return context;
};

interface Props {
  selectedProject: ProjectDto | undefined;
  setSelectedProjectId?: (id: string) => void;
}

export const ProjectContextProvider = ({
  children,
  selectedProject,
  setSelectedProjectId,
}: React.PropsWithChildren<Props>) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = React.useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const [uploadingFiles, setUploadingFiles] = React.useState<File[]>([]);
  const { user } = useSession();
  const router = useRouter();

  const isProjectOwner = selectedProject?.createdBy?.id === user?.id;

  const getProjectActions = (project: ProjectDto) => {
    if (project.createdBy?.id !== user?.id) {
      if (project.status === 'active') {
        return [
          {
            label: 'Archived media',
            icon: 'trash' as const,
            onClick: () => {
              router.push(`/project/${project.id}/assets/archived`);
            },
          },
        ];
      }

      return [];
    }

    return [
      ...(project.status === 'active'
        ? [
            {
              label: 'Rename',
              icon: 'edit' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsRenameModalOpen(true);
              },
            },
            {
              label: 'Edit description',
              icon: 'file' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsEditModalOpen(true);
              },
            },
            {
              label: 'Change cover image',
              icon: 'addImage' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsCoverModalOpen(true);
              },
            },
            {
              label: 'Invite member',
              icon: 'userPlus' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsMembersModalOpen(true);
              },
            },
            {
              label: 'Archived media',
              icon: 'trash' as const,
              showDivider: true,
              onClick: () => {
                router.push(`/project/${project.id}/assets/archived`);
              },
            },
            {
              label: 'Complete project',
              icon: 'check' as const,
              color: 'success' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsCompleteModalOpen(true);
              },
            },
            {
              label: 'Archive project',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : []),
      ...(project.status === 'archived'
        ? [
            {
              label: 'Restore project',
              icon: 'update' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsRestoreModalOpen(true);
              },
            },
            {
              label: 'Delete project',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsDeleteModalOpen(true);
              },
            },
          ]
        : []),
      ...(project.status === 'completed'
        ? [
            {
              label: 'Reactivate project',
              icon: 'update' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsRestoreModalOpen(true);
              },
            },
            {
              label: 'Archive project',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedProjectId?.(project.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : []),
    ];
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjectActions,
        project: selectedProject as ProjectDto,
        uploadingFiles,
        setUploadingFiles,
        isProjectOwner,
      }}
    >
      {children}
      <RenameProjectModal
        project={selectedProject}
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
      />
      <EditProjectModal project={selectedProject} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <ChangeProjectCoverModal
        project={selectedProject}
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
      />
      <ProjectMembersModal
        project={selectedProject}
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
      />
      <CompleteProjectModal
        project={selectedProject}
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
      />
      <ArchiveProjectModal
        project={selectedProject}
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />
      <RestoreProjectModal
        project={selectedProject}
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
      />
      <DeleteProjectModal
        project={selectedProject}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </ProjectContext.Provider>
  );
};
