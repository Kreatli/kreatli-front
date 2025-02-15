import { Link } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { requestNotificationsMarkAsRead } from '../../../../services/marketplace/notifications';
import { Notifications as NotificationsI } from '../../../../typings/marketplace/notifications';
import { Icon } from '../../../various/Icon';
import { LazyList } from '../../../various/LazyList';
import { EmptyState } from '../../chat/EmptyState';
import { Notification } from '../Notification';

interface Props {
  isLoading: boolean;
  notifications: NotificationsI.Notification[];
  totalCount: number;
  unreadCount: number;
  onLoadMore: () => void;
  onReadAll: () => void;
}

export const Notifications = (props: Props) => {
  const { isLoading, notifications = [], totalCount, unreadCount, onReadAll, onLoadMore } = props;
  const shouldShowEmptyState = notifications.length === 0;
  const hasMoreNotifications = notifications.length < totalCount;

  const { mutate, isPending: isDisabled } = useMutation({
    mutationFn: requestNotificationsMarkAsRead,
    onSuccess: onReadAll,
  });

  const markAllAsRead = () => {
    mutate();
  };

  return (
    <div className="max-w-md">
      <div className="flex gap-2 justify-between px-4 py-3 border-b-1 border-default-200">
        <h3 className="text-medium font-semibold">Notifications</h3>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          as="button"
          size="sm"
          className="gap-1 text-default-400"
          disabled={unreadCount === 0}
          onClick={markAllAsRead}
        >
          <Icon icon="check" size={18} />
          Mark all as read
        </Link>
      </div>
      <div className="max-h-[75vh] overflow-auto">
        {!shouldShowEmptyState && (
          <LazyList hasMore={hasMoreNotifications} isLoading={isLoading} onLoadMore={onLoadMore}>
            {notifications.map((notification) => (
              <Notification key={notification._id} notification={notification} isDisabled={isDisabled} />
            ))}
          </LazyList>
        )}
        {shouldShowEmptyState && (
          <div className="px-4 py-8">
            <EmptyState
              title="No New Notifications"
              text="You're all caught up! Check back later for updates, or explore more of Kreatli in the meantime."
            />
          </div>
        )}
      </div>
    </div>
  );
};
