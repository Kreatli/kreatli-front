import { Card } from '@nextui-org/react';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { Notification } from '../../../typings/components/notification';
import { Icon } from '../Icon';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const notifications = useNotifications((state) => state.notifications);

  const getCardCss = (color: Notification['color']) => {
    if (color === 'default') {
      return {
        oveflow: 'unset',
      };
    }

    return {
      oveflow: 'unset',
      $$cardColor: `$colors$${color}Light`,
      color: `$colors$${color}`,
    };
  };

  return (
    <div className={styles.wrapper}>
      {notifications.map(({ id, message, color = 'error', icon }) => (
        <Card key={id} className={styles.card} css={getCardCss(color)}>
          <Card.Body>
            <div className={styles.content}>
              {icon && <Icon icon={icon} />}
              {message}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
