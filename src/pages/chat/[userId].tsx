import { ChatLayout } from 'components/chat/ChatLayout';
import { ChatWindow } from 'components/chat/ChatWindow';
import Head from 'next/head';
import React from 'react';

const Chat = () => {
  return (
    <>
      <Head>
        <title>Messages | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <ChatWindow />
    </>
  );
};

Chat.getLayout = (page: any) => (
  <ChatLayout>
    {page}
  </ChatLayout>
);

export default Chat;
