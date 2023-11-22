import React from 'react';
import { Notifications as NotificationsI } from 'typings/notifications';
import { Tasks } from 'typings/tasks';
import { User } from 'typings/user';

import { Notification } from '../Notification';

const NOTIFICATIONS: NotificationsI.Notification[] = [
  {
    isRead: false,
    creationDate: new Date(Date.now() - 100000),
    type: 'task',
    task: {
      type: 'engagement',
      label: 'Write 10 comments',
      points: 20,
    } as Tasks.Task,
  },
  {
    isRead: false,
    creationDate: new Date(Date.now() - 200000),
    type: 'invitation',
    user: {
      _id: ':id',
      name: 'Heorhi Tolochko',
      avatarUrl: 'https://avatars.githubusercontent.com/u/33192552?s=80&u=547d5ff160112399666f6bf97536cabd1880d8a9&v=4',
    } as User.ShortInfo,
  },
  {
    isRead: true,
    creationDate: new Date(Date.now() - 500000000),
    type: 'tier',
    tier: 4,
  },
];

export const Notifications = () => {
  return (
    <div className="max-w-md">
      <div className="px-4 py-3 border-b-1 border-default-200">
        <h3 className="text-medium font-semibold">Notifications</h3>
      </div>
      <div className="max-h-[75vh] overflow-auto">
        {NOTIFICATIONS.map((notification, index) => (
          <Notification key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};
