import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import LoginWrapper from '@/components/LoginWrapper';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

const ResetPasswordLazy = dynamic(
  () => import('@/components/ResetPassword/ResetPassword'),
  {
    ssr: false,
  },
);

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <LoginWrapper>
        <ResetPasswordLazy />
      </LoginWrapper>
    </Suspense>
  );
}
