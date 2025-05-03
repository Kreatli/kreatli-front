import { ThemeColors } from '@heroui/react';

import { IconType } from '../../components/various/Icon';

export interface Notification {
  message: string;
  color?: keyof ThemeColors;
  icon?: IconType;
}

export interface NotificationWithId extends Notification {
  id: string;
}
