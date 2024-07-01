import React from "react";

const CompanyMainInfo = () => {
  return (
    <section className="w-full flex flex-col items-center md:flex-row gap-[56px] lg:pt-[104px] pt-20 sm:pt-4 px-5 md:px-[72px]">
      <div className="md:w-1/2 order-2">
        <video
          muted
          autoPlay
          src={"./companyVideo.mp4"}
          className="w-full rounded-lg mb-8 sm:mb-0"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-start gap-[16px] order-1">
        <p className="text-black font-normal sm:text-[18px]/[25px] text-[16px]/[24px] text-left">
          Founded in 2022, GOODS2LOAD embarked on a mission to revolutionize the
          global logistics landscape through a digital-first paradigm. Catering
          to over 311 SMEs across Europe and now extending our reach worldwide,
          we stand at the forefront of innovation.
        </p>
        <p className="text-black font-normal md:text-[18px]/[25px] text-[16px]/[24px] text-left">
          Our cutting-edge platform, goods2load, streamlines logistics
          operations, providing pre-negotiated quotes to optimize both time and
          cost efficiency. Committed to sustainability, we champion eco-friendly
          solutions while leveraging the strengths of our diverse team to exceed
          customer expectations. Through relentless innovation, we conquer
          intricate logistics challenges, ensuring unparalleled service
          delivery.
        </p>
      </div>
    </section>
  );
};

export default CompanyMainInfo;
