import React from "react";

const TrustArticle = () => {
  return (
    <section className="w-full flex flex-col items-center gap-[16px] py-20 sm:py-[84px] px-[16px] max-w-[1328px] mx-auto">
      <h1 className="text-black text-center font-light sm:text-[40px]/[48px] text-[34px]/[38px]">
        We value your{" "}
        <i className="font-normal bg-[#FEF1DF] rounded-[6px] h-[49px] px-[8px]">
          input
        </i>
      </h1>
      <p className="text-black text-center px-5 sm:px-[180px] font-normal sm:text-[18px]/[25px] text-[16px]/[24px]">
        Your perspective holds immense significance to us. We genuinely care
        about your thoughts and opinions, as they guide us towards continuous
        improvement. We have high standards when it comes to our customer
        communication and support, and your feedback plays a pi- votal role in
        shaping our service and ensuring the utmost satisfaction of our valued
        clients.
      </p>
    </section>
  );
};

export default TrustArticle;
