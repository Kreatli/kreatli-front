import { Card, CardBody, Divider } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';

const EARNING_POINTS_ACTIVITIES = [
  {
    title: 'Create High-Quality Content',
    text: 'Contribute to the platform by creating insightful posts, and giving feedback that helps others succeed',
    icon: 'taskWrite' as const,
    color: 'primary',
  },
  {
    title: 'Engage in Community',
    text: 'Participate in discussions, offer valuable insights, and collaborate with fellow professionals and creators',
    icon: 'taskEngage' as const,
    color: 'warning',
  },
  {
    title: 'Collaborate on Projects',
    text: 'Creators can hire professionals for their projects, while professionals can find clients seeking their expertise, creating a thriving ecosystem of collaboration',
    icon: 'taskSend' as const,
    color: 'secondary',
  },
  {
    title: 'Share Your Work',
    text: 'Showcase your expertise by sharing your portfolio, projects, and achievements',
    icon: 'taskGrow' as const,
    color: 'success',
  },
  {
    title: 'Refer Others',
    text: 'Invite friends and colleagues to join Kreatli, and when they register and engage on the platform, you\'ll earn points as a token of appreciation',
    icon: 'taskLike' as const,
    color: 'danger',
  },
];

export const EarningPoints = () => {
  return (
    <Card>
      <CardBody>
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
