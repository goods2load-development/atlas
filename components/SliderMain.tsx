'use client';

import useDotButton from '@/app/hooks/useDotButton';
import Slider1 from '@/assets/images/home-slide1.png';
import Slider2 from '@/assets/images/home-slide2.png';
import Slider3 from '@/assets/images/home-slide3.png';

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
      className="embla overflow-hidden relative min-h-[412px]"
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
            className="w-full object-cover min-h-96"
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
            className="w-full object-cover min-h-96"
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
            className="w-full object-cover min-h-96"
            alt={'slide3-bg'}
          />
        </div>
      </div>
      <Image
        src={Slider1}
        width={1440}
        height={415}
        alt="slide"
        className="w-full relative z-0"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-[100%] flex flex-wrap content-center">
        <div className="w-full px-[16px] max-w-[1328px] mx-auto">
          <div className="lg:w-1/2">
            <div className="italic text-[30px]/[34px] sm:text-[40px]/[48px]">
              Expand Your Reach:
            </div>
            <div className="text-[30px]/[34px] sm:text-[40px]/[48px] mb-[20px]">
              <span className="font-light">Partner with</span> <i>GOODS2LOAD</i>
            </div>
            <div className="max-w-[332px] text-[16px]/[24px] mb-2">
              Tap into millions of businesses seeking better shipping solutions
              to grow. Join us to streamline your delivery process and boost
              your business effortlessly.
            </div>
            <Link
              className="text-orangePrimary font-medium"
              href="/partners"
              aria-label="Learn more about partnering with GOODS2LOAD"
            >
              Learn more
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
