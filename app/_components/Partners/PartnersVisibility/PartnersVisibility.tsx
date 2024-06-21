import React from "react";
import Image from "next/image";

import pcImage from "@/assets/PartnersImage/PartnersVisibility/pc.png";
import phoneImage from "@/assets/PartnersImage/PartnersVisibility/phone.png";
import tabImage from "@/assets/PartnersImage/PartnersVisibility/tab.png";

const PartnersVisibility: React.FC = () => {
  return (
    <section className="w-full items-center justify-center pt-[47px] px-5 sm:px-[72px] text-white text-center mb-[100px]">
      <div className="mb-[40px]">
        <div className="text-black text-[40px] font-semibold italic">
          “Nice
          <span className="text-40 leading-48 font-normal text-[40px]">
            {" "}
            and{" "}
          </span>
          easy”
        </div>
        <div className="text-black">is our motto</div>
      </div>
      <div className="grid sm:grid-cols-2 mb-[100px]">
        <div className="self-center">
          <h2 className="text-black max-w-[560px] leading-[57px] font-light  mb-[10px] text-[40px]/[48px] text-left">
            <span className="max-w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              Visibility
            </span>{" "}
            in search results can truly set you apart
          </h2>
          <p className="text-[18px] text-black w-full max-w-[570px] text-left">
            Position your company on relevant research result pages and link
            directly to your website’s booking page.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0  bottom-0 transform translate-x-[-72px] sm:translate-x-[-190px] translate-y-[45px] translate-x-[-150px]">
            <Image
              alt="phone"
              src={phoneImage.src}
              width={phoneImage.width}
              height={phoneImage.height}
            />
          </div>
          <Image
            src={pcImage.src}
            width={pcImage.width}
            height={pcImage.height}
            alt="menWithPc"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center">
        <div className="w-full flex justify-center relative">
          <Image
            src={tabImage.src}
            width={tabImage.width}
            height={tabImage.height}
            className="w-full"
            alt="menWithPc"
          />
        </div>
        <div className="w-full">
          <div className="w-full max-w-[570px] text-black text-[18px] text-left mb-[30px]">
            Engage your audience, enhance business growth, fortify brand
            recognition, and drive significant traffic with <br /> our dynamic
            static display ads
          </div>
          <div className="w-full max-w-[580px] text-black text-[18px] text-left">
            Display banners enable showcasing business imagery
            <br /> and pricing plans, grabbing attention and illustrating the
            cost-effectiveness of logistic services on product impact.
          </div>
        </div>
      </div>
    </section>
  );
};
export default PartnersVisibility;
