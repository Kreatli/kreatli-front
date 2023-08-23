import Head from 'next/head';
import React from 'react';

const Messages: React.FC = () => {
  return (
    <>
      <Head>
        <title>Messages | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      </div>
    </>
  );
};

export default Messages;
