import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';

interface Props {
  notification: Notifications.Notification;
}

const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPE.PROFILE_VERIFICATION]: 'Profile Active!',
  [NOTIFICATION_TYPE.TASK_COMPLETION]: 'New Task Completed!',
  [NOTIFICATION_TYPE.NEW_TIER]: 'Tier Triumph!',
  [NOTIFICATION_TYPE.INVITATION]: 'New Connection Request!',
  [NOTIFICATION_TYPE.INVITATION_ACCEPT]: 'Connection Established!',
  [NOTIFICATION_TYPE.POST_LIKE]: 'Post Praise!',
  [NOTIFICATION_TYPE.POST_COMMENT]: 'Join the Conversation!',
  [NOTIFICATION_TYPE.NEW_JOB_APPLICATION]: 'Job Application Received!',
  [NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT]: "You've Been Hired!",
  [NOTIFICATION_TYPE.JOB_APPLICATION_REJECT]: 'Keep Exploring Opportunities!',
  [NOTIFICATION_TYPE.COLLABORATION_COMPLETED]: 'Collaboration Success!',
  [NOTIFICATION_TYPE.FEEDBACK_RECEIVED]: 'Collaboration Feedback Shared!',
  [NOTIFICATION_TYPE.POINTS_PURCHASE]: 'Points Power-Up!',
  [NOTIFICATION_TYPE.JOB_APPLICATION_LIMIT]: 'Unlock More Opportunities!',
  [NOTIFICATION_TYPE.JOB_OFFER_LIMIT]: 'Elevate Your Job Posts!',
  [NOTIFICATION_TYPE.INVITATION_LIMIT]: 'Expand Your Network!',
  [NOTIFICATION_TYPE.DAILY_POINTS_LIMIT]: 'Daily Points Limit Reached!',
};

export const NotificationTitle = ({ notification }: Props) => {
  const { type } = notification;

  return <div className="text-small leading-4 font-semibold mb-1">{NOTIFICATION_TITLES[type]}</div>;
};
