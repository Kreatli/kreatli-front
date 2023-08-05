import { Avatar, Collapse, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { JobApplicationContent } from './JobApplicationContent';
import { JobApplicationHeader } from './JobApplicationHeader';

interface Props {
  jobOfferId: Common.Id;
  applications: Job.Application[];
}

export const JobApplications = ({ jobOfferId, applications }: Props) => {
  return (
    <div>
      <Text weight="semibold">Applications:</Text>
      <Collapse.Group css={{ p: 0 }}>
        {applications.map((application) => (
          <Collapse
            key={application._id}
            title={(
              <JobApplicationHeader
                professional={application.professional}
                status={application.status}
                creationDate={application.creationDate}
              />
            )}
            subtitle={<Text size="$sm"><Link href={`/profile/${application.professional._id}`}>View profile</Link></Text>}
            contentLeft={(
              <Avatar src={application.professional.avatarUrl} pointer />
            )}
          >
            <JobApplicationContent
              jobOfferId={jobOfferId}
              jobApplicationId={application._id}
              professional={application.professional}
              coverLetter={application.coverLetter}
              status={application.status}
            />
          </Collapse>
        ))}
      </Collapse.Group>
    </div>
  );
};
