import { sliderData } from './sliderData';
import google from '@/assets/icons/google.svg';
import stars from '@/assets/icons/stars.svg';
import trustpilot from '@/assets/icons/trustpilot.svg';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const TrustReputation = () => {
  return (
    <section className="w-full">
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
          <CarouselContent className="-ml-1 w-full max-w-full">
            {sliderData.map((it, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/3 md:basis-1/2 lg:basis-1/4 grid items-center"
              >
                <div className="p-1">
                  <CardContent className="flex items-center justify-center sm:p-6 h-10">
                    <Image
                      src={it.sliderImg}
                      alt={it.alt}
                      className="scale-[1.2]"
                    />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
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
