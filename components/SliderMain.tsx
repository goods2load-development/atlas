'use client';

import useDotButton from '@/app/hooks/useDotButton';
import Slider1 from '@/assets/images/home-slide1.png';
import Slider2 from '@/assets/images/home-slide2.png';
import Slider3 from '@/assets/images/home-slide3.png';

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

const DotButton = (props: any) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export default function SliderMain() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section
      className="embla overflow-hidden relative min-h-[580px] md:min-h-[460px] h-full"
      ref={emblaRef}
    >
      <div className="embla__container flex">
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 0 && 'is-selected'}`}
        >
          <Image
            src={Slider1}
            width={1440}
            height={415}
            className="w-full object-cover md:min-h-96 min-h-[580px] h-full"
            alt={'slide10-bg'}
          />
        </div>
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 1 && 'is-selected'}`}
        >
          <Image
            src={Slider2}
            width={1440}
            height={415}
            className="w-full object-cover md:min-h-96 h-full min-h-[580px]"
            alt={'slide2-bg'}
          />
        </div>
        <div
          className={`embla__slide flex-[0_0_100%] ${selectedIndex === 2 && 'is-selected'}`}
        >
          <Image
            src={Slider3}
            width={1440}
            height={415}
            className="w-full object-cover md:min-h-96 h-full min-h-[580px]"
            alt={'slide3-bg'}
          />
        </div>
      </div>

      <Image
        src={Slider1}
        width={1440}
        height={415}
        alt="slide"
        className="w-full relative z-0 md:min-h-96 h-full min-h-[614px]"
      />

      <div className="absolute top-0 left-0 z-10 w-full h-[100%] flex flex-wrap content-center">
        <div className="w-full px-[16px] max-w-[1328px] mx-auto">
          <div className="lg:w-1/2 w-[85%]">
            <div className="italic text-[30px]/[34px] sm:text-[40px]/[48px]">
              Stop Chasing Leads.
            </div>
            <div className="text-[30px]/[34px] sm:text-[40px]/[48px] mb-[20px]">
              Let Them Come to You.
            </div>
            <p className="md:max-w-[664px] max-w-full text-[16px]/[24px] mb-2">
              In the UAE alone, over 10,000 freight forwarders compete for
              attention — most still relying on door-to-door sales and cold
              calls. Goods2Load helps you go digital, build credibility, and win
              more deals.
            </p>
            <ul className="flex flex-col gap-1 ml-2 md:ml-6 mb-4 text-[16px]/[24px]">
              <li className="text-black">
                ✔️ Verified leads delivered directly to your WhatsApp, email, or
                contact forms
              </li>
              <li className="text-black">
                ✔️ A custom digital business page showcasing your services,
                certifications, and reviews
              </li>
              <li className="text-black">
                ✔️ A private dashboard to track leads, monitor market trends,
                and measure performance
              </li>
              <li className="text-black">
                ✔️ No bidding wars, no commission fees — you keep 100% of your
                earnings
              </li>
            </ul>

            <Link
              className="text-orangePrimary font-medium underline hover:no-underline"
              href="/registration?provider"
              aria-label="Learn more about partnering with GOODS2LOAD"
            >
              Join as a Freight Partner
            </Link>
          </div>
        </div>
      </div>
      <div className="embla__controls absolute bottom-[60px] left-[50%] translate-x-[-50%] z-10 flex flex-col">
        <div className="embla__dots self-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot w-[12px] h-[12px] w rounded-full mx-[6px] border border-orangePrimary'.concat(
                index === selectedIndex
                  ? ' bg-orangePrimary'
                  : ' bg-transparent',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
