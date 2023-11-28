import { EmptyState } from 'components/various/EmptyState';
import React from 'react';
import { Notifications as NotificationsI } from 'typings/notifications';

import { Notification } from '../Notification';

interface Props {
  notifications: NotificationsI.Notification[];
}

export const Notifications = ({ notifications = [] }: Props) => {
  const shouldShowEmptyState = notifications.length === 0;

  return (
    <div className="max-w-md">
      <div className="px-4 py-3 border-b-1 border-default-200">
        <h3 className="text-medium font-semibold">Notifications</h3>
      </div>
      <div className="max-h-[75vh] overflow-auto">
        {notifications.map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))}
        {shouldShowEmptyState && (
          <div className="px-4">
            <EmptyState title="No New Notifications" text="You're all caught up! Check back later for updates, or explore more of Kreatli in the meantime." />
          </div>
        )}
      </div>
    </div>
  );
};
