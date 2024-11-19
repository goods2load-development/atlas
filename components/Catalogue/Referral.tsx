import { useReferralsStore } from '@/lib/store';

import { useEffect } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const Referal = ({
  className,
  countOfDisplaying = 2,
  forceDisplaying = false,
}: {
  className?: string;
  countOfDisplaying?: number;
  forceDisplaying?: boolean;
}) => {
  const { getAllReferrals, referrals } = useReferralsStore(
    (state: any) => state,
  );

  useEffect(() => {
    getAllReferrals();
  }, []);

  if (
    referrals?.referals?.length === 0 ||
    (!referrals?.referalIsInCatalog && !forceDisplaying)
  ) {
    return;
  }

  return (
    <div className={clsx('min-h-[360px] w-[279px]', className)}>
      {referrals?.referals?.map((item: any, idx: number) => {
        if (idx + 1 > countOfDisplaying) {
          return;
        }

        return (
          <div
            key={item.url}
            className="rounded-2xl overflow-hidden relative w-full mb-6"
          >
            <Link
              target="_blank"
              className="absolute inset-0"
              href={item.url}
            ></Link>
            <Image
              className="w-full"
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.smallBanner}`}
              unoptimized
              alt="preview"
            />
          </div>
        );
      })}
    </div>
  );
};
