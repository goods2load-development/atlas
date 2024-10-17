import { Suspense } from 'react';

import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LoginWrapper from '@/components/LoginWrapper';
import SignIn from '@/components/SignIn/SignIn';

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
