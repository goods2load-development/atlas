import { termsOfServicePageData } from './data';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';
import LegacyPage from '@/components/Legacy/LegacyPage';

const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/terms-of-service`;

export const metadata: Metadata = {
  title:
    'Terms of Service - GOODS2LOAD | Understanding Your Rights and Obligations',
  description:
    'Read the detailed Terms of Service for GOODS2LOAD. Learn about your rights, obligations, and our commitment to providing exceptional service.',
  openGraph: {
    title: 'Terms of Service - GOODS2LOAD',
    description:
      'Understand the terms and conditions for using GOODS2LOAD services. A guide to your rights and our responsibilities.',
    url: canonical,
  },
  twitter: {
    title: 'Terms of Service - GOODS2LOAD',
    description:
      'Get informed about the rules and agreements governing GOODS2LOAD’s services and operations.',
  },
  alternates: {
    canonical,
  },
};

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
