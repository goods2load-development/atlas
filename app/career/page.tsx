import CareerForm from '../_components/Career/CareerForm/CareerForm';
import { JoinOurTeam } from '../_components/Career/JoinOurTeam/JoinOurTeam';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

export const metadata: Metadata = {
  title: 'Join Our Team - GOODS2LOAD | Careers in Logistics Innovation',
  description:
    'Ready to challenge the logistics industry? Join the GOODS2LOAD team and make an impact with smart working opportunities in sales, customer care, and logistics partnerships. Apply today to be part of our innovative journey.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/career`,
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
