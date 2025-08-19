import React from 'react';

import Link from 'next/link';

const ExpandYourReach: React.FC = () => {
  return (
    <section
      className={
        'w-full flex flex-col items-center md:items-start max-w-[1328px] mx-auto px-4 my-20'
      }
    >
      <h2 className="text-black text-[30px] sm:text-[40px] mb-6 text-center md:text-left font-normal self-center">
        Expand Your Reach with
        <i className="bg-allTittleColor px-2 mx-1 rounded-md font-medium inline-block">
          Goods2Load
        </i>
      </h2>

      <ul className="flex flex-col gap-2 ml-2 md:ml-6 mb-4 text-black text-[16px] md:text-[18px]">
        <li>
          ● Verified freight forwarders offering sea, air, and road freight
          services
        </li>
        <li>● Coverage across UAE, GCC, and global trade routes</li>
        <li>
          ● Transparent profiles with certifications, services, and reviews
        </li>
        <li>● Direct shipper-to-forwarder connections — no middlemen </li>
        <li>● Digital tools to help you attract, track, and convert leads</li>
        <li>● Full digital onboarding — go live in minutes</li>
      </ul>

      <Link
        href={'/registration?provider'}
        className="inline-block self-center py-2.5 px-8 mt-8 bg-[#FF6720] text-white border rounded-[48px] hover:bg-white hover:text-[#FF6720] hover:border-[#FF6720] hover:no-underline transition duration-300 ease"
      >
        Join the Platform →
      </Link>
    </section>
  );
};

export default ExpandYourReach;
