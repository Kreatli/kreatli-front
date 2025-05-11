import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationText = ({ notification }: Props) => {
  const { type, data } = notification;

  if (type === NOTIFICATION_TYPE.FILE_ASSIGNED) {
    const fileData = data as Notifications.FileAssignedNotification['data'];
    return (
      <>
        {fileData.assignerName} assigned you to the file <span className="font-semibold">{fileData.fileName}</span>.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.FILE_STATUS_CHANGED) {
    const fileData = data as Notifications.FileStatusChangedNotification['data'];
    return (
      <>
        {fileData.updaterName} changed the status of <span className="font-semibold">{fileData.fileName}</span> to{' '}
        <span className="font-semibold">{fileData.newStatus}</span>.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.FILE_COMMENT_ADDED) {
    const fileData = data as Notifications.FileCommentAddedNotification['data'];
    return (
      <>
        {fileData.commenterName} added a comment to <span className="font-semibold">{fileData.fileName}</span>: &quot;
        {fileData.commentText}&quot;
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.FILE_COMMENT_REPLIED) {
    const fileData = data as Notifications.FileCommentRepliedNotification['data'];
    return (
      <>
        {fileData.replierName} replied to a comment on <span className="font-semibold">{fileData.fileName}</span>:
        &quot;
        {fileData.replyText}&quot;
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.CHAT_MESSAGE) {
    const chatData = data as Notifications.ChatMessageNotification['data'];
    return (
      <>
        {chatData.senderName} sent a message: &quot;{chatData.messageText}&quot;
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.PROJECT_INVITATION) {
    const projectData = data as Notifications.ProjectInvitationNotification['data'];
    return (
      <>
        {projectData.inviterName} invited you to join the project{' '}
        <span className="font-semibold">{projectData.projectName}</span>.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.PROJECT_ROLE_CHANGED) {
    const projectData = data as Notifications.ProjectRoleChangedNotification['data'];
    return (
      <>
        Your role in the project <span className="font-semibold">{projectData.projectName}</span> has been changed to{' '}
        <span className="font-semibold">{projectData.newRole}</span>.
      </>
    );
  }

  return null;
};
