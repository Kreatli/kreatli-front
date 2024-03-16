import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

import { Creators } from '../Creators';
import { RejectedUsers } from '../RejectedUsers.tsx';
import { UnverifiedUsers } from '../UnverifiedUsers';

export const AdminPanel = () => {
  return (
    <Tabs>
      <Tab key="unverified-users" title="Unverified users">
        <UnverifiedUsers />
      </Tab>
      <Tab key="rejected-users" title="Rejected users">
        <RejectedUsers />
      </Tab>
      <Tab key="creators" title="Creators">
        <Creators />
      </Tab>
    </Tabs>
  );
};
