import { Avatar, Badge } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';

import { NOTIFICATION_TYPE } from '../../../constants/notifications';
import { TASK_COLOR_BY_TYPE, TASK_ICON_BY_TYPE } from '../../../constants/tasks';
import { Notifications } from '../../../typings/notifications';
import { Icon } from '../../various/Icon';
import { TierImage } from '../../various/TierImage';

interface Props {
  notification: Notifications.Notification;
}

interface IconWrapperProps {
  children: React.ReactNode;
  showBorder?: boolean;
  color?: string;
}

export const IconWrapper = ({ children, color = 'secondary', showBorder = false }: IconWrapperProps) => {
  const className = cx(
    'flex w-8 h-8 items-center justify-center rounded-full',
    showBorder && 'border-1 border-foreground-200',
    color && `text-${color} bg-${color}-50`,
  );

  return <div className={className}>{children}</div>;
};

export const NotificationAvatar = ({ notification }: Props) => {
  const { type, isRead } = notification;

  const getAvatar = () => {
    if (type === NOTIFICATION_TYPE.TASK_COMPLETION) {
      const { task } = notification.data;
      const icon = TASK_ICON_BY_TYPE[task.type];
      const color = TASK_COLOR_BY_TYPE[task.type];

      return (
        <IconWrapper color={color}>
          <Icon icon={icon} />
        </IconWrapper>
      );
    }

    if (
      type === NOTIFICATION_TYPE.INVITATION ||
      type === NOTIFICATION_TYPE.INVITATION_ACCEPT ||
      type === NOTIFICATION_TYPE.POST_LIKE ||
      type === NOTIFICATION_TYPE.POST_COMMENT ||
      type === NOTIFICATION_TYPE.NEW_JOB_APPLICATION
    ) {
      const { user } = notification.data;

      return <Avatar className="w-8 h-8" name={user.name} src={user.avatarUrl} />;
    }

    if (type === NOTIFICATION_TYPE.FEEDBACK_RECEIVED) {
      const { jobOffer } = notification.data;

      return <Avatar className="w-8 h-8" name={jobOffer.creator.name} src={jobOffer.creator.avatarUrl} />;
    }

    if (type === NOTIFICATION_TYPE.NEW_TIER) {
      const { tier } = notification.data;

      return (
        <div className="w-8 h-8">
          <TierImage tier={tier} className="w-8 h-8" />
        </div>
      );
    }

    if (
      type === NOTIFICATION_TYPE.POINTS_PURCHASE ||
      type === NOTIFICATION_TYPE.PROFILE_VERIFICATION ||
      type === NOTIFICATION_TYPE.JOB_OFFER_LIMIT ||
      type === NOTIFICATION_TYPE.JOB_APPLICATION_LIMIT ||
      type === NOTIFICATION_TYPE.INVITATION_LIMIT ||
      type === NOTIFICATION_TYPE.DAILY_POINTS_LIMIT
    ) {
      return (
        <IconWrapper>
          <Icon icon="logo" size={18} />
        </IconWrapper>
      );
    }

    if (type === NOTIFICATION_TYPE.COLLABORATION_COMPLETED) {
      const { user } = notification.data;

      return <Avatar className="w-8 h-8" name={user.name} src={user.avatarUrl} />;
    }

    if (type === NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT || type === NOTIFICATION_TYPE.JOB_APPLICATION_REJECT) {
      const { jobOffer } = notification.data;
      const { creator } = jobOffer;

      return <Avatar className="w-8 h-8" name={creator.name} src={creator.avatarUrl} />;
    }

    return null;
  };

  return (
    <Badge size="sm" content="" isInvisible={isRead} color="danger">
      {getAvatar()}
    </Badge>
  );
};
