'use client';

import React, { useState } from 'react';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNotificationNavigation } from '@/utils/navigation';

// Temporary type definitions
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

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, isLoading, error, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications } =
    useNotificationContext();
  const { navigateToNotificationTarget } = useNotificationNavigation();

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    navigateToNotificationTarget(notification);
    setIsOpen(false);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.FILE_ASSIGNED:
        return '📄';
      case NotificationType.FILE_STATUS_CHANGED:
        return '🔄';
      case NotificationType.FILE_COMMENT_ADDED:
      case NotificationType.FILE_COMMENT_REPLIED:
        return '💬';
      case NotificationType.CHAT_MESSAGE:
        return '💭';
      case NotificationType.PROJECT_INVITATION:
        return '📨';
      case NotificationType.PROJECT_ROLE_CHANGED:
        return '👤';
      default:
        return '📢';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="flex space-x-2">
                <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">
                  Mark all as read
                </button>
                <button onClick={deleteAllNotifications} className="text-sm text-red-600 hover:text-red-800">
                  Clear all
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="py-4 text-center text-gray-500">Loading notifications...</div>
            ) : error ? (
              <div className="py-4 text-center text-red-500">{error.message}</div>
            ) : notifications.length === 0 ? (
              <div className="py-4 text-center text-gray-500">No notifications</div>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`flex cursor-pointer items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification._id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
