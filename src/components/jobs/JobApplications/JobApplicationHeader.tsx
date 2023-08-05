import { Badge, Row, Text } from '@nextui-org/react';
import React from 'react';

import { JOB_APPLICATION_STATUS_COLORS, JOB_APPLICATION_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { User } from '../../../typings/user';
import { formatRelativeTime } from '../../../utils/dates';

interface Props {
  professional: User.Professional;
  creationDate: Date;
  status: Job.Application['status'];
}

export const JobApplicationHeader = ({ professional, creationDate, status }: Props) => {
  return (
    <Row css={{ gap: '$4' }}>
      <Text h5>{professional.name}</Text>
      <Text size="$sm" color="$accents6">{formatRelativeTime(creationDate)}</Text>
      <Badge
        css={{ flex: 1 }}
        size="xs"
        variant="flat"
        color={JOB_APPLICATION_STATUS_COLORS[status]}
      >
        {JOB_APPLICATION_STATUS_LABELS[status]}
      </Badge>
    </Row>
  );
};
