import { Badge, Dropdown, Grid, Text } from '@nextui-org/react';
import React from 'react';

import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import { JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { useMutation, useQueryClient } from 'react-query';
import { requestJobOfferCancel } from '../../../services/job';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useNotifications } from '../../../hooks/useNotifications';
import { Icon } from '../../various/Icon';

interface Props {
  jobOffer: Job.Offer;
}

export const MyJobsOffer = ({ jobOffer }: Props) => {
  const isPosted = jobOffer.status === 'posted';
  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();

  const updateJobOffer = (jobOffer: Job.Offer) => {
    const jobOffers = queryClient.getQueryData<Job.Offer[]>(['creator', 'job-offers']);
    const updatedJobOffers = jobOffers?.map((offer) => (offer._id === jobOffer._id ? jobOffer : offer));
    queryClient.setQueryData(['creator', 'job-offers'], updatedJobOffers);
  };

  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(requestJobOfferCancel, {
    onSuccess: (jobOffer) => {
      updateJobOffer(jobOffer);
      pushNotification({
        message: 'You cancelled this application',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'error',
        icon: 'error',
      });
    },
  });

  const handleAction = () => {
    mutateCancel(jobOffer._id);
  };

  const dropdownMenu = [
    {
      label: 'Cancel offer',
      icon: 'cross' as const,
      color: 'error' as const,
    },
  ];

  const cardHeader = (
    <Grid.Container css={{ height: '2.5rem' }} alignItems="center" justify="space-between">
      <Grid>
        <Badge
          variant="flat"
          isSquared
          color={JOB_OFFER_STATUS_COLORS[jobOffer.status]}
        >
          {JOB_OFFER_STATUS_LABELS[jobOffer.status]}
        </Badge>
      </Grid>
      {isPosted && (
        <Grid>
          <Dropdown isDisabled={isCanceling} placement="bottom-right">
            <Dropdown.Button light rounded icon={<Icon icon="dots" />} />
            <Dropdown.Menu onAction={handleAction}>
              {dropdownMenu.map(({ icon, color, label }) => (
                <Dropdown.Item key={label} icon={<Icon icon={icon} />} color={color}>{label}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
      )}
    </Grid.Container>
  );

  const cardFooter = (
    jobOffer.applications.length > 0
      ? <JobApplications jobOfferId={jobOffer._id} jobOfferStatus={jobOffer.status} applications={jobOffer.applications} />
      : <Text color="$accents6" i>There are no applications yet</Text>
  );

  return (
    <JobCard
      jobOffer={jobOffer}
      hideCreator
      header={cardHeader}
      footer={cardFooter}
    />
  );
};
