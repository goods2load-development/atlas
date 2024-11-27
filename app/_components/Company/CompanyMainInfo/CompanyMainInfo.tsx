import React from 'react';

const CompanyMainInfo = () => {
  return (
    <section className="w-full flex flex-col items-center md:flex-row gap-[56px] lg:pt-5 pt-20 sm:pt-4 px-[16px] max-w-[1328px] mx-auto">
      <div className="md:w-1/2 md:order-1 order-2">
        <video
          muted
          autoPlay
          src={'./companyVideo.mp4'}
          className="w-full rounded-lg mb-8 sm:mb-0"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-start gap-[16px] md:order-2 order-1">
        <p className="text-black font-normal lg:text-[18px]/[25px] text-[16px]/[24px] text-left">
          Founded in 2023, GOODS2LOAD is transforming the global logistics
          landscape with a bold, digital-first approach. Our cutting-edge
          platform redefines freight forwarding, delivering optimized solutions
          that turbocharge both time and cost efficiency.
        </p>
        <p className="text-black font-normal lg:text-[18px]/[25px] text-[16px]/[24px] text-left">
          But we’re not just about logistics; we’re about creating a sustainable
          future. We push eco-friendly solutions to the forefront, driving
          positive change in the industry. Built on diversity and fueled by
          innovation, our team is dedicated to exceeding expectations and
          breaking the mold of traditional logistics. Our platform is the
          ultimate tool for SMEs, helping them scale faster by connecting with
          the right logistics partners to power their growth. At GOODS2LOAD, we
          believe everyone deserves the chance to innovate and change the game.
          Together, we’re rewriting the future of logistics.
        </p>
      </div>
    </section>
  );
};

export default CompanyMainInfo;
