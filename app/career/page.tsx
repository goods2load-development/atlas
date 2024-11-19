import CareerForm from '../_components/Career/CareerForm/CareerForm';
import { JoinOurTeam } from '../_components/Career/JoinOurTeam/JoinOurTeam';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

const title = 'Join Our Team - GOODS2LOAD | Careers in Logistics Innovation';
const description =
  'Ready to challenge the logistics industry? Join the GOODS2LOAD team and make an impact with smart working opportunities in sales, customer care, and logistics partnerships. Apply';
const canonical = `${process.env.NEXT_PUBLIC_CLIENT_URL}/career`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
  },
};

const Career = () => {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] sm:py-[104px] px-5 m-auto">
        <JoinOurTeam />
        <CareerForm />
      </section>
      <Footer />
    </>
  );
};

export default Career;
