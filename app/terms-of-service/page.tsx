import { termsOfServicePageData } from './data';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

export default function TermsOfServicePage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...termsOfServicePageData} />
      <Footer />
    </>
  );
}
