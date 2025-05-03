import { Card, CardBody } from '@heroui/react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ChatLayout } from '../../../components/marketplace/chat/ChatLayout';
import { EmptyState } from '../../../components/marketplace/chat/EmptyState';

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

Chat.getLayout = (page: any) => <ChatLayout>{page}</ChatLayout>;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Chat;
