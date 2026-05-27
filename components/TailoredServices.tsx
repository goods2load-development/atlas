'use client';

import { ReferralItemType } from './Dashboard/ReferralMain/types';
import useBreakpoint from '@/app/hooks/useBreakpoint';
import useDotButton from '@/app/hooks/useDotButton';
import { useReferralsStore } from '@/lib/store';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

export default function TailoredServices({
  className = '',
  isTitle = true,
  isDots = true,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 'auto' },
    [Autoplay({ playOnInit: true, delay: 5000 }), Fade()],
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { getAllReferrals, referrals: referralsData } = useReferralsStore(
    (state: any) => state,
  );
  const { referals: referrals = [], slicePerReferals = null } =
    referralsData || {};

  const { isBelowSm } = useBreakpoint('sm');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getAllReferrals();
  }, []);

  if (!mounted) return null;

  return (
    !!referrals.length && (
      <section
        className={clsx(
          'px-4 w-full mx-auto bg-none md:bg-bgReferrals 2xl:[background-position:0_30px] lg:[background-position:0_140px] md:[background-position:0_180px] bg-no-repeat bg-contain 2xl:bg-cover',
          className,
        )}
      >
        <div className="max-w-[1328px] mx-auto">
          {isTitle && (
            <>
              <h2 className="text-black text-[30px] sm:text-[40px] mb-8 text-center ">
                <i className="bg-allTittleColor px-2 rounded-md">
                  Global Reach with
                </i>{' '}
                <span className="font-light">Local Expertise</span>
              </h2>
              <strong className="block font-medium text-xl mb-4 text-center md:text-left">
                Empower Your Business with Tailored Services.
              </strong>
              <p className="max-w-full md:max-w-[75%] text-center md:text-left text-lg mb-8 md:mb-10 mx-auto md:mx-0">
                Discover value-added logistics services designed to optimize
                your business in Dubai, UAE, GCC, and global trade routes — from
                freight forwarding support to smart operational solutions, we
                empower your growth with local expertise and global reach.
              </p>
            </>
          )}

          <div className="min-h-[360px] mx-auto overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {referrals.map((referral: ReferralItemType, index: number) => (
                <div
                  className={clsx(
                    'min-h-[360px] min-w-0 md:pr-10 flex-[0_0_100%]',
                    {
                      'md:flex-[0_0_33.3333%]': slicePerReferals === 3,
                      'md:flex-[0_0_50%]': slicePerReferals === 2,
                    },
                  )}
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${slicePerReferals === 3 || isBelowSm ? referral.smallBanner : referral.bigBanner})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="h-full rounded-2xl overflow-hidden relative"
                  >
                    <Link
                      target="_blank"
                      className="absolute inset-0"
                      href={referral.url}
                    />
                  </div>
                </div>
              ))}
            </div>
            {isDots && (
              <div className="flex flex-col mt-8">
                <div className="embla__dots self-center">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={'embla__dot w-[12px] h-[12px] rounded-full mx-[6px] border border-orangePrimary'.concat(
                        index === selectedIndex
                          ? ' bg-orangePrimary'
                          : ' bg-transparent',
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}
