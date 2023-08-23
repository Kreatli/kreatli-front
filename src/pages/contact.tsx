import Head from 'next/head';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <h2 className="text-2xl font-semibold">Contact</h2>
      </div>
    </>
  );
};

export default Contact;
