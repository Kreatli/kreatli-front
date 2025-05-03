import {
  addToast,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useGetAssetFolderId, usePostProjectIdFile } from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../../services/review-tool/services';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../various/Icon';
import { CreateFolderModal } from '../../../asset/AssetModals/CreateFolderModal';
import { ProjectBreadcrumbs } from '../../Project/ProjectBreadcrumbs';
import { ProjectFolderAssetsList } from './ProjectFolderAssetsList';
import { ProjectFolderAssetsLoading } from './ProjectFolderAssetsLoading';

interface Props {
  folderId: string;
}

export const ProjectFolderAssets = ({ folderId }: Props) => {
  const queryClient = useQueryClient();
  const { project, setUploadingFiles } = useProjectContext();
  const { data: folder, isLoading } = useGetAssetFolderId(folderId);
  const { mutateAsync } = usePostProjectIdFile();

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
      const promise = mutateAsync({
        id: project.id,
        requestBody: { file, parentId: folderId },
      });
      addToast({
        title: file.name,
        description: 'Uploading file...',
        promise,
        timeout: 1,
        classNames: {
          base: 'overflow-hidden',
          content: 'overflow-hidden',
          wrapper: 'overflow-hidden',
          title: 'break-words',
        },
        hideCloseButton: true,
      });

      promise
        .then(({ project: projectData, parent: folderData }) => {
          setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
          queryClient.setQueryData([getProjectId.key, project.id], projectData);
          queryClient.setQueryData([getAssetFolderId.key, folderId], folderData);
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
        })
        .catch((error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
          setUploadingFiles((uploadingFiles) => uploadingFiles.filter((f) => f !== file));
        });
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

  const backLink = React.useMemo(() => {
    if (!folder?.parent) {
      return { name: project.name, href: `/project/${project.id}` };
    }

    return { name: folder.parent.name, href: `/project/${project.id}/assets/folder/${folder?.parent?.id}` };
  }, [folder?.parent, project.id, project.name]);

  if (isLoading) {
    return <ProjectFolderAssetsLoading />;
  }

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link as={NextLink} href={backLink.href} className="gap-0.5 text-foreground-500">
        <Icon icon="arrowLeft" size={18} />
        {backLink.name}
      </Link>
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
                  <DropdownItem key="upload" startContent={<Icon icon="upload" size={18} />} onPress={uploadAssets}>
                    Upload files
                  </DropdownItem>
                  <DropdownItem
                    key="create-folder"
                    startContent={<Icon icon="plus" size={16} />}
                    onPress={() => setIsFolderModalOpen(true)}
                  >
                    Create folder
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            <input ref={inputRef} multiple type="file" className="sr-only" onChange={handleInputChange} />
          </div>
        </div>
        {folder && <ProjectFolderAssetsList project={project} folder={folder} />}
        <CreateFolderModal
          isOpen={isFolderModalOpen}
          projectId={project.id}
          folderId={folderId}
          onClose={() => setIsFolderModalOpen(false)}
        />
      </div>
    </div>
  );
};
