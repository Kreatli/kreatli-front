import { Button, Grid, Loading, Popover, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
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
        color: 'error',
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
        color: 'error',
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
            <Popover.Trigger>
              <Button color="secondary" size="sm" auto rounded flat icon={<Icon icon="crossCircle" size={18} />}>
                Reject
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <div style={{ padding: '1rem' }}>
                <Text>Are you sure you want to reject this application?</Text>
                <Grid.Container css={{ mt: '$8' }}>
                  <Grid>
                    <Button disabled={isRejecting} size="sm" light auto onClick={() => setIsRejectConfirmationOpen(false)}>Cancel</Button>
                  </Grid>
                  <Grid>
                    <Button disabled={isRejecting} size="sm" color="error" auto onClick={handleReject}>
                      {isRejecting && <Loading size="xs" color="secondary" css={{ paddingRight: '$4' }} />}
                      Reject
                    </Button>
                  </Grid>
                </Grid.Container>
              </div>
            </Popover.Content>
          </Popover>
          <Popover isOpen={isAcceptConfirmationOpen} onOpenChange={setIsAcceptConfirmationOpen}>
            <Popover.Trigger>
              <Button color="secondary" size="sm" auto rounded icon={<Icon icon="checkCircle" size={18} />}>
                Hire
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <div style={{ padding: '1rem' }}>
                <Text>Are you sure you want to hire this professional?</Text>
                <Grid.Container css={{ mt: '$8' }}>
                  <Grid>
                    <Button disabled={isAccepting} size="sm" light auto onClick={() => setIsAcceptConfirmationOpen(false)}>Cancel</Button>
                  </Grid>
                  <Grid>
                    <Button disabled={isAccepting} size="sm" color="success" auto onClick={handleAccept}>
                      {isAccepting && <Loading size="xs" color="secondary" css={{ paddingRight: '$4' }} />}
                      Hire
                    </Button>
                  </Grid>
                </Grid.Container>
              </div>
            </Popover.Content>
          </Popover>
        </Alert>
      )}
      <Text>{coverLetter}</Text>
      {isPending && (
        <Row justify="space-between">
          <Text><Link href="/">Answer in chat</Link></Text>
        </Row>
      )}
    </div>
  );
};
