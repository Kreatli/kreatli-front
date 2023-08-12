import { Badge, Dropdown, Grid, Text } from '@nextui-org/react';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';

import { JobCard } from '../JobCard';
import { JOB_APPLICATION_STATUS_COLORS, JOB_APPLICATION_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { Icon } from '../../various/Icon';
import { useNotifications } from '../../../hooks/useNotifications';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { requestJobApplicationCancel } from '../../../services/job';

interface Props {
  jobOffer: Job.Offer;
}

export const MyJobsApplication = ({ jobOffer }: Props) => {
  const [jobApplication] = jobOffer.applications;

  const queryClient = useQueryClient();

  const updateJobApplication = (jobOffer: Job.Offer) => {
    const jobOffers = queryClient.getQueryData<Job.Offer[]>(['professional', 'job-applications']);
    const updatedJobOffers = jobOffers?.map((offer) => (offer._id === jobOffer._id ? jobOffer : offer));
    queryClient.setQueryData(['professional', 'job-applications'], updatedJobOffers);
  };

  const pushNotification = useNotifications((state) => state.pushNotification);
  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(requestJobApplicationCancel, {
    onSuccess: (jobOffer) => {
      updateJobApplication(jobOffer);
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
    mutateCancel([jobOffer._id, jobApplication._id]);
  };

  const isPending = jobApplication.status === 'pending';

  const dropdownMenu = [
    ...(isPending ? [{
      label: 'Cancel application',
      icon: 'cross' as const,
      color: 'error' as const,
    }] : []),
  ];

  const cardHeader = (
    <Grid.Container css={{ height: '2.5rem' }} alignItems="center" justify="space-between">
      <Grid>
        <Badge
          isSquared
          variant="flat"
          color={JOB_APPLICATION_STATUS_COLORS[jobApplication.status]}
        >
          {JOB_APPLICATION_STATUS_LABELS[jobApplication.status]}
        </Badge>
      </Grid>
      {isPending && (
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

  const cardFooter = <Text>{jobApplication.coverLetter}</Text>;

  return (
    <JobCard
      key={jobOffer._id}
      jobOffer={jobOffer}
      hideCreator
      header={cardHeader}
      footer={cardFooter}
    />
  );
};
