import { addToast, Button, Textarea } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../../constants/validationRules';
import { usePutProjectId } from '../../../../../services/review-tool/hooks';
import { getProjectId, getProjects } from '../../../../../services/review-tool/services';
import { ProjectDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  project: ProjectDto;
  onSuccess?: () => void;
}

export const EditProjectForm = ({ project, onSuccess }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: project.description,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = usePutProjectId();

  const onSubmit = ({ description }: { description: string }) => {
    mutate(
      { id: project.id, requestBody: { description } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData([getProjectId.key, project.id], data);
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          addToast({ title: 'The project was successfully updated', color: 'success', variant: 'flat' });
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
      <Textarea
        label="Description"
        placeholder="Describe your project"
        variant="faded"
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        {...register('description', VALIDATION_RULES.DESCRIPTION.OPTIONAL)}
      />
      <Button type="submit" isLoading={isPending} className="bg-foreground text-content1 w-fit ml-auto">
        Save changes
      </Button>
    </form>
  );
};
