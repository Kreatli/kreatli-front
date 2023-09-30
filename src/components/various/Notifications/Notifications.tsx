import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { Icon } from '../Icon';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const notifications = useNotifications((state) => state.notifications);

  return (
    <div className={styles.wrapper}>
      {notifications.map(({ id, message, color = 'danger', icon }) => (
        <Card key={id} className={`${styles.card} text-${color} bg-${color}-50`}>
          <CardBody>
            <div className={styles.content}>
              {icon && <Icon icon={icon} />}
              {message}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
