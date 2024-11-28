'use client';

import defaultLogo from '@/assets/icons/default-logo-g2l.svg';
import { usePartnersStore } from '@/lib/store';

import React, { useEffect } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

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
          'w-full items-center max-w-[1328px] mx-auto px-4',
          className,
        )}
      >
        <div className="text-black text-center font-light md:text-[40px]/[48px] text-[34px]/[38px] flex mb-8 justify-center lg:justify-start">
          Our
          <div className="font-normal italic bg-[#FEF1DF] rounded-[6px] md:h-[49px] px-[8px] ml-2 flex justify-center items-center">
            partners
          </div>
        </div>
        <div className="flex w-full text-black gap-2 flex-wrap justify-center lg:justify-start">
          {partners &&
            partners.map(({ user, ...partner }, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/partner/${partner.id}`}
                  className="block w-[318px] h-[79px] bg-gray-200 p-2 hover:bg-slate-300 transition-all cursor-pointer relative"
                >
                  <div
                    className="h-full"
                    style={{
                      backgroundImage: `url(${defaultLogo.src})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </Link>
              );
            })}
        </div>
      </section>
    )
  );
};

export default PartnersOurPartners;
