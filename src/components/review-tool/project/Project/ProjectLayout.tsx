import { Tab, Tabs } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectContextProvider } from '../../../../contexts/review-tool/Project';
import { useGetProjectId } from '../../../../services/review-tool/hooks';
import { Header } from '../../layout/Header';
import { ProjectHeader } from './ProjectHeader';

interface Props {
  hideHeader?: boolean;
}

export const ProjectLayout = ({ children, hideHeader = false }: React.PropsWithChildren<Props>) => {
  const router = useRouter();

  const {
    data: project,
    isPending,
    isError,
  } = useGetProjectId(router.query.id as string, {
    enabled: !!router.query.id,
  });

  return (
    <>
      <Header />
      <div className="p-6 border-t border-foreground-200">
        {isPending || isError ? (
          'Loading'
        ) : (
          <ProjectContextProvider selectedProject={project}>
            {hideHeader ? (
              children
            ) : (
              <div className="flex flex-col gap-4">
                <ProjectHeader project={project} />
                <Tabs selectedKey={router.pathname.split('/')[3]}>
                  <Tab as={NextLink} href={`/project/${project.id}/assets`} title="Media" key="assets" />
                  <Tab as={NextLink} href={`/project/${project.id}/chat`} title="Chat" key="chat" />
                  <Tab as={NextLink} href={`/project/${project.id}/activity`} title="Activity" key="activity" />
                </Tabs>
                <div>{children}</div>
              </div>
            )}
          </ProjectContextProvider>
        )}
      </div>
    </>
  );
};
