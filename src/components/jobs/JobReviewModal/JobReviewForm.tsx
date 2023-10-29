import { Button, Radio, RadioGroup, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { requestJobOfferComplete, requestJobOfferReview } from '../../../services/job';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Rating } from '../../various/Rating';

interface Props {
  jobOfferId: Common.Id;
  jobOfferStatus: Job.Offer['status'];
  onCancel: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES: Job.OfferReviewPayload = {
  comment: '',
  reason: '',
  rating: 0,
};

type DefaultValues = typeof DEFAULT_VALUES;

export const JobReviewForm = ({ jobOfferId, jobOfferStatus, onCancel, onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { currentUser } = useSession();
  const isCreator = currentUser?.role === 'creator';
  const pushNotification = useNotifications((state) => state.pushNotification);

  const isCompleted = jobOfferStatus === 'completed';

  const mutation = isCompleted
    ? requestJobOfferReview
    : requestJobOfferComplete;
  const { mutate, isLoading } = useMutation(mutation, {
    onSuccess: () => {
      const message = isCompleted
        ? 'The review was sent'
        : 'The collaboration was successfully finished';
      pushNotification({
        message,
        color: 'success',
        icon: 'success',
      });
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
    mutate([jobOfferId, { ...data, rating: Number(data.rating) }]);
  };

  const textareaPlaceholder = isCreator
    ? 'Your thoughts on the professional\'s performance and collaboration (optional)'
    : 'Your thoughts on the creator\'s performance and collaboration (optional)';

  const buttonCopy = isCompleted
    ? 'Leave feedback'
    : 'Finish collaboration';

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center gap-4">
        {!isCompleted && (
          <RadioGroup label="Reason" color="secondary" isInvalid={!!errors.reason}>
            <Radio value="satisfied" {...register('reason', VALIDATION_RULES.REQUIRED)}>Successfully finished the collaboration</Radio>
            <Radio value="not-satisfied" {...register('reason', VALIDATION_RULES.REQUIRED)}>Not satisfied with the collaboration</Radio>
          </RadioGroup>
        )}
        <Rating label="Rate the collaboration" invalid={!!errors.rating} {...register('rating', VALIDATION_RULES.REQUIRED)} />
        <Textarea
          placeholder={textareaPlaceholder}
          aria-label={textareaPlaceholder}
          isDisabled={isLoading}
          isInvalid={!!errors.comment}
          fullWidth
          {...register('comment')}
        />
        <div className="flex justify-center gap-2 mb-2">
          <Button variant="light" color="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="flat" color="secondary" isLoading={isLoading}>
            {buttonCopy}
          </Button>
        </div>
      </div>
    </form>
  );
};
