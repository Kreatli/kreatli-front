import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';

interface Props {
  notification: Notifications.Notification;
}

const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPE.FILE_ASSIGNED]: 'File Assigned',
  [NOTIFICATION_TYPE.FILE_STATUS_CHANGED]: 'File Status Updated',
  [NOTIFICATION_TYPE.FILE_COMMENT_ADDED]: 'New Comment',
  [NOTIFICATION_TYPE.FILE_COMMENT_REPLIED]: 'Comment Reply',
  [NOTIFICATION_TYPE.CHAT_MESSAGE]: 'New Message',
  [NOTIFICATION_TYPE.PROJECT_INVITATION]: 'Project Invitation',
  [NOTIFICATION_TYPE.PROJECT_ROLE_CHANGED]: 'Role Updated',
} as const;

export const NotificationTitle = ({ notification }: Props) => {
  const { type } = notification;

  return <div className="text-small leading-4 font-semibold mb-1">{NOTIFICATION_TITLES[type]}</div>;
};
