import shipImg from '@/assets/images/ship.png';
import thereIsNotImg from '@/assets/images/thereIsNot.png';

import React from 'react';

import Image from 'next/image';

const CompanyArticle = () => {
  return (
    <section className="w-full md:flex flex-col gap-[64px] px-[16px] max-w-[1328px] mx-auto pb-8">
      <div className="w-full md:flex flex-row items-center gap-[56px]">
        <div className="md:w-1/2 rounded-lg overflow-hidden">
          <Image
            className="w-full rounded-lg translate-y-[-10%]"
            src={shipImg}
            alt={'img1'}
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-start gap-[16px]">
          <p className="text-black font-normal lg:text-[18px]/[25px] text-left">
            At GOODS2LOAD, we’ve engineered a next-gen platform powered by our
            proprietary algorithm, giving us a razor-sharp understanding of the
            logistics landscape. In seconds, our system scans thousands of
            services from the world’s leading logistics providers, delivering
            the most efficient solutions tailored to your route and service
            needs.
          </p>
          <p className="text-black font-normal lg:text-[18px]/[25px] text-left">
            We don’t just provide options—we arm SMEs with the power to choose
            from a range of providers based on real-time data, unique
            characteristics, and performance insights. Plus, we let you shape
            the performance of your catalogue page by customizing filters that
            best reflect your specific logistics needs. Whether it’s service
            type, route preferences, or other key factors, you can personalize
            the experience to suit your business. Our platform streamlines the
            process, putting the best choices at your fingertips in just a few
            clicks. With GOODS2LOAD, logistics isn’t just easy—it’s optimized to
            drive success.
          </p>
        </div>
      </div>
      <div className="w-full flex md:items-center flex-col md:flex-row md:gap-[56px] gap-2 mb-10 lg:mb-0">
        <div className="md:w-1/2 flex flex-col justify-start gap-[16px] order-2 md:order-1">
          <p className="text-black font-normal lg:text-[18px]/[25px] text-left mb-0">
            At GOODS2LOAD, we recognize the urgency of addressing the Earth’s
            limited resources and the growing need for CO2 emission management
            within the logistics industry. As part of our commitment to
            sustainability, we are focused on not only reducing CO2 emissions
            but also driving a meaningful transformation toward a greener
            future.
            <br />
            <br />
            We aim to collaborate with semi-governmental entities to convert CO2
            emissions into green assets, supporting the development of projects
            that have a real, measurable impact on the environment.
            Additionally, we are dedicated to partnering with companies that are
            at the forefront of leading this change, sponsoring and amplifying
            their efforts to make a lasting difference in the fight against
            climate change. With GOODS2LOAD, sustainability is not just a
            goal—it’s a shared responsibility and a strategic focus that drives
            us forward.
          </p>
        </div>

        <div className="md:w-1/2 rounded-lg overflow-hidden order-1 md:order-2 mt-10 md:mt-0">
          <Image
            className="w-full rounded-lg translate-y-[-10%]"
            src={thereIsNotImg}
            alt={'img2'}
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyArticle;
