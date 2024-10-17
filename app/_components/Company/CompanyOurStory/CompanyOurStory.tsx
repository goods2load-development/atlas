import React from 'react';

const CompanyOurStory = () => {
  return (
    <section className="w-full flex flex-col items-center gap-[16px] py-16 sm:py-[104px] sm:px-[72px] bg-divide-pattern-mobile sm:bg-divide-pattern bg-cover bg-center">
      <h1 className="text-center font-normal text-[34px]/[38px] sm:text-[48px]/[57.6px] italic">
        Our <span className="font-light not-italic">story</span>
      </h1>
      <p className="text-center font-normal text-[17px]/[25px] lg:text-[18px]/[25px] sm:max-w-[774px]">
        Our vision is a future where businesses flourish through seamless
        collaboration, innovative solutions, and a united community. With our
        commitment to excellence, cutting-edge technology, and trusted
        partnerships, we revolutionize operations, empowering businesses to
        reach their full potential. Together, we shape a future of limitless
        growth, success, and shared achievements.
      </p>
    </section>
  );
};

export default CompanyOurStory;
