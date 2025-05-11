import { useRouter } from 'next/navigation';

enum NotificationType {
  FILE_ASSIGNED = 'FILE_ASSIGNED',
  FILE_STATUS_CHANGED = 'FILE_STATUS_CHANGED',
  FILE_COMMENT_ADDED = 'FILE_COMMENT_ADDED',
  FILE_COMMENT_REPLIED = 'FILE_COMMENT_REPLIED',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  PROJECT_INVITATION = 'PROJECT_INVITATION',
  PROJECT_ROLE_CHANGED = 'PROJECT_ROLE_CHANGED',
}

enum NotificationRecipient {
  PROJECT_OWNER = 'PROJECT_OWNER',
  INVITED_USER = 'INVITED_USER',
}

interface Notification {
  _id: string;
  type: NotificationType;
  recipient: NotificationRecipient;
  userId: string;
  title: string;
  message: string;
  data: {
    projectId: string;
    fileId?: string;
  };
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useNotificationNavigation = () => {
  const router = useRouter();

  const navigateToNotificationTarget = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.FILE_ASSIGNED:
      case NotificationType.FILE_STATUS_CHANGED:
      case NotificationType.FILE_COMMENT_ADDED:
      case NotificationType.FILE_COMMENT_REPLIED:
        router.push(`/projects/${notification.data.projectId}/files/${notification.data.fileId}`);
        break;
      case NotificationType.CHAT_MESSAGE:
        router.push(`/projects/${notification.data.projectId}/chat`);
        break;
      case NotificationType.PROJECT_INVITATION:
      case NotificationType.PROJECT_ROLE_CHANGED:
        router.push(`/projects/${notification.data.projectId}`);
        break;
      default:
        console.warn('Unknown notification type:', notification.type);
    }
  };

  return { navigateToNotificationTarget };
};
