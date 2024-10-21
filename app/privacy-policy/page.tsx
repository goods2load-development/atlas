import { privacyPolicyPageData } from './data';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

export const metadata: Metadata = {
  title: 'Privacy policy',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <LegacyPage {...privacyPolicyPageData} />
      <Footer />
    </>
  );
}
