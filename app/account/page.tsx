import dynamic from 'next/dynamic';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

const AccountLazy = dynamic(() => import('@/components/Account/Account'), {
  ssr: false,
});

export default function AccountPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <AccountLazy />
      <Footer />
    </>
  );
}
