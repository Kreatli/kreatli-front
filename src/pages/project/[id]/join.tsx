import { Button } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { SignInForm } from '../../../components/review-tool/auth/SignInForm';
import { StartPageLayout } from '../../../components/review-tool/layout/StartPageLayout';
import { useReviewToolLoader } from '../../../hooks/review-tool/useReviewToolLoader';
import { useNotifications } from '../../../hooks/useNotifications';
import { useGetProject, useGetUser, usePutProjectIdMember } from '../../../services/review-tool/hooks';
import { getErrorMessage } from '../../../utils/review-tool/getErrorMessage';
import { getHasToken } from '../../../utils/token';

export default function JoinProject() {
  const hasUserToken = getHasToken();
  const router = useRouter();
  const token = router.query.token as string | undefined;

  const { data: user } = useGetUser({
    enabled: hasUserToken,
    refetchOnMount: false,
  });

  const isSignedIn = !!user;

  const setIsLoading = useReviewToolLoader((state) => state.setIsLoading);
  const { pushNotification } = useNotifications();
  const { data } = useGetProject({ enabled: !!token }, { headers: { Authorization: token } });
  const { mutate, isPending: isJoining } = usePutProjectIdMember();

  React.useEffect(() => {
    if (data && (user || !hasUserToken)) {
      setIsLoading(false);
    }
  }, [data, hasUserToken, setIsLoading, user]);

  React.useEffect(() => {
    if (isSignedIn && data && user?.email !== data?.email) {
      router.replace('/');
    }
  }, [router, user, isSignedIn, data]);

  const handleSignInSuccess = () => {
    router.reload();
  };

  const joinProject = () => {
    if (!data || !token) {
      return;
    }

    mutate(
      { id: data.projectId, requestBody: { token } },
      {
        onSuccess: () => {
          router.push(`/project/${data.projectId}`);
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <StartPageLayout
        title={`You were invited to join "${data?.projectName}" project`}
        backgroundUrl={data?.projectCover?.url}
        backgroundType="light"
      >
        {isSignedIn ? (
          <div className="flex flex-col gap-4">
            <p className="mb-4 text-foreground-500">To join the project click the button below.</p>
            <Button className="text-content1 bg-foreground" isLoading={isJoining} onClick={joinProject}>
              Join project
            </Button>
            <Button as={NextLink} href="/" variant="light">
              Back to my projects
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-foreground-500">Please log in to join the project.</p>
            <SignInForm email={data?.email} showSignUpLink={false} onSuccess={handleSignInSuccess} />
          </div>
        )}
      </StartPageLayout>
    </>
  );
}
