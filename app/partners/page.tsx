import CareerForm from '../_components/Career/CareerForm/CareerForm';
import JoinOurTeam from '../_components/Career/JoinOurTeam/JoinOurTeam';
import PartnersAmplify from '../_components/Partners/PartnersAmplify/PartnersAmplify';
import PartnersAudience from '../_components/Partners/PartnersAudience/PartnerAudience';
import PartnersBoostingTravel from '../_components/Partners/PartnersBoostingTravel/PartnersBoostingTravel';
import PartnersOurPartners from '../_components/Partners/PartnersOurPartners/PartnersOurPartners';
import PartnersStartingFrom from '../_components/Partners/PartnersStartingFrom/PartnersStartingFrom';
import PartnersVisibility from '../_components/Partners/PartnersVisibility/PartnersVisibility';

import { Metadata } from 'next';

import BigLayout from '@/components/BigLayout';
import Footer from '@/components/Footer';

const title =
  'Partners - GOODS2LOAD | Join Us in Revolutionizing the Logistics Industry';
const description =
  'Partner with GOODS2LOAD to drive innovation, reduce costs, and enhance efficiency in the logistics industry. Explore opportunities to collaborate with us and become part of our growing team dedicated to reshaping the future of logistics.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/partners`,
  },
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/partners`,
  },
};

const Partners = () => {
  return (
    <>
      <BigLayout
        introChildren={
          <div className="py-[60px] font-light px-4">
            <h1 className="max-w-[1048px] text-[30px] md:text-[48px]/[58px] mb-4 text-center">
              Engage with businesses throughout their journey of envisioning,
              strategizing,{' '}
              <i className="font-normal">and arranging bookings</i>
            </h1>
            <p>
              We help reduce costs, increase efficiency and offer improved
              customer service.
            </p>
          </div>
        }
      >
        <div className="w-full flex flex-col justify-center items-center pb-8">
          <PartnersStartingFrom />
          <section className="max-w-[1440px] w-full justify-center items-center gap-[40px] py-[40px] md:py-[104px] px-5 m-auto">
            <JoinOurTeam />
            <CareerForm />
          </section>
          <PartnersAudience />
          <PartnersAmplify />
          <PartnersVisibility />
          <PartnersBoostingTravel />
          <PartnersOurPartners />
        </div>
      </BigLayout>
      <Footer />
    </>
  );
};
export default Partners;
