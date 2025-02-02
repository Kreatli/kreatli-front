import { Avatar, Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useProjectContext } from '../../../../contexts/review-tool/Project';
import { useNotifications } from '../../../../hooks/useNotifications';
import { usePostProjectIdFile } from '../../../../services/review-tool/hooks';
import { getProjectId } from '../../../../services/review-tool/services';
import { ProjectDto } from '../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../various/Icon';
import { CreateFolderModal } from '../../asset/AssetModals/CreateFolderModal';
import { ProjectMembersModal, ProjectMembersThumbnails } from '../ProjectMembers';
import { ProjectBreadcrumbs } from './ProjectBreadcrumbs';

interface Props {
  project: ProjectDto;
}

export const ProjectHeader = ({ project }: Props) => {
  const coverUrl = project.cover?.url;
  const queryClient = useQueryClient();
  const { mutateAsync } = usePostProjectIdFile();
  const { getProjectActions, setUploadingFiles } = useProjectContext();
  const { pushNotification } = useNotifications();

  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const uploadAssets = () => {
    inputRef.current?.click();
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!inputRef.current) {
      return;
    }

    setUploadingFiles((currentFiles) => [...files, ...currentFiles]);

    inputRef.current.value = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { project: data } = await mutateAsync({ id: project.id, requestBody: { file } });
        setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
        queryClient.setQueryData([getProjectId.key, project.id], data);
      } catch (error) {
        pushNotification({ icon: 'error', message: getErrorMessage(error) });
        setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
      }
    }
  };

  const projectActions = getProjectActions(project);

  return (
    <div className="flex gap-4 justify-between">
      <ProjectBreadcrumbs
        fileCount={project.fileCount}
        coverUrl={coverUrl}
        totalFileSize={project.totalFileSize}
        path={[{ name: project.name, url: '#' }]}
      >
        {projectActions.length > 0 && (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" radius="full">
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
      </ProjectBreadcrumbs>
      <div className="flex gap-4">
        <div className="p-1">
          <Avatar
            as="button"
            aria-label="Add project member"
            fallback="+"
            isBordered
            size="sm"
            className="text-lg font-medium text-foreground-500"
            onClick={() => setIsMembersModalOpen(true)}
          />
        </div>
        <div className="p-1">
          <button
            type="button"
            aria-label="Project members"
            className="outline-offset-4 rounded-full"
            onClick={() => setIsMembersModalOpen(true)}
          >
            <ProjectMembersThumbnails members={project.members} />
          </button>
        </div>
        <div>
          <ButtonGroup>
            <Button className="text-content1 bg-foreground pr-1" onClick={uploadAssets}>
              <Icon icon="plus" size={16} />
              New
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly className="text-content1 bg-foreground">
                  <Icon icon="chevronDown" size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem startContent={<Icon icon="upload" size={18} />} onPress={uploadAssets}>
                  Upload files
                </DropdownItem>
                <DropdownItem startContent={<Icon icon="plus" size={16} />} onPress={() => setIsFolderModalOpen(true)}>
                  Create folder
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          <input ref={inputRef} multiple type="file" className="sr-only" onChange={handleInputChange} />
        </div>
      </div>
      <ProjectMembersModal isOpen={isMembersModalOpen} project={project} onClose={() => setIsMembersModalOpen(false)} />
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        projectId={project.id}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </div>
  );
};
