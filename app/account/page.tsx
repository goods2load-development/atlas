import Account from '@/components/Account/Account';
import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

export default function AccountPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <Account />
      <Footer />
    </>
  );
}
