'use client';

import line from '@/assets/line-dashed.svg';

import Image from 'next/image';

const CompanyAnimationLine: React.FC = () => {
  return (
    <div className="absolute inset-0 top-[47px] w-full h-fit z-[-1] ml-[-5%] overflow-hidden flex flex-row gap-1">
      <Image
        className="w-full animate-infinite-scroll"
        src={line}
        alt={'line'}
      />
      <Image
        className="w-full animate-infinite-scroll"
        src={line}
        alt={'line'}
      />
    </div>
  );
};

export default CompanyAnimationLine;
