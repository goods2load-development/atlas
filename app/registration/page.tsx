import { Suspense } from 'react';

import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import Registration from '@/components/Registration/Registration';

export const metadata = {
  title: 'Registration',
  robots: {
    index: false,
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
