import React from 'react';
import { Common } from '../../../typings/common';
import { useForm } from 'react-hook-form';
import { useNotifications } from '../../../hooks/useNotifications';
import { useMutation, useQueryClient } from 'react-query';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Button, Grid, Loading, Textarea } from '@nextui-org/react';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { requestJobOfferComplete, requestJobOfferReview } from '../../../services/job';
import { Job } from '../../../typings/job';
import { Rating } from '../../various/Rating';
import { useSession } from '../../../hooks/useSession';

interface Props {
  jobOfferId: Common.Id;
  onCancel: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  comment: '',
  rating: 0,
};

type DefaultValues = typeof DEFAULT_VALUES;

export const JobReviewForm = ({ jobOfferId, onCancel, onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { currentUser } = useSession();
  const isCreator = currentUser?.role === 'creator';
  const pushNotification = useNotifications((state) => state.pushNotification);

  const updateJobOffer = (jobOffer: Job.Offer) => {
    const query = isCreator
      ? ['creator', 'job-offers']
      : ['professional', 'job-offers'];
    const jobOffers = queryClient.getQueryData<Job.Offer[]>(query);
    const updatedJobOffers = jobOffers?.map((offer) => (offer._id === jobOffer._id ? jobOffer : offer));
    queryClient.setQueryData(query, updatedJobOffers);
  };

  const queryClient = useQueryClient();
  const mutation = isCreator
    ? requestJobOfferComplete
    : requestJobOfferReview;
  const { mutate, isLoading } = useMutation(mutation, {
    onSuccess: (jobOffer) => {
      const message = isCreator
        ? 'The job was successfully completed'
        : 'Review was sent';
      pushNotification({
        message,
        color: 'success',
        icon: 'success',
      });
      updateJobOffer(jobOffer);
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

  const textareaPlaceholder = isCreator
    ? 'Your thoughts on the professional\'s performance and collaboration (optional)'
    : 'Your thoughts on the creator\'s performance and collaboration (optional)';

  const buttonCopy = isCreator
    ? 'Complete job'
    : 'Leave comment';

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container css={{ gap: '$10' }} justify="center">
        <Grid>
          <Rating invalid={!!errors.rating} {...register('rating', VALIDATION_RULES.REQUIRED)} />
        </Grid>
        <Grid xs={12}>
          <Textarea
            placeholder={textareaPlaceholder}
            aria-label={textareaPlaceholder}
            disabled={isLoading}
            status={errors.comment && 'error'}
            fullWidth
            {...register('comment')}
          />
        </Grid>
        <Grid xs={12}>
          <Grid.Container css={{ gap: '$2' }} justify="center">
          <Grid>
            <Button auto light onClick={onCancel}>Cancel</Button>
          </Grid>
          <Grid>
            <Button type="submit" auto flat color="secondary" disabled={isLoading}>
              {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
              {buttonCopy}
            </Button>
          </Grid>
        </Grid.Container>
        </Grid>
      </Grid.Container>
    </form>
  );
};
