import React from "react";
import Image from "next/image";
import phone from "@/assets/PartnersImage/PartnersAudience/phone.png";
import menWithPc from "@/assets/PartnersImage/PartnersAudience/menWithPc.png";

const PartnersAudience: React.FC = () => {
  return (
    <section className="w-full sm:flex flex-row gap-[56px] py-[104px] px-5 sm:px-[72px] items-center">
      {/* <div className="flex w-full px-[72px] gap-[56px] items-center justify-center pt-[47px]  text-white text-center mb-[100px]"> */}
      <div className="sm:w-1/2">
        <div>
          <div className="italic text-[16px] text-left text-black">
            The power of connection
          </div>
          <div className="text-black leading-[57px] font-light  mb-[30px] text-[40px]/[48px] text-left">
            Reach your target{" "}
            <span className="font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              audience
            </span>{" "}
            where they’re most active
          </div>
          <p className="text-[18px] text-black w-full text-left">
            The new generation increasingly conducts research on their small
            screens to find the perfect co-pilot to elevate their business. At
            our platform, we’ve got you covered. Our ads drive a higher number
            of clicks, seamlessly guiding users from their search to your
            booking page in just a few clicks
          </p>
        </div>
      </div>
      <div className="sm:w-1/2 relative">
        <div className="absolute left-0  bottom-0 transform translate-x-[-90px] sm:translate-x-[-197px] translate-y-[65px]">
          <Image
            src={phone.src}
            width={phone.width}
            height={phone.height}
            alt="phone"
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
