import PartnersWithUsImg from '@/assets/PartnersImage/PartnersWithUs/partners-with-us.jpg';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import DynamicMenu from '@/components/Header/DynamicMenu';
import HeaderClient from '@/components/Header/HeaderClient';

export const metadata: Metadata = {
  title:
    'Partner With Us - GOODS2LOAD | Expand Your Reach and Grow Your Business',
  description:
    'Partner with GOODS2LOAD to connect with millions of businesses seeking efficient shipping solutions. Join us as a trusted copilot and grow your business while enhancing logistics services across the globe.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}/partners-with-us`,
  },
};

const PartnersWithUs = () => {
  return (
    <>
      <HeaderClient />
      <DynamicMenu />
      <div className="md:flex gap-2 justify-between">
        <div className="px-4 xl:pt-[169px] pt-10 md:pt-20 lg:w-[592px] xl:ml-[72px] md:ml-10 2xl:mx-auto md:pb-4 pb-12 text-center md:text-left ml-0">
          <h3 className="text-[34px]/[37.6px] xl:text-[48px]/[57.6px] font-light text-black">
            Reach <i className="font-normal">millions of business searching</i>{' '}
            on how to ship their goods and{' '}
            <i className="font-normal bg-[#FEF1DF]">increase their business</i>
          </h3>
          <p className="mt-6 text-[18px]/[26px]">
            Be the copilot you would aspire to have beside in your journey.
          </p>
          <Link
            href="/registration?provider"
            className="bg-primaryOrange w-full max-w-[201px] mx-auto rounded-[16px] text-white text-center pt-[10px] pb-[10px] mt-8 hover:opacity-95 cursor-pointer inline-block"
          >
            Partners with us
          </Link>
        </div>

        <Image
          width={720}
          height={750}
          src={PartnersWithUsImg}
          alt="Partners with us"
          className="w-full md:w-[720px]"
        />
      </div>
      <Footer />
    </>
  );
};
export default PartnersWithUs;
