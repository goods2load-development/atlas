import { Suspense } from 'react';

import LoginWrapper from '@/components/LoginWrapper';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <LoginWrapper>
        <ResetPassword />
      </LoginWrapper>
    </Suspense>
  );
}
