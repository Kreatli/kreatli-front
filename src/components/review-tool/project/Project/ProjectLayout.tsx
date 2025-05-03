import { addToast, Button, Tab, Tabs } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectContextProvider } from '../../../../contexts/review-tool/Project';
import { useProtectedPage } from '../../../../hooks/review-tool/useProtectedPage';
import { useGetProjectId } from '../../../../services/review-tool/hooks';
import { getErrorMessage } from '../../../../utils/review-tool/getErrorMessage';
import { EmptyState } from '../../../various/EmptyState';
import { Header } from '../../layout/Header';
import { ProjectHeader } from './ProjectHeader';
import { ProjectLoader } from './ProjectLoader';

interface Props {
  hideHeader?: boolean;
  actions?: React.ReactNode;
}

export const ProjectLayout = ({ children, hideHeader = false, actions }: React.PropsWithChildren<Props>) => {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const {
    data: project,
    isPending,
    isError,
    error,
  } = useGetProjectId(router.query.id as string, {
    enabled: !!router.query.id,
    refetchInterval: 10000,
  });

  React.useEffect(() => {
    if (isError && 'status' in error && error.status !== 403) {
      addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
    }
  }, [isError, error, router]);

  if (!isSignedIn) {
    return;
  }

  if (isError && 'status' in error && error.status === 403) {
    return (
      <>
        <Header />
        <EmptyState title="You do not have permission to view this project">
          <Button as={NextLink} href="/" className="text-content1 bg-foreground mt-2">
            Browse my projects
          </Button>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 pt-2 border-t border-foreground-200">
        {isPending || isError ? (
          <ProjectLoader />
        ) : (
          <ProjectContextProvider selectedProject={project}>
            {hideHeader ? (
              children
            ) : (
              <div className="flex flex-col gap-4">
                <ProjectHeader project={project} />
                <div className="flex gap-6">
                  <Tabs selectedKey={router.pathname.split('/')[3]}>
                    <Tab as={NextLink} href={`/project/${project.id}/assets`} title="Media" key="assets" />
                    <Tab as={NextLink} href={`/project/${project.id}/chat`} title="Chat" key="chat" />
                    <Tab as={NextLink} href={`/project/${project.id}/activity`} title="Activity" key="activity" />
                  </Tabs>
                  {actions}
                </div>
                <div>{children}</div>
              </div>
            )}
          </ProjectContextProvider>
        )}
      </div>
    </>
  );
};
