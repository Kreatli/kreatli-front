import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { Notification, NotificationWithId } from '../typings/components/notification';

interface State {
  notifications: NotificationWithId[];
  pushNotification: (notification: Notification) => void;
}

export const useNotifications = create<State>((set) => ({
  notifications: [],
  pushNotification: (notification) => {
    const id = nanoid();

    set((state) => ({
      notifications: [...state.notifications, { id, ...notification }],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(({ id: notificationId }) => notificationId !== id),
      }));
    }, 5000);
  },
}));
