import { Card, CardBody } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { ChatLayout } from '../../components/chat/ChatLayout';
import { EmptyState } from '../../components/chat/EmptyState';

const Chat = () => {
  return (
    <>
      <Head>
        <title>Messages | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Card className="flex-1">
        <CardBody className="p-5">
          <EmptyState
            title="Select a chat to start messaging"
            text="Select an existing conversation or start a new one"
          />
        </CardBody>
      </Card>
    </>
  );
};

Chat.getLayout = (page: any) => (
  <ChatLayout>
    {page}
  </ChatLayout>
);

export default Chat;
