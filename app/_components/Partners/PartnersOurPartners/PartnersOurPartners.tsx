'use client';

import { usePartnersStore } from '@/lib/store';

import React, { useEffect } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

interface PartnersOurPartnersProps {
  className?: string;
}

const PartnersOurPartners: React.FC<PartnersOurPartnersProps> = ({
  className,
}) => {
  const { partners, getPartnersApproved } = usePartnersStore();

  useEffect(() => {
    getPartnersApproved();
  }, []);

  return (
    partners &&
    !!partners.length && (
      <section
        id="our-partners"
        className={clsx(
          'w-full items-center max-w-[1328px] mx-auto px-4 mb-20',
          className,
        )}
      >
        <h2
          className="text-black text-[30px] sm:text-[40px] mb-6 text-center font-normal

 "
        >
          Find Top
          <i className="bg-allTittleColor px-2 mx-1 rounded-md font-medium inline-block">
            Logistics & Cargo
          </i>
          Providers Instantly
        </h2>

        <p className="max-w-full text-center md:text-left text-lg mb-4 mx-auto md:mx-0">
          From full container load and less than container load services, find
          providers who match your needs and meet your standards, whether you
          are shipping across the GCC or globally. Each verified partner profile
          includes:
        </p>

        <ul className="flex flex-col gap-1 ml-2 md:ml-6 mb-4">
          <li className="text-black text-[16px] sm:text-[18px] mb-2 items-center ">
            ● Services offered (import, export, customs clearance, warehousing,
            last-mile delivery, etc.)
          </li>
          <li className="text-black text-[16px] sm:text-[18px] mb-2 items-center ">
            ● Global and regional locations served
          </li>
          <li className="text-black text-[16px] sm:text-[18px] mb-2 items-center ">
            ● Certifications (ISO, AEO, Associations, sustainability
            credentials)
          </li>
          <li className="text-black text-[16px] sm:text-[18px] mb-2 items-center ">
            ● Google reviews for transparency
          </li>
          <li className="text-black text-[16px] sm:text-[18px] mb-2 items-center ">
            ● Direct contact options — no middlemen
          </li>
        </ul>

        <div className="flex w-full text-black gap-2 flex-wrap justify-center lg:justify-start">
          {partners &&
            partners
              .sort((a, b) => {
                const companyNameA = a.user.companyName?.toLowerCase() || '';
                const companyNameB = b.user.companyName?.toLowerCase() || '';
                return companyNameA.localeCompare(companyNameB);
              })
              .map(({ user, ...partner }, idx) => {
                if (!user.companyPhoto) {
                  return null;
                }
                return (
                  <Link
                    key={idx}
                    href={`/partner/${partner.slug}`}
                    className="block w-[318px] h-[79px] bg-gray-200 p-2 hover:bg-slate-300 transition-all cursor-pointer relative overflow-hidden"
                  >
                    {user.companyPhoto.endsWith('.svg') ? (
                      <ReactSVG
                        className="flex items-center justify-center h-full"
                        src={
                          user.companyPhoto.startsWith('data:')
                            ? user.companyPhoto
                            : `${process.env.NEXT_PUBLIC_BASE_URL}${user.companyPhoto}`
                        }
                        beforeInjection={(svg: any) => {
                          svg.setAttribute(
                            'style',
                            'width: 225px; height: 63px;',
                          );
                        }}
                      />
                    ) : (
                      <div
                        className="h-full"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${user.companyPhoto}`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
        </div>
      </section>
    )
  );
};

export default PartnersOurPartners;
