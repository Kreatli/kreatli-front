import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useFolderContext } from '../../../../../contexts/review-tool/Folder';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { useGetAssetFolderId, usePostProjectIdFile } from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId } from '../../../../../services/review-tool/services';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../various/Icon';
import { CreateFolderModal } from '../../../asset/AssetModals/CreateFolderModal';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectFolderAssetsList } from './ProjectFolderAssetsList';

interface Props {
  folderId: string;
}

export const ProjectFolderAssets = ({ folderId }: Props) => {
  const queryClient = useQueryClient();
  const { project } = useProjectContext();
  const { data: folder } = useGetAssetFolderId(folderId);
  const { mutateAsync } = usePostProjectIdFile();
  const { pushNotification } = useNotifications();
  const { setUploadingFiles } = useFolderContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = React.useState(false);

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
        const { project: projectData, parent: folderData } = await mutateAsync({
          id: project.id,
          requestBody: { file, parentId: folderId },
        });
        setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
        queryClient.setQueryData([getProjectId.key, project.id], projectData);
        queryClient.setQueryData([getAssetFolderId.key, folderId], folderData);
      } catch (error) {
        pushNotification({ icon: 'error', message: getErrorMessage(error) });
        setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
      }
    }
  };

  const path = React.useMemo(() => {
    const projectPath = { name: project.name, url: `/project/${project.id}` };

    if (!folder) {
      return [projectPath];
    }

    return [
      projectPath,
      ...folder.path.map(({ id, name }) => ({ name, url: `/project/${project.id}/assets/folder/${id}` })),
      { name: folder.name, url: '#' },
    ];
  }, [folder, project]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <ProjectBreadcrumbs
          fileCount={folder?.fileCount ?? 0}
          totalFileSize={folder?.totalFileSize ?? 0}
          path={path}
          coverUrl={project.cover?.url}
        />
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
      {/* TODO: add loading state */}
      {folder && <ProjectFolderAssetsList project={project} folder={folder} />}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        projectId={project.id}
        folderId={folderId}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </div>
  );
};
