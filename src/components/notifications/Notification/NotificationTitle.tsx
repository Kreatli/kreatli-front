import { NOTIFICATION_TYPE } from 'constants/notifications';
import React from 'react';
import { Notifications } from 'typings/notifications';

interface Props {
  notification: Notifications.Notification;
}

const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPE.PROFILE_VERIFICATION]: 'Profile Active!',
  [NOTIFICATION_TYPE.TASK_COMPLETION]: 'New Task Completed!',
  [NOTIFICATION_TYPE.NEW_TIER]: 'Tier Triumph!',
  [NOTIFICATION_TYPE.INVITATION]: 'New Connection Request!',
  [NOTIFICATION_TYPE.INVITATION_ACCEPT]: 'Connection Established!',
  [NOTIFICATION_TYPE.NEW_MESSAGE]: 'Message Received!',
  [NOTIFICATION_TYPE.POST_LIKE]: 'Post Praise!',
  [NOTIFICATION_TYPE.POST_COMMENT]: 'Join the Conversation!',
  [NOTIFICATION_TYPE.NEW_JOB_APPLICATION]: 'Job Application Received!',
  [NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT]: 'You\'ve Been Hired!',
  [NOTIFICATION_TYPE.JOB_APPLICATION_REJECT]: 'Keep Exploring Opportunities!',
  [NOTIFICATION_TYPE.COLLABORATION_COMPLETED]: 'Collaboration Success!',
  [NOTIFICATION_TYPE.FEEDBACK_RECEIVED]: 'Collaboration Feedback Shared!',
  [NOTIFICATION_TYPE.POINTS_PURCHASE]: 'Points Power-Up!',
};

export const NotificationTitle = ({ notification }: Props) => {
  const { type } = notification;

  return (
    <div className="text-small leading-4 font-semibold mb-1">{NOTIFICATION_TITLES[type]}</div>
  );
};
