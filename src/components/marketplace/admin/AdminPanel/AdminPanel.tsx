import { Tab, Tabs } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { Creators } from '../Creators';
import { RejectedUsers } from '../RejectedUsers.tsx';
import { RemovedUsers } from '../RemovedUsers';
import { UnverifiedUsers } from '../UnverifiedUsers';

export const AdminPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTab = searchParams.get('tab');

  const handleSelectionChange = (key: React.Key) => {
    router.push({ search: `?tab=${key}` });
  };

  return (
    <Tabs selectedKey={selectedTab ?? 'unverified-users'} onSelectionChange={handleSelectionChange}>
      <Tab key="unverified-users" title="Unverified users">
        <UnverifiedUsers />
      </Tab>
      <Tab key="rejected-users" title="Rejected users">
        <RejectedUsers />
      </Tab>
      <Tab key="creators" title="Creators">
        <Creators />
      </Tab>
      <Tab key="removeUsers" title="Deleted users">
        <RemovedUsers />
      </Tab>
    </Tabs>
  );
};
