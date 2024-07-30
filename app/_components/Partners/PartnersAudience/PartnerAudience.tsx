import React from "react";
import Image from "next/image";
import phone from "@/assets/PartnersImage/PartnersAudience/phone.png";
import menWithPc from "@/assets/PartnersImage/PartnersAudience/menWithPc.png";

const PartnersAudience: React.FC = () => {
  return (
    <section className="w-full md:flex flex-row gap-[56px] py-[104px] items-center px-[16px] max-w-[1328px] mx-auto">
      {/* <div className="flex w-full px-[72px] gap-[56px] items-center justify-center pt-[47px]  text-white text-center mb-[100px]"> */}
      <div className="md:w-1/2">
        <div>
          <div className="italic text-[14px] sm:text-[16px] font-light sm:font-normal text-center sm:text-left text-black">
            The power of connection
          </div>
          <div className="text-black md:leading-[57px] font-light  mb-[30px] text-[34px]/[38px] sm:text-[40px]/[48px] text-center sm:text-left">
            Reach your target{" "}
            <span className="font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              audience
            </span>{" "}
            where they’re most active
          </div>
          <p className="md:text-[18px] text-black w-full text-center sm:text-left mb-8 sm:mb-0 md:pr-12">
            The new generation increasingly conducts research on their small
            screens to find the perfect co-pilot to elevate their business. At
            our platform, we’ve got you covered. Our ads drive a higher number
            of clicks, seamlessly guiding users from their search to your
            booking page in just a few clicks
          </p>
        </div>
      </div>
      <div className="md:w-1/2 relative mt-10 md:mt-0">
        <div className="absolute left-0 bottom-0 transform translate-x-[-120px] md:translate-x-[-240px] translate-y-[65px]">
          <Image
            src={phone.src}
            width={phone.width / 2}
            height={phone.height / 2}
            alt="phone"
            className={"w-[90%] md:w-full"}
          />
        </div>
        <Image
          className="w-full"
          src={menWithPc.src}
          width={menWithPc.width}
          height={menWithPc.height}
          alt="menWithPc"
        />
      </div>
      {/* </div> */}
    </section>
  );
};
export default PartnersAudience;
