import { Button } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

export const SignUpThankYouMessage = () => {
  return (
    <div>
      <p className="text-xl font-semibold mb-2">Thank you for signing up!</p>
      <p>We have sent you an email with a confirmation link. Please click on the link to verify your email address.</p>
      <div className="flex flex-col gap-4 mt-8">
        <Button as={NextLink} href="/sign-in" className="bg-foreground text-content1">
          Sign in
        </Button>
        <Button as={NextLink} href="/" variant="light">
          Home
        </Button>
      </div>
    </div>
  );
};
