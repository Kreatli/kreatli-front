import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

import { UnverifiedUsers } from '../UnverifiedUsers';

export const AdminPanel = () => {
  return (
    <Tabs>
      <Tab key="unverified-users" title="Unverified users">
        <UnverifiedUsers />
      </Tab>
    </Tabs>
  );
};
