import { Tasks } from './tasks';
import { User } from './user';

export namespace Notifications {
  interface NotificationBase {
    isRead: boolean;
    creationDate: Date;
  }

  export interface TaskNotification extends NotificationBase {
    type: 'task';
    task: Tasks.Task;
  }

  export interface InvitationNotification extends NotificationBase {
    type: 'invitation';
    user: User.ShortInfo;
  }

  export interface TierNotification extends NotificationBase {
    type: 'tier';
    tier: 1 | 2 | 3 | 4;
  }

  export type Notification = TaskNotification | InvitationNotification | TierNotification;
}
