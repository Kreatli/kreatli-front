import { Button, Link, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { JOB_APPLICATION_STATUSES } from '../../../constants/job';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestJobApplicationAccept, requestJobApplicationReject } from '../../../services/job';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { User } from '../../../typings/user';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Alert } from '../../various/Alert';
import { Icon } from '../../various/Icon';
import styles from './JobApplications.module.scss';

interface Props {
  professional: User.Professional;
  jobOfferId: Common.Id;
  jobApplicationId: Common.Id;
  coverLetter: string;
  status: Job.Application['status'];
  jobOfferStatus: Job.Offer['status'];
}

export const JobApplicationContent = ({ professional, jobOfferId, jobOfferStatus, jobApplicationId, coverLetter, status }: Props) => {
  const [isRejectConfirmationOpen, setIsRejectConfirmationOpen] = React.useState(false);
  const [isAcceptConfirmationOpen, setIsAcceptConfirmationOpen] = React.useState(false);
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();
  const isPending = status === JOB_APPLICATION_STATUSES.PENDING && jobOfferStatus !== 'canceled';

  const updateJobOffers = (jobOffer: Job.Offer) => {
    const jobOffers = queryClient.getQueryData<Job.Offer[]>(['creator', 'job-offers']);
    const updatedJobOffers = jobOffers?.map((offer) => (offer._id === jobOffer._id ? jobOffer : offer));
    queryClient.setQueryData(['creator', 'job-offers'], updatedJobOffers);
  };

  const { isLoading: isRejecting, mutate: mutateReject } = useMutation(requestJobApplicationReject, {
    onSuccess: (jobOffer) => {
      setIsRejectConfirmationOpen(false);
      pushNotification({
        message: 'The application was successfully rejected',
        color: 'success',
        icon: 'success',
      });
      updateJobOffers(jobOffer);
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const { isLoading: isAccepting, mutate: mutateAccept } = useMutation(requestJobApplicationAccept, {
    onSuccess: (jobOffer) => {
      setIsAcceptConfirmationOpen(false);
      pushNotification({
        message: 'The professional was successfully hired',
        color: 'success',
        icon: 'success',
      });
      updateJobOffers(jobOffer);
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleReject = () => {
    mutateReject([jobOfferId, jobApplicationId]);
  };

  const handleAccept = () => {
    mutateAccept([jobOfferId, jobApplicationId]);
  };

  return (
    <div className={styles.jobApplicationContent}>
      {isPending && (
        <Alert text={`${professional.name} sends a request for cooperation for this project`}>
          <Popover isOpen={isRejectConfirmationOpen} onOpenChange={setIsRejectConfirmationOpen}>
            <PopoverTrigger>
              <Button color="secondary" size="sm" radius="lg" variant="flat" startContent={<Icon icon="crossCircle" size={18} />}>
                Reject
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="py-2">
                <p>Are you sure you want to reject this application?</p>
                <div className="flex gap-2 mt-2">
                  <Button isDisabled={isRejecting} size="sm" variant="light" onClick={() => setIsRejectConfirmationOpen(false)}>Cancel</Button>
                  <Button isLoading={isRejecting} size="sm" variant="flat" color="danger" onClick={handleReject}>Reject</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover isOpen={isAcceptConfirmationOpen} onOpenChange={setIsAcceptConfirmationOpen}>
            <PopoverTrigger>
              <Button color="secondary" size="sm" radius="lg" startContent={<Icon icon="checkCircle" size={18} />}>
                Hire
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="py-2">
                <p>Are you sure you want to hire this professional?</p>
                <div className="flex gap-2 mt-2">
                  <Button isDisabled={isAccepting} size="sm" variant="light" onClick={() => setIsAcceptConfirmationOpen(false)}>Cancel</Button>
                  <Button isLoading={isAccepting} size="sm" variant="flat" color="success" onClick={handleAccept}>Hire</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Alert>
      )}
      <p>{coverLetter}</p>
      {isPending && (
        <Link as={NextLink} href="/">Answer in chat</Link>
      )}
    </div>
  );
};
