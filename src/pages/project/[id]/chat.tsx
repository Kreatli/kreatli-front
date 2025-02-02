import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../components/review-tool/project/Project';

export default function ProjectChat() {
  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      Chat
    </>
  );
}

ProjectChat.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
