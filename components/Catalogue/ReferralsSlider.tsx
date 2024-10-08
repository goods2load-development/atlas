"use client";

"use client";
import useDotButton from "@/app/hooks/useDotButton";
import { useReferralsStore } from "@/lib/store";
import clsx from "clsx";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { ReferralItemType } from "../Dashboard/ReferralMain/types";
import Link from "next/link";
import useBreakpoint from "@/app/hooks/useBreakpoint";

export default function ReferalsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [Autoplay({ playOnInit: true, delay: 5000 }), Fade()]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { getAllReferrals, referrals: referralsData } = useReferralsStore(
    (state: any) => state
  );
  const { referals: referrals = [], slicePerReferals = null } = referralsData;

  const { isBelowSm } = useBreakpoint("sm");

  useEffect(() => {
    getAllReferrals();
  }, []);

  return (
    <div className="min-h-[360px] mx-auto overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {referrals.map((referral: ReferralItemType, index: number) => (
          <div
            className={clsx("min-h-[360px] min-w-0 md:pr-10 flex-[0_0_100%]", {
              "md:flex-[0_0_33.3333%]": slicePerReferals === 3,
              "md:flex-[0_0_50%]": slicePerReferals === 2,
            })}
            key={index}
          >
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${slicePerReferals === 3 || isBelowSm ? referral.smallBanner : referral.bigBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="h-full rounded-2xl overflow-hidden relative"
            >
              <Link
                target="_blank"
                className="absolute inset-0"
                href={referral.url}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-8">
        <div className="embla__dots self-center">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot w-[12px] h-[12px] rounded-full mx-[6px] border border-orangePrimary".concat(
                index === selectedIndex
                  ? " bg-orangePrimary"
                  : " bg-transparent"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
