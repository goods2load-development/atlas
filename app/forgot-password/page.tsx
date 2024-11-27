import { Metadata } from 'next';

import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import LoginWrapper from '@/components/LoginWrapper';

export const metadata: Metadata = {
  title: 'Forgot password',
};

export default function Login() {
  return (
    <LoginWrapper>
      <ForgotPassword />
    </LoginWrapper>
  );
}
