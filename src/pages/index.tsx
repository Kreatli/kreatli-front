import Head from 'next/head';
import React from 'react';

import { Hero } from '../components/home/Hero';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kreatli | Home</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Hero />
    </>
  );
}
