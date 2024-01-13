import { Card, CardBody, Divider } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../../various/Icon';

const EARNING_POINTS_ACTIVITIES = [
  {
    title: 'Create High-Quality Content',
    text: 'Contribute to the platform by creating insightful posts, and giving feedback that helps others succeed',
    icon: 'taskWrite' as const,
    color: 'secondary',
  },
  {
    title: 'Engage in Community',
    text: 'Participate in discussions, offer valuable insights, and collaborate with fellow professionals and creators',
    icon: 'taskEngage' as const,
    color: 'primary',
  },
  {
    title: 'Collaborate on Projects',
    text: 'Creators can hire professionals for their projects, while professionals can find clients seeking their expertise, creating a thriving ecosystem of collaboration',
    icon: 'taskSend' as const,
    color: 'warning',
  },
  {
    title: 'Platform Activities',
    text: 'Involve essential interactions within Kreatli, such as profile verification, daily visits, and tier progression. Users can earn points to enhance their profiles, get rewards, and climb tiers for exclusive benefits',
    icon: 'taskGrow' as const,
    color: 'success',
  },
];

export const EarningPoints = () => {
  return (
    <Card>
      <CardBody className="p-5">
        <h3 className="text-medium font-semibold mb-4">Earning Points</h3>
        <p className="text-sm text-default-500">Users can earn a maximum of 200 points daily.</p>
        <Divider className="my-4" />
        <p className="text-sm font-semibold text-default-500">Users can earn points by completing activities on Kreatli:</p>
        <div className="flex flex-col gap-2 mt-2">
          {EARNING_POINTS_ACTIVITIES.map(({ title, text, icon, color }) => (
            <div key={title} className="flex gap-3">
              {/* eslint-disable-next-line max-len */}
              <div className={`w-8 h-8 shrink-0 rounded-medium flex items-center justify-center bg-${color}-50 text-${color}-500`}>
                <Icon icon={icon} size={24} />
              </div>
              <div className="text-sm text-default-500">
                <span className="font-semibold">{title}</span>: {text}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
