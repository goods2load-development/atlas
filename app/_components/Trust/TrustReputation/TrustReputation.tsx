import { sliderData } from './sliderData';
import google from '@/assets/icons/google.svg';
import stars from '@/assets/icons/stars.svg';
import trustpilot from '@/assets/icons/trustpilot.svg';
import { usePartnersStore } from '@/lib/store';

import { useEffect } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

import { CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const TrustReputation = () => {
  const { partners, getPartnersApproved } = usePartnersStore();

  useEffect(() => {
    getPartnersApproved();
  }, []);

  return (
    <section className="w-full md:px-0 px-4">
      <h1 className="text-black text-center font-light sm:text-[40px]/[48px] text-[34px]/[38px] pb-8">
        Our{' '}
        <i className="font-normal bg-[#FEF1DF] rounded-[6px] px-[8px]">
          reputation
        </i>{' '}
        speaks for itself
      </h1>

      <div className="w-full pt-8 pb-5">
        <Carousel
          className="w-full"
          opts={{ loop: true, duration: 3000 }}
          plugins={[Autoplay({ delay: 0 })]}
        >
          <CarouselContent className="-ml-1 w-full max-w-full h-[100px]">
            {partners.map((partner, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/3 md:basis-1/2 lg:basis-1/4 grid items-center"
                >
                  <div className="p-1">
                    <CardContent className="flex items-center justify-center sm:p-6 h-10">
                      <div>
                        {partner.hasPage && !!partner.slug ? (
                          <Link className="" href={`/partner/${partner.slug}`}>
                            {partner.user.companyPhoto.endsWith('.svg') ? (
                              <ReactSVG
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.user.companyPhoto}`}
                                beforeInjection={(svg) => {
                                  svg.setAttribute(
                                    'style',
                                    'width: 100px; height: 100px;',
                                  );
                                }}
                              />
                            ) : (
                              <Image
                                width={100}
                                height={100}
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.user.companyPhoto}`}
                                alt="Logo"
                                className="object-contain"
                              />
                            )}
                          </Link>
                        ) : partner.user.companyPhoto.endsWith('.svg') ? (
                          <ReactSVG
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.user.companyPhoto}`}
                            beforeInjection={(svg) => {
                              svg.setAttribute(
                                'style',
                                'width: 100px; height: 100px;',
                              );
                            }}
                          />
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.user.companyPhoto}`}
                            alt="Logo"
                            className="object-contain"
                          />
                        )}
                      </div>
                    </CardContent>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="text-black text-[17px]/[23px] flex flex-row gap-[10px] font-medium py-8 justify-center">
        <div>1,000+</div>
        <Image className="relative top-[-3px]" src={stars} alt={'stars'} />
        <div>reviews</div>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <Image
          className="relative top-[-3px]"
          src={trustpilot}
          alt={'trustpilot'}
        />
        <Image className="relative top-[-3px]" src={google} alt={'google'} />
      </div>
    </section>
  );
};

export default TrustReputation;
