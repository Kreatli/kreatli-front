import { Button, Textarea } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { requestJobApplicationCreation } from '../../../../services/marketplace/job';
import { Common } from '../../../../typings/common';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

interface Props {
  jobOfferId: Common.Id;
  onCancel: () => void;
  onSuccess: () => void;
}

// eslint-disable-next-line max-len
const COVER_LETTER_PLACEHOLDER = `Introduce yourself, answer/ask questions, provide valuable information, clarify the requirements, etc.
Make your application stand out!`;

const DEFAULT_VALUES = {
  coverLetter: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const JobApplicationForm = ({ jobOfferId, onCancel, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onTouched' });
  const pushNotification = useNotifications((state) => state.pushNotification);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: requestJobApplicationCreation,
    onSuccess: (jobOffer) => {
      pushNotification({
        message: 'Successfully applied',
        color: 'success',
        icon: 'success',
      });
      queryClient.refetchQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['job-offers'] });
      queryClient.setQueryData(['job-offer', jobOfferId], jobOffer);
      onSuccess();
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate([jobOfferId, data]);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder={COVER_LETTER_PLACEHOLDER}
        aria-label="Any information you want to add to your application"
        isDisabled={isPending}
        isInvalid={!!errors.coverLetter}
        fullWidth
        errorMessage={errors.coverLetter?.message}
        {...register('coverLetter', VALIDATION_RULES.DESCRIPTION.MIN_100)}
      />
      <div className="flex justify-center gap-2 mt-4">
        <Button variant="light" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
          Apply for a job
        </Button>
      </div>
    </form>
  );
};
