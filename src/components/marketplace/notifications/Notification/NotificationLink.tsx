import { Link } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { useNotificationsPopoverVisibility } from '../../../../hooks/marketplace/useNotificationsPopoverVisibility';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { requestNotificationUpdate } from '../../../../services/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationLink = ({ notification }: Props) => {
  const { currentUserId } = useSession();
  const { mutate } = useMutation({
    mutationFn: requestNotificationUpdate,
  });
  const { closePopover } = useNotificationsPopoverVisibility();
  const { _id: id, isRead, type } = notification;

  const handleClick = () => {
    closePopover();

    if (!isRead) {
      mutate([id, { isRead: true }]);
    }
  };

  const notificationLinks: Partial<Record<Notifications.Notification['type'], { href: string; label: string }>> = {
    [NOTIFICATION_TYPE.TASK_COMPLETION]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.INVITATION]: {
      label: 'Visit Connections',
      href: `/marketplace/profile/${currentUserId}/connections`,
    },
    [NOTIFICATION_TYPE.INVITATION_ACCEPT]: {
      label: 'Visit Connections',
      href: `/marketplace/profile/${currentUserId}/connections`,
    },
    [NOTIFICATION_TYPE.NEW_TIER]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.POINTS_PURCHASE]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.POST_LIKE]: {
      label: 'Go to My posts',
      href: '/marketplace/?filter=myPosts',
    },
    [NOTIFICATION_TYPE.POST_COMMENT]: {
      label: 'Go to My posts',
      href: '/marketplace/?filter=myPosts',
    },
    [NOTIFICATION_TYPE.FEEDBACK_RECEIVED]: {
      label: 'Go to My jobs',
      href: `/marketplace/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.NEW_JOB_APPLICATION]: {
      label: 'Go to My jobs',
      href: `/marketplace/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.COLLABORATION_COMPLETED]: {
      label: 'Visit My jobs',
      href: `/marketplace/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT]: {
      label: 'Visit My jobs',
      href: `/marketplace/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.JOB_APPLICATION_REJECT]: {
      label: 'Visit My jobs',
      href: `/marketplace/profile/${currentUserId}/jobs`,
    },
    [NOTIFICATION_TYPE.JOB_APPLICATION_LIMIT]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.JOB_OFFER_LIMIT]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.INVITATION_LIMIT]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
    [NOTIFICATION_TYPE.DAILY_POINTS_LIMIT]: {
      label: 'Go to Dashboard',
      href: '/marketplace/dashboard',
    },
  };

  if (type in notificationLinks) {
    const { href, label } = notificationLinks[type] ?? {};

    return (
      <Link
        as={NextLink}
        size="sm"
        color="foreground"
        underline="always"
        href={href}
        className="mt-1"
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  }

  return null;
};
