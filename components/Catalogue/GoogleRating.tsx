import { Stars } from '../ui/stars';
import GoogleRatingIcon from '@/assets/icons/google-rating.svg';

import Image from 'next/image';
import Link from 'next/link';

export interface GoogleRatingProps {
  rating: number;
  totalReviews: number;
  placementId: string;
}

export const GoogleRating = ({
  rating,
  totalReviews,
  placementId,
}: GoogleRatingProps) => {
  return (
    <div className="flex items-center p-1 bg-lightOrange gap-2 rounded-[8px] px-2">
      <Image
        width={80}
        height={30}
        src={GoogleRatingIcon}
        alt="Google rating"
      />
      <div className="text-[12px]/[15px] text-gray-500 mt-0.5">{rating}</div>
      <Stars value={rating} width={15} height={15} />
      <Link
        href={`https://www.google.com/maps/place/?q=place_id:${placementId}`}
        target="_blank"
        className="text-[12px]/[16px] text-gray-400 cursor-pointer"
      >
        {totalReviews} reviews
      </Link>
    </div>
  );
};
