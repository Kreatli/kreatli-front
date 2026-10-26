import { Button, Card, CardBody, Chip, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { SignInModal } from '../../auth/SignInModal';
import { SignUpCreatorForm } from '../../auth/SignUpCreator/SignUpCreatorForm';
import { SignUpCreatorSSO } from '../../auth/SignUpCreator/SignUpCreatorSSO';
import { TextLinear } from '../../home/TextLinear';

const steps = [
  'Create your free creator account below',
  'Confirm your email from the link we send you',
  'Sign in and you land right back here to post your job',
];

/**
 * Shown on /jobs/create to signed-out visitors (they arrive from "Post a clipping job" buttons across
 * the site). Lets them sign up or sign in in place instead of being bounced to the homepage.
 */
export const JobPostSignUpGate = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  // The activation page sends people back here with ?signin=1 so they can sign in straight away.
  React.useEffect(() => {
    if (router.isReady && router.query.signin) {
      setIsSignInOpen(true);
    }
  }, [router.isReady, router.query.signin]);

  return (
    <div className="container max-w-screen-sm mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          For creators
        </Chip>
        <h1 className="text-4xl font-semibold mt-4 mb-3">
          Post your <TextLinear>clipping job</TextLinear>
        </h1>
        <p className="text-lg text-foreground-500">
          Create a free creator account to post your job and hear from vetted clippers. It&apos;s free to post.
        </p>
      </div>

      <Card shadow="sm">
        <CardBody className="p-6 gap-6">
          {isEmailSent ? (
            <div className="text-center flex flex-col gap-3 py-4">
              <h2 className="text-2xl font-semibold">Check your inbox</h2>
              <p className="text-foreground-500">
                We sent you a link to confirm your email. Open it in this browser, sign in, and you&apos;ll come
                straight back here to post your job.
              </p>
              <div>
                <Button color="secondary" variant="flat" onClick={() => setIsSignInOpen(true)}>
                  I&apos;ve confirmed my email, sign in
                </Button>
              </div>
            </div>
          ) : (
            <>
              <ol className="flex flex-col gap-1 text-sm text-foreground-500 list-decimal list-inside">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <SignUpCreatorForm onSuccess={() => setIsEmailSent(true)} />
              <div className="flex items-center text-foreground-500 after:flex-1 after:content-[''] after:p-[0.5px] after:bg-foreground-200 after:m-2 before:flex-1 before:content-[''] before:p-[0.5px] before:bg-foreground-200 before:m-2">
                {t('common:or')}
              </div>
              <SignUpCreatorSSO onSuccess={() => undefined} />
            </>
          )}
        </CardBody>
      </Card>

      <p className="text-center mt-6 text-foreground-500">
        Already have an account?{' '}
        <Link as="button" type="button" color="secondary" onClick={() => setIsSignInOpen(true)}>
          Sign in
        </Link>
      </p>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </div>
  );
};
