import { Link } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { useNotificationsPopoverVisibility } from '../../../../hooks/marketplace/useNotificationsPopoverVisibility';
import { notificationService } from '../../../../services/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationLink = ({ notification }: Props) => {
  const { mutate } = useMutation({
    mutationFn: notificationService.markAsRead,
  });
  const { closePopover } = useNotificationsPopoverVisibility();
  const { _id: id, isRead, type, data } = notification;

  const handleClick = () => {
    closePopover();

    if (!isRead) {
      mutate(id);
    }
  };

  const getNotificationLink = () => {
    switch (type) {
      case NOTIFICATION_TYPE.FILE_ASSIGNED:
      case NOTIFICATION_TYPE.FILE_STATUS_CHANGED:
      case NOTIFICATION_TYPE.FILE_COMMENT_ADDED:
      case NOTIFICATION_TYPE.FILE_COMMENT_REPLIED: {
        const { projectId, fileId } = data as Notifications.FileAssignedNotification['data'];
        return {
          label:
            type === NOTIFICATION_TYPE.FILE_COMMENT_ADDED || type === NOTIFICATION_TYPE.FILE_COMMENT_REPLIED
              ? 'View Comments'
              : 'View File',
          href: `/projects/${projectId}/files/${fileId}${
            type === NOTIFICATION_TYPE.FILE_COMMENT_ADDED || type === NOTIFICATION_TYPE.FILE_COMMENT_REPLIED
              ? '#comments'
              : ''
          }`,
        };
      }

      case NOTIFICATION_TYPE.CHAT_MESSAGE: {
        const { projectId } = data as Notifications.ChatMessageNotification['data'];
        return {
          label: 'View Chat',
          href: `/projects/${projectId}/chat`,
        };
      }

      case NOTIFICATION_TYPE.PROJECT_INVITATION:
      case NOTIFICATION_TYPE.PROJECT_ROLE_CHANGED: {
        const { projectId } = data as Notifications.ProjectInvitationNotification['data'];
        return {
          label: 'View Project',
          href: `/projects/${projectId}`,
        };
      }

      default:
        return null;
    }
  };

  const link = getNotificationLink();

  if (link) {
    return (
      <Link
        as={NextLink}
        size="sm"
        color="foreground"
        underline="always"
        href={link.href}
        className="mt-1"
        onClick={handleClick}
      >
        {link.label}
      </Link>
    );
  }

  return null;
};
