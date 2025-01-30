import { Common } from '../common';
import { Tasks } from './tasks';
import { User } from './user';
import { Job } from './job';

export namespace Notifications {
  interface NotificationBase {
    _id: Common.Id;
    isRead: boolean;
    creationDate: Date;
  }

  export interface TaskNotification extends NotificationBase {
    type: 'task-completion';
    data: {
      task: Tasks.Task;
    };
  }

  export interface InvitationNotification extends NotificationBase {
    type: 'invitation';
    data: {
      user: User.ShortInfo;
    };
  }

  export interface InvitationAcceptNotification extends NotificationBase {
    type: 'invitation-accept';
    data: {
      user: User.ShortInfo;
    };
  }

  export interface TierNotification extends NotificationBase {
    type: 'new-tier';
    data: {
      tier: 1 | 2 | 3 | 4;
    };
  }

  export interface PostLikeNotification extends NotificationBase {
    type: 'post-like';
    data: {
      user: User.ShortInfo;
    };
  }

  export interface PostCommentNotification extends NotificationBase {
    type: 'post-comment';
    data: {
      user: User.ShortInfo;
    };
  }

  export interface ProfileVerificationNotification extends NotificationBase {
    type: 'profile-verification';
  }

  export interface NewJobApplication extends NotificationBase {
    type: 'new-job-application';
    data: {
      jobOffer: Job.Offer;
      user: User.ShortInfo;
    };
  }

  export interface JobApplicationAcceptNotification extends NotificationBase {
    type: 'job-application-accept';
    data: {
      jobOffer: Job.Offer;
    };
  }

  export interface JobApplicationRejectNotification extends NotificationBase {
    type: 'job-application-reject';
    data: {
      jobOffer: Job.Offer;
    };
  }

  export interface CollaborationCompletedNotification extends NotificationBase {
    type: 'collaboration-completed';
    data: {
      jobOffer: Job.Offer;
      user: User.ShortInfo;
    };
  }

  export interface FeedbackReceivedNotification extends NotificationBase {
    type: 'feedback-received';
    data: {
      jobOffer: Job.Offer;
      user: User.ShortInfo;
    };
  }

  export interface PointsPurchaseNotification extends NotificationBase {
    type: 'points-purchase';
  }

  export interface JobApplicationLimitNotification extends NotificationBase {
    type: 'job-application-limit';
  }

  export interface JobOfferLimitNotification extends NotificationBase {
    type: 'job-offer-limit';
  }

  export interface InvitationLimitNotification extends NotificationBase {
    type: 'invitation-limit';
  }

  export interface DailyPointsLimitNotification extends NotificationBase {
    type: 'daily-points-limit';
  }

  export type Notification =
    | TaskNotification
    | InvitationNotification
    | InvitationAcceptNotification
    | TierNotification
    | PointsPurchaseNotification
    | PostLikeNotification
    | PostCommentNotification
    | FeedbackReceivedNotification
    | ProfileVerificationNotification
    | CollaborationCompletedNotification
    | NewJobApplication
    | JobApplicationAcceptNotification
    | JobApplicationRejectNotification
    | JobApplicationLimitNotification
    | JobOfferLimitNotification
    | InvitationLimitNotification
    | DailyPointsLimitNotification;
}
