import GoogleRatingIcon from "@/assets/google-rating.svg";
import Image from "next/image";
import { Stars } from "../ui/stars";
import Link from "next/link";

export interface GoogleRatingProps {
  value: number;
  reviewsCount: number;
}

export const GoogleRating = ({ data }: { data: GoogleRatingProps }) => {
  return (
    <div className="flex items-center p-1 bg-lightOrange gap-2">
      <Image
        width={80}
        height={30}
        src={GoogleRatingIcon}
        alt="Google rating"
      />
      <div className="text-[14px]/[16px]">{data.value}</div>
      <Stars value={Math.round(data.value)} width={10} height={10} />
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
