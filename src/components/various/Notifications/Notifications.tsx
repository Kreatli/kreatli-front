import { Card, CardBody } from '@heroui/react';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { Icon } from '../Icon';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const { notifications } = useNotifications();

  if (!notifications?.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {notifications.map((notification) => (
        <Card key={notification._id} className={`${styles.card} text-foreground bg-background`}>
          <CardBody className="p-5">
            <div className={styles.content}>
              <Icon icon="bell" />
              {notification.message}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
