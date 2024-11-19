import { privacyPolicyPageData } from './data';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/privacy-policy`;

export const metadata: Metadata = {
  title:
    'Privacy Policy - GOODS2LOAD | Committed to Data Security and Transparency',
  description:
    'Learn how GOODS2LOAD handles your data responsibly. Explore our privacy practices, data security measures, and transparency commitments.',
  openGraph: {
    title: 'Privacy Policy - GOODS2LOAD',
    description:
      'Discover how we ensure the confidentiality, integrity, and security of your data at GOODS2LOAD. Your trust is our priority.',
    url: canonical,
  },
  twitter: {
    title: 'Privacy Policy - GOODS2LOAD',
    description:
      'Read about GOODS2LOAD’s privacy measures to protect your information and maintain transparency in data handling.',
  },
  alternates: {
    canonical,
  },
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
