import GoogleRatingIcon from "@/assets/google-rating.svg";
import Image from "next/image";
import { Stars } from "../ui/stars";
import Link from "next/link";

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
      <Stars value={Math.round(rating)} width={15} height={15} />
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
