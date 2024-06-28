import React from "react";
import Image from "next/image";
import menWithBox from "@/assets/PartnersImage/PartnersStartingFrom/menWithBox.png";

const PartnersStartingFrom: React.FC = () => {
  return (
    <section className="flex w-full flex-col sm:flex-row gap-4 sm:gap-[56px] sm:pt-[104px]  px-5 sm:px-[72px] items-center">
      <div className="sm:w-1/2 order-2 sm:oreder-1">
        <Image
          className="w-full"
          alt="menWithBox"
          src={menWithBox.src}
          width={menWithBox.width}
          height={menWithBox.height}
        />
      </div>
      <div className="sm:w-1/2 order-1 sm:order-2">
        <div className="text-black w-max-[620px] sm:leading-[57px] font-light mt-8 sm:mt-0  mb-[30px] sm:text-[40px]/[48px] text-[34px]/[38px] text-center sm:text-left">
          <span className="w-max-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] items-center">
            Starting from 0
          </span>
          never been easy but we will never forget how it feels
        </div>
        <p className="sm:text-[18px] text-black w-full max-w-[650px] text-center sm:text-left">
          Consistency, coupled with the right strategies, paves the way for
          significant achievements. Building and nurturing relationships as we
          grow ensures lasting bonds that withstand the test of time.
        </p>
      </div>
    </section>
  );
};
export default PartnersStartingFrom;
