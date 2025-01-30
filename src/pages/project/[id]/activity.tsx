import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../components/review-tool/project/Project';
import { ProjectActivity } from '../../../components/review-tool/project/ProjectActivity';
import { useProtectedPage } from '../../../hooks/review-tool/useProtectedPage';
import { useGetProjectIdLogs } from '../../../services/review-tool/hooks';

export default function ProjectActivityPage() {
  const router = useRouter();
  const { isSignedIn } = useProtectedPage();

  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isPending, isError } = useGetProjectIdLogs(router.query.id as string, {
    limit: 20,
    offset: (currentPage - 1) * 20,
  });

  if (!isSignedIn) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      {isPending || isError ? (
        <div>Loading...</div>
      ) : (
        <ProjectActivity
          logs={data.logs}
          logsCount={data.logsCount}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

ProjectActivityPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
