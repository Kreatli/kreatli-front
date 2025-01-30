import { Button, Input } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { usePostProjectIdMember } from '../../../../services/review-tool/hooks';
import { getProjectId, getProjects } from '../../../../services/review-tool/services';
import { ProjectDto } from '../../../../services/review-tool/types';

interface Props {
  project: ProjectDto;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const InviteProjectMemberForm = ({ project, onCancel, onSuccess }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: { email: '' },
  });

  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();
  const { mutate, isPending } = usePostProjectIdMember();

  const onSubmit = ({ email }: { email: string }) => {
    mutate(
      { id: project.id, requestBody: { email, role: 'contributor' } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          pushNotification({ icon: 'success', color: 'success', message: 'The invitation was sent' });
          reset();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Invite a new member"
        placeholder="example@mail.com"
        variant="faded"
        labelPlacement="outside"
        classNames={{ label: 'text-medium font-semibold' }}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email', VALIDATION_RULES.EMAIL)}
      />
      <div className="flex gap-4 justify-end">
        <Button isDisabled={isPending} variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending} className="bg-foreground text-content1">
          Invite
        </Button>
      </div>
    </form>
  );
};
