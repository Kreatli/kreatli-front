import { Button, Grid, Loading, Spacer, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestJobApplicationCreation } from '../../../services/job';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

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
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const pushNotification = useNotifications((state) => state.pushNotification);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(requestJobApplicationCreation, {
    onSuccess: (jobOffer) => {
      pushNotification({
        message: 'Successfully applied',
        color: 'success',
        icon: 'success',
      });
      queryClient.setQueryData(['job-offer', jobOfferId], jobOffer);
      onSuccess();
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'error',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate([jobOfferId, data]);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container css={{ gap: '$2' }}>
        <Grid xs={12}>
          <Textarea
            placeholder={COVER_LETTER_PLACEHOLDER}
            aria-label="Any information you want to add to your application"
            disabled={isLoading}
            status={errors.coverLetter && 'error'}
            fullWidth
            {...register('coverLetter', VALIDATION_RULES.DESCRIPTION.MIN_100)}
          />
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Grid.Container css={{ gap: '$2' }} justify="space-between">
        <Grid>
          <Button type="submit" auto flat disabled={isLoading}>
            {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
            Apply for job
          </Button>
        </Grid>
        <Grid>
          <Button auto light color="primary" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};
