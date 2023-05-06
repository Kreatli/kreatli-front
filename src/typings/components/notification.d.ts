import { SimpleColors } from '@nextui-org/react';

import { IconType } from '../../components/various/Icon';

export interface Notification {
  message: string;
  color?: SimpleColors;
  icon?: IconType;
}

export interface NotificationWithId extends Notification {
  id: string;
}
