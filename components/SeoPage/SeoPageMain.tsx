"use client";
import Image from "next/image";

import useDotButton from "@/app/hooks/useDotButton";
import { useReferralsStore } from "@/lib/store";
import clsx from "clsx";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";

import Header from "@/components/Header";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import Analytics from "@/components/Dashboard/Analytics";
import TailoredServices from "../TailoredServices";

import { SeoPage } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const seoPageSchema = z.object({
  block1File: z
    .unknown()
    .transform((value) => value as FileList)
    .refine((files) => files?.length >= 1, "You need to provide a file"),
  block2File: z
    .unknown()
    .transform((value) => value as FileList)
    .refine((files) => files?.length >= 1, "You need to provide a file"),
  blocks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      video: z.string().url(),
    })
  ),
  category: z.string(),
  description: z.string(),
  dropdown: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
  title: z.string(),
});

export default function SeoPageMain({
  type,
  data,
}: {
  type: "view" | "edit" | "create";
  data?: SeoPage;
}) {
  const isView = type === "view";
  const isEdit = type === "edit";
  const isCreate = type === "create";

  const form = useForm<z.infer<typeof seoPageSchema>>({
    mode: "all",
    resolver: zodResolver(seoPageSchema),
  });

  console.log({
    data,
    values: form.getValues(),
  });

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

  const isBelowSm = true;

  const [editableItem, setEditableItem] = useState<string | null>(null);
  const [dynamicValues, setDynamicValues] = useState({
    // ach
  })

  useEffect(() => {
    getAllReferrals();
  }, []);

  const content = () => (
    <>
      <Header>
        <div className="px-[16px] max-w-[1328px] mx-auto">
          {!isView && editableItem === "title" ? (
            <FormField
              control={form?.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-8 sm:mt-16">
                  <FormControl>
                    <Input
                      className="text-black text-[38px]/[42px] sm:text-[64px]/[68px] font-light py-9"
                      placeholder="Title"
                      autoFocus
                      {...field}
                      onBlur={(e) => {
                        field.onBlur();
                        setEditableItem(null);
                      }}
                    />
                  </FormControl>
                  <br />
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />
          ) : (
            <h1
              {...(!isView && {
                onClick: () => setEditableItem("title"),
              })}
              aria-placeholder="Title..."
              contentEditable
              className="mt-8 sm:mt-16 mb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left"
            >
              {isView ? data?.title : form.getValues("title")}
            </h1>
          )}

          {!isView && editableItem === "description" ? (
            <FormField
              control={form?.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Description"
                      autoFocus
                      {...field}
                      onBlur={(e) => {
                        field.onBlur();
                        setEditableItem(null);
                      }}
                    />
                  </FormControl>
                  <br />
                  <FormMessage className="text-white" />
                </FormItem>
              )}
            />
          ) : (
            <p
              {...(!isView && {
                onClick: () => setEditableItem("description"),
              })}
              aria-placeholder="Description..."
              contentEditable
              className="font-light max-w-[916px] text-lg text-center block sm:text-left"
            >
              {isView ? data?.description : form.getValues("description")}
            </p>
          )}
        </div>
      </Header>
      <div className="mt-[-270px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
        {/* <SearchMain main /> */}
      </div>
      <section className="pb-8 md:pb-[111px]">
        <div className="max-w-[1328px] mx-auto px-4">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2 max-md:order-1">
              <Image
                className="w-full"
                width={100}
                height={100}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block1File}`}
                alt="block"
                unoptimized
              />
            </div>
            <div className="md:basis-1/2">
              <p className="max-w-[624px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                sint modi quo expedita debitis, iste maxime dolore, quos
                dignissimos adipisci vero fugit numquam alias rerum aliquid illo
                assumenda? Saepe repudiandae iste ad labore totam pariatur ab
                animi unde incidunt, iusto, aperiam nostrum debitis distinctio.
                Aliquid culpa fugiat magni eius doloribus.
              </p>
            </div>
          </div>{" "}
        </div>
      </section>
      <SubHeaderMain />
      <section className="py-8 md:py-[111px]">
        <div className="max-w-[1328px] mx-auto">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2">
              <p className="max-w-[624px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                sint modi quo expedita debitis, iste maxime dolore, quos
                dignissimos adipisci vero fugit numquam alias rerum aliquid illo
                assumenda? Saepe repudiandae iste ad labore totam pariatur ab
                animi unde incidunt, iusto, aperiam nostrum debitis distinctio.
                Aliquid culpa fugiat magni eius doloribus.
              </p>
            </div>
            <div className="md:basis-1/2">
              <Image
                className="w-full"
                width={100}
                height={100}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block2File}`}
                alt="block"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="px-4 py-20 md:py-[104px] w-full mx-auto bg-bgReferralsMobile md:bg-bgReferrals md:[background-position:0_30px]
     [background-position:0_250px] bg-no-repeat bg-contain 2xl:bg-cover"
      >
        <div className="max-w-[1328px] mx-auto">
          <h2 className="text-black text-[30px] sm:text-[40px] mb-2 text-center md:text-left">
            <i className="bg-allTittleColor px-2 rounded-md">
              Empower Your Business
            </i>{" "}
            with <span className="font-light">Tailored Services</span>
          </h2>
          <p className="max-w-[344px] text-center md:text-left font-light text-lg mb-8 md:mb-10 mx-auto md:mx-0">
            Unlock Your Business&apos;s Full Potential with Our Customized
            Solutions
          </p>

          <div className="min-h-[360px] mx-auto overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {referrals.map((referral: any, index: number) => (
                <div
                  className={clsx(
                    "min-h-[360px] min-w-0 md:pr-10 flex-[0_0_33.3333%]"
                  )}
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
        </div>
      </section>
      <TailoredServices />
      <section className="bg-allTittleColor py-12 md:py-[56px]">
        <div className="max-w-[1328px] mx-auto px-4">
          <h2 className="text-black text-[30px] sm:text-[40px] mb-10 text-center md:text-left">
            <span className="font-light">Our</span> <i>Achievements:</i>
          </h2>
          <div className="flex flex-col md:flex-row md:gap-[70px] max-md:text-center">
            <div className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0 max-md:border-b md:border-r border-[#FFC1A2]">
              <h3 className="text-[28px] text-orangePrimary mb-4">299</h3>
              <strong className="font-medium text-[22px]">
                Delivered shippings
              </strong>
            </div>

            <div className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0 max-md:border-b md:border-r border-[#FFC1A2]">
              <h3 className="text-[28px] text-orangePrimary mb-4">150</h3>
              <strong className="font-medium text-[22px]">In Transit</strong>
            </div>

            <div className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0">
              <h3 className="text-[28px] text-orangePrimary mb-4">50</h3>
              <strong className="font-medium text-[22px]">
                Pending Orders
              </strong>
            </div>
          </div>
        </div>
      </section>
      <QuestionsAndAnswers
        data={
          data
            ? data?.dropdown?.items?.map((item, i) => ({
                number: `${i < 9 ? "0" : ""}${i + 1}`,
                title: item.title,
                content: item.description,
              }))
            : []
        }
      />
      <Analytics />
    </>
  );

  return (
    <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
      {isView ? (
        content()
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>{content()}</form>
        </FormProvider>
      )}
    </main>
  );
}
