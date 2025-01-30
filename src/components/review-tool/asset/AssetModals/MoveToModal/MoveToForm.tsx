import { Button, Select, SelectItem, SelectSection } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../../constants/validationRules';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useNotifications } from '../../../../../hooks/useNotifications';
import {
  useGetProjectIdPaths,
  usePutProjectIdFileFileId,
  usePutProjectIdFolderFolderId,
} from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId } from '../../../../../services/review-tool/services';
import { ProjectAssetEditDto, ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../various/Icon';

interface Props {
  asset: ProjectFolderDto | ProjectFileDto;
  onSuccess: () => void;
}

export const MoveToForm = ({ asset, onSuccess }: Props) => {
  const { project } = useProjectContext();
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();
  const { data: projectPaths = [] } = useGetProjectIdPaths(project.id);
  const { mutate: updateFile, isPending: isSavingFile } = usePutProjectIdFileFileId();
  const { mutate: updateFolder, isPending: isSavingFolder } = usePutProjectIdFolderFolderId();

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
    pushNotification({ icon: 'success', color: 'success', message: `The ${asset?.type} was successfully moved` });
    onSuccess?.();
  };

  const handleError = (error: unknown) => {
    pushNotification({ icon: 'error', message: getErrorMessage(error) });
  };

  const onSubmit = (body: { parentId: string }) => {
    const parentId = (body.parentId === 'home' ? null : body.parentId) as string | undefined;

    if (asset.type === 'file') {
      updateFile(
        { id: project.id, fileId: asset.id, requestBody: { parentId } },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        },
      );

      return;
    }

    updateFolder(
      { id: project.id, folderId: asset.id, requestBody: { parentId } },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      },
    );
  };

  const filteredPaths = projectPaths.filter(
    (folder) => folder.id !== asset.id && !folder.path.find((path) => path.id === asset.id),
  );

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select placeholder="Select destination" {...register('parentId', VALIDATION_RULES.REQUIRED)}>
        <SelectItem key="home" textValue={project.name} startContent={<Icon icon="slides" size={16} />}>
          {project.name}
        </SelectItem>
        <SelectSection title="Folders">
          {filteredPaths.map((folder) => (
            <SelectItem key={folder.id} textValue={folder.name} startContent={<Icon icon="folder" size={16} />}>
              {folder.path.map((path) => `${path.name} / `)}
              {folder.name}
            </SelectItem>
          ))}
        </SelectSection>
      </Select>
      <div className="flex justify-end gap-2">
        <Button variant="light">Cancel</Button>
        <Button type="submit" isDisabled={isPending} className="text-content1 bg-foreground">
          Move
        </Button>
      </div>
    </form>
  );
};
