import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ChatLayout } from '../../components/chat/ChatLayout';
import { ChatWindow } from '../../components/chat/ChatWindow';

const Chat = () => {
  return (
    <>
      <Head>
        <title>Messages | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <ChatWindow />
    </>
  );
};

Chat.getLayout = (page: any) => <ChatLayout>{page}</ChatLayout>;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Chat;
