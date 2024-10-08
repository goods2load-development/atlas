import { useEffect } from "react";
import { useReferralsStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export const Referal = ({
  className,
  countOfDisplaying = 2,
  forceDisplaying = false,
}: {
  className?: string;
  countOfDisplaying?: number;
  forceDisplaying?: boolean;
}) => {
  const {
    getAllReferrals,
    referrals: { referals, referalIsInCatalog },
  } = useReferralsStore((state: any) => state);

  useEffect(() => {
    getAllReferrals();
  }, []);

  if (referals?.length === 0 || (!referalIsInCatalog && !forceDisplaying)) {
    return;
  }

  return (
    <div className={clsx("min-h-[360px] w-[279px]", className)}>
      {referals?.map((item: any, idx: number) => {
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
