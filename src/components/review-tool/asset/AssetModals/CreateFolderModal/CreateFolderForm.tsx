import { addToast, Button, Input } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../../constants/validationRules';
import { usePostProjectIdFolder } from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId, getProjectIdAssets } from '../../../../../services/review-tool/services';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  projectId: string;
  parentId?: string;
  onSuccess?: () => void;
}

export const CreateFolderForm = ({ projectId, parentId, onSuccess }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostProjectIdFolder();

  const onSubmit = ({ name }: { name: string }) => {
    mutate(
      { id: projectId, requestBody: { name, parentId } },
      {
        onSuccess: ({ project, parent }) => {
          if (parent) {
            queryClient.setQueryData([getAssetFolderId.key, parent.id], parent);
          }

          queryClient.setQueryData([getProjectId.key, projectId], project);
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, projectId] });
          onSuccess?.();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Folder name"
        placeholder="Folder"
        variant="faded"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Button type="submit" isLoading={isPending} className="bg-foreground text-content1 w-fit ml-auto">
        Create
      </Button>
    </form>
  );
};
