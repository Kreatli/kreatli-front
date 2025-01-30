import { Accordion, AccordionItem, Avatar, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { Common } from '../../../../typings/common';
import { Job } from '../../../../typings/marketplace/job';
import { JobApplicationContent } from './JobApplicationContent';
import { JobApplicationHeader } from './JobApplicationHeader';

interface Props {
  jobOfferId: Common.Id;
  jobOfferStatus: Job.Offer['status'];
  applications: Job.Application[];
  onReject?: () => void;
  onHire?: () => void;
}

export const JobApplications = ({ jobOfferId, jobOfferStatus, applications, onReject, onHire }: Props) => {
  return (
    <div>
      <p className="font-semibold">Applications:</p>
      <Accordion className="p-0">
        {applications.map((application) => (
          <AccordionItem
            key={application._id}
            title={
              <JobApplicationHeader
                professional={application.professional}
                status={application.status}
                creationDate={application.creationDate}
              />
            }
            subtitle={
              <Link as={NextLink} href={`/marketplace/profile/${application.professional._id}`} className="text-sm">
                View profile
              </Link>
            }
            startContent={<Avatar src={application.professional.avatarUrl} name={application.professional.name} />}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <JobApplicationContent
              jobOfferId={jobOfferId}
              jobApplicationId={application._id}
              professional={application.professional}
              coverLetter={application.coverLetter}
              status={application.status}
              jobOfferStatus={jobOfferStatus}
              onHire={onHire}
              onReject={onReject}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
