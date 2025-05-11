export namespace Notifications {
  export enum NotificationType {
    FILE_ASSIGNED = 'FILE_ASSIGNED',
    FILE_STATUS_CHANGED = 'FILE_STATUS_CHANGED',
    FILE_COMMENT_ADDED = 'FILE_COMMENT_ADDED',
    FILE_COMMENT_REPLIED = 'FILE_COMMENT_REPLIED',
    CHAT_MESSAGE = 'CHAT_MESSAGE',
    PROJECT_INVITATION = 'PROJECT_INVITATION',
    PROJECT_ROLE_CHANGED = 'PROJECT_ROLE_CHANGED',
  }

  export enum NotificationRecipient {
    PROJECT_OWNER = 'PROJECT_OWNER',
    INVITED_USER = 'INVITED_USER',
  }

  export interface NotificationBase {
    _id: string;
    type: NotificationType;
    recipient: NotificationRecipient;
    userId: string;
    title: string;
    message: string;
    data: Record<string, string | number | boolean>;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface FileAssignedNotification extends NotificationBase {
    type: NotificationType.FILE_ASSIGNED;
    data: {
      fileId: string;
      fileName: string;
      assignerName: string;
      projectId: string;
    };
  }

  export interface FileStatusChangedNotification extends NotificationBase {
    type: NotificationType.FILE_STATUS_CHANGED;
    data: {
      fileId: string;
      fileName: string;
      updaterName: string;
      newStatus: string;
      projectId: string;
    };
  }

  export interface FileCommentAddedNotification extends NotificationBase {
    type: NotificationType.FILE_COMMENT_ADDED;
    data: {
      fileId: string;
      fileName: string;
      commenterName: string;
      commentText: string;
      projectId: string;
    };
  }

  export interface FileCommentRepliedNotification extends NotificationBase {
    type: NotificationType.FILE_COMMENT_REPLIED;
    data: {
      fileId: string;
      fileName: string;
      replierName: string;
      replyText: string;
      projectId: string;
    };
  }

  export interface ChatMessageNotification extends NotificationBase {
    type: NotificationType.CHAT_MESSAGE;
    data: {
      senderName: string;
      messageText: string;
      projectId: string;
    };
  }

  export interface ProjectInvitationNotification extends NotificationBase {
    type: NotificationType.PROJECT_INVITATION;
    data: {
      projectId: string;
      projectName: string;
      inviterName: string;
    };
  }

  export interface ProjectRoleChangedNotification extends NotificationBase {
    type: NotificationType.PROJECT_ROLE_CHANGED;
    data: {
      projectId: string;
      projectName: string;
      newRole: string;
    };
  }

  export type Notification =
    | FileAssignedNotification
    | FileStatusChangedNotification
    | FileCommentAddedNotification
    | FileCommentRepliedNotification
    | ChatMessageNotification
    | ProjectInvitationNotification
    | ProjectRoleChangedNotification;
}
