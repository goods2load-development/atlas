import { Suspense } from 'react';

import { Metadata } from 'next';

import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LoginWrapper from '@/components/LoginWrapper';
import SignIn from '@/components/SignIn/SignIn';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/sign-in`;

export const metadata: Metadata = {
  title: 'Sign In - GOODS2LOAD | Access Your Account for Logistics Services',
  description:
    'Sign in to GOODS2LOAD to access your account and streamline your logistics management. Log in to manage your shipments, view updates, and more.',
  openGraph: {
    title: 'Sign In - GOODS2LOAD',
    description:
      'Log in to your GOODS2LOAD account to manage your logistics needs. Access all your logistics services and track your shipments easily.',
    url: canonical,
  },
  twitter: {
    title: 'Sign In - GOODS2LOAD',
    description:
      'Log in to GOODS2LOAD to access your account and manage your logistics efficiently.',
  },
  robots: {
    index: false,
  },
  alternates: {
    canonical,
  },
};

export default function Login() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Suspense>
        <LoginWrapper>
          <SignIn />
        </LoginWrapper>
      </Suspense>
    </>
  );
}
