import { Chip } from '@nextui-org/react';
import React from 'react';

import { JOB_APPLICATION_STATUS_COLORS, JOB_APPLICATION_STATUS_LABELS } from '../../../../constants/marketplace/job';
import { Job } from '../../../../typings/marketplace/job';
import { User } from '../../../../typings/marketplace/user';
import { formatRelativeTime } from '../../../../utils/dates';

interface Props {
  professional: User.ShortInfoProfessional;
  creationDate: Date;
  status: Job.Application['status'];
}

export const JobApplicationHeader = ({ professional, creationDate, status }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h5 className="text-sm font-medium">{professional.name}</h5>
      <p className="text-sm text-gray-400">{formatRelativeTime(creationDate)}</p>
      <Chip className="flex-1" size="sm" variant="flat" color={JOB_APPLICATION_STATUS_COLORS[status]}>
        {JOB_APPLICATION_STATUS_LABELS[status]}
      </Chip>
    </div>
  );
};
