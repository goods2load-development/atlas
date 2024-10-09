import Image from "next/image";

import phoneImage from "@/assets/PartnersImage/PartnersVisibility/mac-phone.webp";
import tabImage from "@/assets/PartnersImage/PartnersVisibility/tab.png";

const PartnersVisibility = () => {
  return (
    <section className="w-full items-center justify-center sm:pt-[47px] text-white text-center  mb-[50px] sm:mb-[100px] px-[16px] max-w-[1328px] mx-auto">
      <div className="mb-[40px]">
        <div className="text-black text-[30px]/[34px] sm:text-[40px] font-normal sm:font-semibold italic">
          “Nice
          <span className="text-[30px]/[34px] sm:text-[40px] sm:leading-48 sm:font-normal font-light">
            {" "}
            and{" "}
          </span>
          easy”
        </div>
        <div className="text-black mb-6 sm:mb-0">is our motto</div>
      </div>
      <div className="grid sm:grid-cols-2 mb-[100px]">
        <div className="self-center relative z-10">
          <h2 className="text-black max-w-[560px] md:max-w-[400px] lg:max-w-[560px] md:leading-[57px] font-light  mb-[10px] text-[34px]/[38px] md:text-[40px]/[48px] text-center sm:text-left">
            <span className="max-w-[400px] font-normal italic pl-[10px] pr-[10px] bg-[#FEF1DF] mr-[10px] rounded-[6px] h-[49px] items-center">
              Visibility
            </span>{" "}
            in search results can truly set you apart
          </h2>
          <p className="sm:text-[18px] text-black w-full max-w-[570px] text-center sm:text-left mb-6 sm:mb-0">
            Position your company on relevant research result pages and link
            directly to your website’s booking page.
          </p>
        </div>
        <div className="relative">
          <Image
            alt="phone"
            src={phoneImage.src}
            width={phoneImage.width * 0.6}
            height={phoneImage.height}
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
          <div className="w-full max-w-[570px] text-black sm:text-[18px] text-center sm:text-left mb-[30px]">
            Engage your audience, enhance business growth, fortify brand
            recognition, and drive significant traffic with <br /> our dynamic
            static display ads
          </div>
          <div className="w-full max-w-[580px] text-black tsm:text-[18px] text-center sm:text-left">
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
