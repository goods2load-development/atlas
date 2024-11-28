import menWithBox from '@/assets/images/menWithBox.png';

import Image from 'next/image';

const PartnersStartingFrom: React.FC = () => {
  return (
    <section className="flex w-full flex-col md:flex-row gap-8 sm:gap-[56px] sm:pt-[104px] items-center px-[16px] max-w-[1328px] mx-auto">
      <div className="md:w-1/2 order-2 md:order-1">
        <Image
          className="w-full"
          alt="menWithBox"
          src={menWithBox.src}
          width={menWithBox.width}
          height={menWithBox.height}
        />
      </div>
      <div className="md:w-1/2 order-1 md:order-2">
        <h2 className="text-black w-max-[620px] md:leading-[57px] font-light mt-8 sm:mt-0 mb-4 md:mb-[30px] md:text-[40px]/[48px] text-[34px]/[38px] text-center sm:text-left">
          <span className="w-max-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] items-center">
            Starting from 0
          </span>
          never been easy but we will never forget how it feels
        </h2>
        <p className="md:text-[18px] text-black w-full max-w-[650px] text-center sm:text-left">
          Consistency, coupled with the right strategies, paves the way for
          significant achievements. Building and nurturing relationships as we
          grow ensures lasting bonds that withstand the test of time.
        </p>
      </div>
    </section>
  );
};
export default PartnersStartingFrom;
