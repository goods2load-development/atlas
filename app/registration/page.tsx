import { Suspense } from 'react';

import { Metadata } from 'next';

import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import Registration from '@/components/Registration/Registration';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/registration`;

export const metadata: Metadata = {
  title:
    'Registration - GOODS2LOAD | Create Your Account to Access Logistics Solutions',
  description:
    'Sign up for GOODS2LOAD to get started with innovative logistics solutions. Create an account to streamline your supply chain and improve efficiency.',
  openGraph: {
    title: 'Registration - GOODS2LOAD',
    description:
      'Start using GOODS2LOAD by creating your account. Experience a better, digital-first approach to logistics.',
    url: canonical,
  },
  twitter: {
    title: 'Registration - GOODS2LOAD',
    description:
      'Register now to access the full range of GOODS2LOAD’s logistics services and features.',
  },
  robots: {
    index: false,
  },
  alternates: {
    canonical,
  },
};

export default function RegistrationPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Suspense>
        <Registration />
      </Suspense>
    </>
  );
}
