import { ThemeColors } from '@nextui-org/react';

import { IconType } from '../../components/various/Icon';

export interface Notification {
  message: string;
  color?: keyof ThemeColors;
  icon?: IconType;
}

export interface NotificationWithId extends Notification {
  id: string;
}
