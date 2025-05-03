// @ts-nocheck
import { addToast, Button, Select, SelectItem, SelectSection, Spinner } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../../constants/validationRules';
import {
  useGetProjectIdPaths,
  usePutProjectIdFileFileId,
  usePutProjectIdFolderFolderId,
} from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../../services/review-tool/services';
import {
  FileDto,
  ProjectAssetEditDto,
  ProjectDto,
  ProjectFileDto,
  ProjectFolderDto,
} from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../various/Icon';

interface Props {
  asset: ProjectFolderDto | ProjectFileDto | FileDto;
  project: ProjectDto;
  onCancel: () => void;
  onSuccess: () => void;
}

export const MoveToForm = ({ asset, project, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { data: projectPaths = [], isPending: isLoadingProjectPaths } = useGetProjectIdPaths(project.id);
  const { mutate: updateFile, isPending: isSavingFile } = usePutProjectIdFileFileId();
  const { mutate: updateFolder, isPending: isSavingFolder } = usePutProjectIdFolderFolderId();

  const formRef = React.useRef<HTMLFormElement>(null);

  const parentId = 'parentId' in asset ? asset.parentId : (asset as FileDto)?.parent?.id;
  const isPending = isSavingFile || isSavingFolder;

  const { handleSubmit, register } = useForm({
    defaultValues: {
      parentId: '',
    },
  });

  const handleSuccess = ({ project: data, parent: parentData }: ProjectAssetEditDto) => {
    if (parentData) {
      queryClient.setQueryData([getAssetFolderId.key, parentData.id], parentData);
    }

    queryClient.setQueryData([getProjectId.key, project.id], data);
    queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
    addToast({ title: `The ${asset?.type} was successfully moved`, color: 'success', variant: 'flat' });
    onSuccess?.();
  };

  const handleError = (error: unknown) => {
    addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
  };

  const onSubmit = (body: { parentId: string }) => {
    const newParentId = (body.parentId === 'home' ? null : body.parentId) as string | undefined;

    if (asset.type === 'file') {
      updateFile(
        { id: project.id, fileId: asset.id, requestBody: { parentId: newParentId } },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );

      return;
    }

    updateFolder(
      { id: project.id, folderId: asset.id, requestBody: { parentId: newParentId } },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  const filteredPaths = React.useMemo(() => {
    return projectPaths.filter(
      (folder) => folder.id !== parentId && folder.id !== asset.id && !folder.path.find((path) => path.id === asset.id),
    );
  }, [asset.id, parentId, projectPaths]);

  const isDisabled = !parentId && filteredPaths.length === 0;

  return (
    <form ref={formRef} noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isLoadingProjectPaths && (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Spinner size="sm" />
          <p className="text-default-500">Loading destinations...</p>
        </div>
      )}
      {!isLoadingProjectPaths && filteredPaths.length === 0 && !parentId && (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Icon icon="folder" size={24} className="text-default-400" />
          <p className="text-default-500">There are no available destinations to move this {asset.type} to.</p>
        </div>
      )}
      {!isLoadingProjectPaths && (filteredPaths.length > 0 || parentId) && (
        <Select
          aria-label="Select destination"
          placeholder="Select destination"
          isDisabled={isDisabled}
          popoverProps={{
            shouldCloseOnBlur: false,
          }}
          {...register('parentId', VALIDATION_RULES.REQUIRED)}
        >
          {parentId && (
            <SelectItem key="home" textValue={project.name} startContent={<Icon icon="slides" size={16} />}>
              {project.name}
            </SelectItem>
          )}
          {filteredPaths.length > 0 && (
            <SelectSection title="Folders">
              {filteredPaths.map((folder) => (
                <SelectItem key={folder.id} textValue={folder.name} startContent={<Icon icon="folder" size={16} />}>
                  {folder.path.map((path) => `${path.name} / `)}
                  {folder.name}
                </SelectItem>
              ))}
            </SelectSection>
          )}
        </Select>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending} isDisabled={isDisabled} className="text-content1 bg-foreground">
          Move
        </Button>
      </div>
    </form>
  );
};
