import { Avatar, Card, CardFooter, CardHeader, Link } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  imageUrl?: string;
  description: string;
  companyName: string;
  companyUrl: string;
}

export const ExperienceCard = ({ description, companyName, companyUrl, imageUrl }: Props) => {
  return (
    <Card className="p-2">
      <CardHeader>
        <div className="flex w-full items-start gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Avatar
              src={imageUrl}
              isBordered
              color="default"
              className="bg-transparent"
              icon={<Icon icon="building" />}
            />
            <div>
              <p className="text-lg font-semibold">{companyName}</p>
              <Link href={companyUrl} target="_blank" className="flex items-center gap-1">
                <Icon icon="link" size={16} />
                link
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <p className="whitespace-pre-wrap">{description}</p>
      </CardFooter>
    </Card>
  );
};
