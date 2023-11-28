import { Link } from '@nextui-org/react';
import { NOTIFICATION_TYPE } from 'constants/notifications';
import { useSession } from 'hooks/useSession';
import NextLink from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';
import { requestNotificationUpdate } from 'services/notifications';
import { Notifications } from 'typings/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationLink = ({ notification }: Props) => {
  const { currentUserId } = useSession();
  const { mutate } = useMutation(requestNotificationUpdate);

  const { _id: id, isRead, type } = notification;

  const handleClick = () => {
    if (!isRead) {
      mutate([id, { isRead: true }]);
    }
  };

  const notificationLinks: Partial<Record<Notifications.Notification['type'], { href: string; label: string }>> = {
    [NOTIFICATION_TYPE.TASK_COMPLETION]: {
      label: 'Go to Dashboard',
      href: '/dashboard',
    },
    [NOTIFICATION_TYPE.INVITATION]: {
      label: 'Visit Connections',
      href: `/profile/${currentUserId}/connections`,
    },
    [NOTIFICATION_TYPE.INVITATION_ACCEPT]: {
      label: 'Visit Connections',
      href: `/profile/${currentUserId}/connections`,
    },
    [NOTIFICATION_TYPE.NEW_TIER]: {
      label: 'Go to Dashboard',
      href: '/dashboard',
    },
    [NOTIFICATION_TYPE.POINTS_PURCHASE]: {
      label: 'Go to Dashboard',
      href: '/dashboard',
    },
    [NOTIFICATION_TYPE.POST_LIKE]: {
      label: 'Go to My posts',
      href: '/',
    },
    [NOTIFICATION_TYPE.POST_COMMENT]: {
      label: 'Go to My posts',
      href: '/',
    },
    [NOTIFICATION_TYPE.NEW_MESSAGE]: {
      label: 'Check Messages',
      href: '/chat',
    },
    [NOTIFICATION_TYPE.FEEDBACK_RECEIVED]: {
      label: 'Go to My jobs',
      href: `/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.NEW_JOB_APPLICATION]: {
      label: 'Go to My jobs',
      href: `/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.COLLABORATION_COMPLETED]: {
      label: 'Visit My jobs',
      href: `/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT]: {
      label: 'Visit My jobs',
      href: `/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.JOB_APPLICATION_REJECT]: {
      label: 'Visit My jobs',
      href: `/profile/${currentUserId}/jobs`,
    },
  };

  if (type in notificationLinks) {
    const { href, label } = notificationLinks[type] ?? {};

    return (
      <Link as={NextLink} size="sm" color="foreground" underline="always" href={href} className="mt-1" onClick={handleClick}>
        {label}
      </Link>
    );
  }

  return null;
};
