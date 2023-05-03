import Head from 'next/head';
import React from 'react';

import { Hero } from '../components/home/Hero';
import { Layout } from '../layouts/default';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kreali | Home</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
}
