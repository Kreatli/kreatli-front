import { Badge } from '@heroui/react';
import cx from 'classnames';
import React from 'react';

import { NOTIFICATION_TYPE } from '../../../../constants/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';
import { Icon } from '../../../various/Icon';

interface Props {
  notification: Notifications.Notification;
}

interface IconWrapperProps {
  children: React.ReactNode;
  showBorder?: boolean;
  color?: string;
}

export const IconWrapper = ({ children, color = 'secondary', showBorder = false }: IconWrapperProps) => {
  const className = cx(
    'flex w-8 h-8 items-center justify-center rounded-full',
    showBorder && 'border-1 border-foreground-200',
    color && `text-${color} bg-${color}-50`,
  );

  return <div className={className}>{children}</div>;
};

export const NotificationAvatar = ({ notification }: Props) => {
  const { type, isRead } = notification;

  const getAvatar = () => {
    switch (type) {
      case NOTIFICATION_TYPE.FILE_ASSIGNED:
        return (
          <IconWrapper color="primary">
            <Icon icon="file" />
          </IconWrapper>
        );

      case NOTIFICATION_TYPE.FILE_STATUS_CHANGED:
        return (
          <IconWrapper color="warning">
            <Icon icon="update" />
          </IconWrapper>
        );

      case NOTIFICATION_TYPE.FILE_COMMENT_ADDED:
      case NOTIFICATION_TYPE.FILE_COMMENT_REPLIED:
        return (
          <IconWrapper color="info">
            <Icon icon="reply" />
          </IconWrapper>
        );

      case NOTIFICATION_TYPE.CHAT_MESSAGE:
        return (
          <IconWrapper color="success">
            <Icon icon="chat" />
          </IconWrapper>
        );

      case NOTIFICATION_TYPE.PROJECT_INVITATION:
        return (
          <IconWrapper color="primary">
            <Icon icon="userPlus" />
          </IconWrapper>
        );

      case NOTIFICATION_TYPE.PROJECT_ROLE_CHANGED:
        return (
          <IconWrapper color="warning">
            <Icon icon="user" />
          </IconWrapper>
        );

      default:
        return (
          <IconWrapper>
            <Icon icon="bell" />
          </IconWrapper>
        );
    }
  };

  return (
    <Badge size="sm" content="" isInvisible={isRead} color="danger">
      {getAvatar()}
    </Badge>
  );
};
