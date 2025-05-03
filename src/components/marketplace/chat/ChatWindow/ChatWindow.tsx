import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import React from 'react';

import { AddMessage } from '../AddMessage';
import { ChatHeader } from '../ChatHeader';
import { ChatMessages } from '../ChatMessages';

export const ChatWindow = () => {
  return (
    <Card className="flex-1 max-md:shadow-none">
      <CardHeader className="border-b-1 border-default-200">
        <ChatHeader />
      </CardHeader>
      <CardBody className="p-0">
        <div className="absolute inset-0 p-4 flex flex-col-reverse overflow-auto" style={{ overflowAnchor: 'none' }}>
          <ChatMessages />
        </div>
      </CardBody>
      <CardFooter>
        <AddMessage />
      </CardFooter>
    </Card>
  );
};
