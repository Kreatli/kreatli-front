import { Link } from '@nextui-org/react';
import { useSession } from 'hooks/useSession';
import NextLink from 'next/link';
import React from 'react';
import { Notifications } from 'typings/notifications';

interface Props {
  type: Notifications.Notification['type'];
}

const NOTIFICATION_LINK_LABELS = {
  task: 'Go to dashboard',
  invitation: 'See invitations',
  tier: 'Go to dashboard',
};

export const NotificationLink = ({ type }: Props) => {
  const { currentUserId } = useSession();

  const linkHref = React.useMemo(() => {
    if (type === 'task' || type === 'tier') {
      return '/dashboard';
    }

    if (type === 'invitation') {
      return `/profile/${currentUserId}/connections`;
    }

    return '';
  }, [currentUserId, type]);

  return (
    <Link as={NextLink} size="sm" color="foreground" underline="always" href={linkHref} className="mt-1">
      {NOTIFICATION_LINK_LABELS[type]}
    </Link>
  );
};
