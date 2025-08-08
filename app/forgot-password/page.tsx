import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import LoginWrapper from '@/components/LoginWrapper';

const ForgotPasswordLazy = dynamic(
  () => import('@/components/ForgotPassword/ForgotPassword'),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Change your password here | GOODS2LOAD',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/forgot-password`,
  },
};

export default function Login() {
  return (
    <LoginWrapper>
      <ForgotPasswordLazy />
    </LoginWrapper>
  );
}
