import React from 'react';

import { NOTIFICATION_TYPE } from '../../../constants/notifications';
import { TASK_COLOR_BY_TYPE } from '../../../constants/tasks';
import { TIER_LABELS } from '../../../constants/tier';
import { Notifications } from '../../../typings/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationText = ({ notification }: Props) => {
  const { type } = notification;

  if (type === NOTIFICATION_TYPE.TASK_COMPLETION) {
    const { task } = notification.data;

    return (
      <>
        Congratulations! You&apos;ve successfully completed a task
        <span className={`font-semibold text-${TASK_COLOR_BY_TYPE[task.type]}`}> {task.label}</span>. Head to your
        dashboard to explore your achievements.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.INVITATION) {
    const { user } = notification.data;

    return (
      <>
        {user.name} wants to connect with you. Expand your professional network and collaborate on exciting projects
        together.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.INVITATION_ACCEPT) {
    const { user } = notification.data;

    return (
      <>{user.name} accepted your connection request. Start networking and exploring collaborative opportunities!</>
    );
  }

  if (type === NOTIFICATION_TYPE.NEW_TIER) {
    const { tier } = notification.data;

    return (
      <>
        Celebrate your achievement of reaching a new tier, <span className="font-semibold">{TIER_LABELS[tier]}</span>.
        All Credits have been refilled, so enjoy the perks that come with it!
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.POINTS_PURCHASE) {
    return (
      <>Your points purchase was a success. Check your updated balance now and discover the possibilities on Kreatli.</>
    );
  }

  if (type === NOTIFICATION_TYPE.POST_LIKE) {
    return (
      <>
        Your post received likes. It&apos;s gaining attention, keep engaging with your audience and watch your influence
        grow.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.POST_COMMENT) {
    const { user } = notification.data;

    return (
      <>{user.name} has commented on your post. Join the conversation and respond to connect with your audience.</>
    );
  }

  if (type === NOTIFICATION_TYPE.FEEDBACK_RECEIVED) {
    const { jobOffer, user } = notification.data;

    return (
      <>
        {user.name} shared feedback on <span className="font-semibold">{jobOffer.title}</span>. Review and respond to
        enhance collaboration and improve your profile.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.PROFILE_VERIFICATION) {
    return (
      <>
        Your profile has been successfully verified and now is active. Explore the platform, showcase your skills, and
        connect with others in the Kreatli community.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.COLLABORATION_COMPLETED) {
    const { user, jobOffer } = notification.data;
    const { title } = jobOffer;

    return (
      <>
        {user.name} has completed the collaboration on <span className="font-semibold">{title}</span>. It&apos;s time to
        leave feedback and celebrate the success of your project.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.NEW_JOB_APPLICATION) {
    const { jobOffer } = notification.data;

    return (
      <>
        Great news! Your job posting <span className="font-semibold">{jobOffer.title}</span> has garnered attention, and
        a creative mind has applied. Review their application and start collaborating!
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.JOB_APPLICATION_ACCEPT) {
    const { jobOffer } = notification.data;
    const { title } = jobOffer;

    return (
      <>
        Congratulations! You&apos;ve been hired for a new project <span className="font-semibold">{title}</span>. Get
        started on your exciting new opportunity.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.JOB_APPLICATION_REJECT) {
    const { jobOffer } = notification.data;
    const { title } = jobOffer;

    return (
      <>
        Your job application for <span className="font-semibold">{title}</span> was rejected. Keep applying for new
        opportunities to find the perfect match.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.JOB_APPLICATION_LIMIT) {
    return (
      <>
        You&apos;ve run out of Job Application Credits. Want more? Explore the benefits of upgrading to Premium or
        purchasing points for more Job Application Credits.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.JOB_OFFER_LIMIT) {
    return (
      <>
        You&apos;ve run out of Job Posting Credits. Want more? Explore the benefits of upgrading to Premium or
        purchasing points for more Job Posting Credits.
      </>
    );
  }

  if (type === NOTIFICATION_TYPE.INVITATION_LIMIT) {
    return (
      <>You&apos;ve run out of Connection Requests. Need more? Consider upgrading to Premium or purchasing points.</>
    );
  }

  if (type === NOTIFICATION_TYPE.DAILY_POINTS_LIMIT) {
    return (
      <>
        You&apos;ve reached your daily points limit. Progress on tasks is not being tracked. Want more points? Consider
        upgrading to Premium or purchasing points.
      </>
    );
  }

  return null;
};
