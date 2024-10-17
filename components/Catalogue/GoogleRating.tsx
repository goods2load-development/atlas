import { Stars } from '../ui/stars';
import GoogleRatingIcon from '@/assets/google-rating.svg';

import Image from 'next/image';
import Link from 'next/link';

export interface GoogleRatingProps {
  value: number;
  reviewsCount: number;
}

export const GoogleRating = ({ data }: { data: GoogleRatingProps }) => {
  return (
    <div className="flex items-center p-1 bg-lightOrange gap-2 rounded-[8px] px-2">
      <Image
        width={80}
        height={30}
        src={GoogleRatingIcon}
        alt="Google rating"
      />
      <Stars value={Math.round(data.value)} width={15} height={15} />
      <Link
        href="/"
        target="_blank"
        className="text-[12px]/[16px] text-gray-400 cursor-pointer"
      >
        {data.reviewsCount} reviews
      </Link>
    </div>
  );
};
