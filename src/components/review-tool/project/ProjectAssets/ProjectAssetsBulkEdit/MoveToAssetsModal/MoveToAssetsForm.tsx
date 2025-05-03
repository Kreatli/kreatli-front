// @ts-nocheck
import { addToast, Button, Select, SelectItem, SelectSection, Spinner } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../../../constants/validationRules';
import { useGetProjectIdPaths, usePostProjectIdAssetsMove } from '../../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../../../services/review-tool/services';
import { ProjectDto, ProjectPathDto } from '../../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../../various/Icon';

interface Props {
  project: ProjectDto;
  assetIds: string[];
  currentParentId: string | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const MoveToAssetsForm = ({ project, assetIds, currentParentId, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { data: projectPaths = [], isPending: isLoadingProjectPaths } = useGetProjectIdPaths(project.id);
  const { mutate: moveAssets, isPending: isMoving } = usePostProjectIdAssetsMove();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      parentId: '',
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
    queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });

    if (currentParentId) {
      queryClient.invalidateQueries({ queryKey: [getAssetFolderId.key, currentParentId] });
    }

    addToast({ title: 'Assets were successfully moved', color: 'success', variant: 'flat' });
    onSuccess?.();
  };

  const handleError = (error: unknown) => {
    addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
  };

  const onSubmit = (body: { parentId: string }) => {
    const newParentId = (body.parentId === 'home' ? null : body.parentId) as string | undefined;

    moveAssets(
      {
        id: project.id,
        requestBody: {
          assetIds,
          fromId: currentParentId as string | undefined,
          toId: newParentId,
        },
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  const filteredPaths = React.useMemo(() => {
    return projectPaths.filter(
      (folder: ProjectPathDto) => !assetIds.includes(folder.id) && folder.id !== currentParentId,
    );
  }, [assetIds, projectPaths, currentParentId]);

  const isDisabled = filteredPaths.length === 0 && !currentParentId;

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {isLoadingProjectPaths && (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Spinner size="sm" />
          <p className="text-default-500">Loading destinations...</p>
        </div>
      )}
      {!isLoadingProjectPaths && filteredPaths.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Icon icon="folder" size={24} className="text-default-400" />
          <p className="text-default-500">There are no available destinations to move these assets to.</p>
        </div>
      )}
      {!isLoadingProjectPaths && filteredPaths.length > 0 && (
        <Select
          aria-label="Select destination"
          placeholder="Select destination"
          disallowEmptySelection
          isDisabled={isDisabled}
          popoverProps={{
            shouldCloseOnBlur: false,
          }}
          {...register('parentId', VALIDATION_RULES.REQUIRED)}
        >
          {currentParentId && (
            <SelectItem key="home" textValue={project.name} startContent={<Icon icon="slides" size={16} />}>
              {project.name}
            </SelectItem>
          )}
          <SelectSection title="Folders">
            {filteredPaths.map((folder: ProjectPathDto) => (
              <SelectItem key={folder.id} textValue={folder.name} startContent={<Icon icon="folder" size={16} />}>
                {folder.path.map((path: { name: string }) => `${path.name} / `)}
                {folder.name}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isMoving} isDisabled={isDisabled} className="text-content1 bg-foreground">
          Move
        </Button>
      </div>
    </form>
  );
};
