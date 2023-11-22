import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';

import { Notifications } from '../Notifications';

export const NotificationButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="Toggle notifications menu"
          variant="light"
          className="text-foreground"
          radius="full"
        >
          <Badge size="sm" content="5" color="danger">
            <Icon icon="bell" size={20} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-hidden">
        <Notifications />
      </PopoverContent>
    </Popover>
  );
};
