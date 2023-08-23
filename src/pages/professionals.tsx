import Head from 'next/head';
import React from 'react';

import { ProfessionalListing } from '../components/professionals/ProfessionalListing';

const Professionals = () => {
  return (
    <>
      <Head>
        <title>Professionals | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6">
        <ProfessionalListing />
      </div>
    </>
  );
};

export default Professionals;
