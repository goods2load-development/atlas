import { Stars } from '../Stars/Stars';
import GoogleCheck from '@/assets/icons/google-check.svg';
import GoogleIcon from '@/assets/icons/google-icon.svg';

import Image from 'next/image';

import { Review as ReviewType } from '@/components/PartnersDataPage/types';
import ReadMore from '@/components/ui/read-more';

export const Review = ({ review }: { review: ReviewType }) => {
  return (
    <div className="w-full max-w-[382px] bg-[#FEF1DF] rounded-md p-6 mx-auto">
      <div className="flex gap-4 mb-[12px]">
        <div className="relative max-w-max">
          <Image
            className="rounded-full"
            src={review.profile_photo_url}
            width={55}
            height={55}
            alt="user-avatar"
          />
          <Image
            className="rounded-full absolute right-0 bottom-0"
            src={GoogleIcon}
            width={22}
            height={22}
            alt="user-avatar"
          />
        </div>

        <div className="pt-1">
          <div className="flex text-[20px]/[22px] font-medium text-black">
            {review.author_name}
            <Image
              className="ml-1 mt-[6px]"
              width={14}
              height={14}
              src={GoogleCheck}
              alt="goocle-check"
            />
          </div>

          <div className="text-[16px]/[18px] text-black mt-2 text-left opacity-50">
            {review.relative_time_description}
          </div>
        </div>
      </div>

      <Stars width={18} height={18} value={review.rating} />

      <div className="max-w-[330px] mt-2 text-left text-black opacity-80">
        <ReadMore
          amountOfWords={20}
          id={review.author_url}
          text={review.text}
        />
      </div>
    </div>
  );
};
