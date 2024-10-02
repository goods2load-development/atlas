"use client";
import Image from "next/image";

import useDotButton from "@/app/hooks/useDotButton";
import { useReferralsStore } from "@/lib/store";
import clsx from "clsx";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { z } from "zod";
import { CircleX, Plus, Trash, X } from "lucide-react";

import Header from "@/components/Header";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import SliderMain from "@/components/SliderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import Analytics from "@/components/Dashboard/Analytics";
import TailoredServices from "../TailoredServices";

import { DropdownItem, SeoPage } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { fileToBase64 } from "@/lib/utils";
import Editor from "../ui/editor";
import { Button } from "../ui/button";
import { title } from "process";
import { Textarea } from "../ui/textarea";
import { useTemplatesStore } from "@/lib/store";
import { useRouter } from "next/navigation";

type BlockFiles = "block1File" | "block2File";

const achievementsLabels: string[] = [
  "Delivered shippings",
  "Countries covered",
  "Companies served",
  "Monthly User",
];

const seoPageSchema = z.object({
  category: z.string().optional(),
  description: z.string(),
  title: z.string(),
  block1File: z
    .unknown()
    .transform((value) => value as FileList | undefined)
    .refine((files) => true, "You need to provide a file")
    .optional(),
  block2File: z
    .unknown()
    .transform((value) => value as FileList | undefined)
    .refine((files) => true, "You need to provide a file")
    .optional(),
  blocks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      video: z.string().url().optional(),
    })
  ),
  achievements: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  dropdown: z.object({
    items: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
});

export default function SeoPageMain({
  type,
  data,
}: {
  type: "view" | "edit" | "create";
  data?: SeoPage;
}) {
  const { onCreateTemplatePage }: any = useTemplatesStore();

  const isView = type === "view";
  const isEdit = type === "edit";
  const isCreate = type === "create";

  const [blockImagesBase64List, setBlockImagesBase64List] = useState<any>({
    block1File: null,
    block2File: null,
  });

  const router = useRouter();

  const [localDropdownItems, setLocalDropDownItems] = useState<DropdownItem[]>(
    []
  );

  const form = useForm<z.infer<typeof seoPageSchema>>({
    mode: "all",

    resolver: zodResolver(seoPageSchema),
  });

  console.log({
    data,
    values: form.getValues(),
  });

  const onCreateDropdownItem = () => {
    const dropdownItems = form.getValues("dropdown.items");
    const formValues = form.getValues();

    const allFieldsFilled = dropdownItems?.every((item) => {
      return item.title.trim() !== "" && item.description.trim() !== "";
    });

    if (allFieldsFilled) {
      const newDropdownItem = {
        title: dropdownItems![0].title,
        description: dropdownItems![0].description,
      };
      setLocalDropDownItems((prev) => [...prev, newDropdownItem]);
      form.setValue(`dropdown.items.${0}.title`, "");
      form.setValue(`dropdown.items.${0}.description`, "");
    }
  };

  const onDeleteLocalDropDown = (targetIdx: number) => {
    setLocalDropDownItems((prev) =>
      prev.filter((item, prevIdx) => targetIdx !== prevIdx)
    );
  };

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
  });

  useEffect(() => {
    getAllReferrals();
  }, []);

  const handleUploadBlockImages = async (event: any, field: BlockFiles) => {
    const base = await fileToBase64(event.target.files[0]);

    form?.setValue(field, event.target.files[0]);
    setBlockImagesBase64List((prev: any) => {
      return {
        ...prev,
        [field]: base,
      };
    });
  };

  const handleDeleteBlockImages = (field: BlockFiles) => {
    form?.setValue(field, undefined);
    setBlockImagesBase64List((prev: any) => ({ ...prev, [field]: null }));
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("blocks", JSON.stringify(data.blocks));
    formData.append("achievements", JSON.stringify(data.achievements));
    formData.append("dropdown", JSON.stringify({ items: localDropdownItems }));
    formData.append("block1File", data.block1File);
    formData.append("block2File", data.block2File);
    formData.append("category", "Logistics"); // Need implement category

    onCreateTemplatePage(formData).then((data: any) => {
      router.push(`/seo-page/${data.title}`);
    });
  };

  const onSubmitErrors = (errors: any) => {
    console.log("ERRORS", errors);
  };

  const content = () => (
    <>
      <Header>
        <div className="px-[16px] max-w-[1328px] mx-auto">
          {isCreate && (
            <div className="">
              <FormField
                control={form?.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-4 sm:mt-16">
                    <FormControl>
                      <Input
                        className="text-[38px]/[42px] sm:text-[34px]/[38px] font-light py-9 bg-transparent border-transparent  text-white placeholder:text-white"
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form?.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4 sm:mt-16">
                    <FormControl>
                      <Input
                        className="text-[24px]/[28px] sm:text-[24px]/[28px] font-light py-6 bg-transparent border-transparent text-white placeholder:text-white"
                        placeholder="description"
                        autoFocus
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          setEditableItem(null);
                        }}
                      />
                    </FormControl>
                    <br />
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          )}
          {isView && (
            <>
              <h1 className="mt-8 sm:mt-16 mb-5 text-[38px]/[42px] sm:text-[64px]/[68px] font-light max-w-[1265px] text-center sm:text-left">
                {data?.title}
              </h1>
              <p className="font-light max-w-[916px] text-lg text-center block sm:text-left">
                {data?.description}
              </p>
            </>
          )}
          {/* {!isView && editableItem === "title" ? (
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
          )} */}
        </div>
      </Header>
      <div className="mt-[-270px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
        {isView && <SearchMain main />}
      </div>
      <section className={clsx("pb-8 md:pb-[111px]", !isView ? "mt-40" : null)}>
        <div className="max-w-[1328px] mx-auto px-4">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2 max-md:order-1">
              {isView && (
                <Image
                  className="w-full"
                  width={100}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block1File}`}
                  alt="block"
                  unoptimized
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name="block1File"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleUploadBlockImages(e, "block1File");
                          }}
                        />
                      </FormControl>
                      {!blockImagesBase64List.block1File ? (
                        <FormLabel className="text-black border border-black font-normal text-[14px] rounded-sm py-2 flex justify-center items-center min-h-20">
                          <Image
                            width={16}
                            height={16}
                            className="mr-[8px] min-h-[250px]"
                            src={"/upload.svg"}
                            alt="upload"
                          />
                          Upload Image
                        </FormLabel>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() =>
                              handleDeleteBlockImages("block1File")
                            }
                            type="button"
                            className="absolute z-10 top-0 right-0 rounded-full border-solid bg-orangePrimary color-red -translate-y-1/2 translate-x-1/2"
                          >
                            <X color="white" />
                          </button>
                          <Image
                            width={16}
                            height={16}
                            className="mr-[8px] min-h-[250px] w-full"
                            src={blockImagesBase64List.block1File}
                            alt="upload"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${0}.video`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-black mt-10 block">
                        Video
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-black text-[24px]/[29px] sm:text-[24px]/[28px] font-light py-9"
                          placeholder="http://example.com"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="md:basis-1/2">
              {isView && (
                <>
                  <h3 className="font-medium text-[28px]/[33.6px] mb-4">
                    {data?.blocks[0].title}
                  </h3>
                  <p className="text-[18px]/[26px]">
                    {data?.blocks[0].description}
                  </p>
                </>
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${0}.title`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="text-black text-[38px]/[42px] sm:text-[34px]/[38px] font-light py-9"
                          placeholder="Block Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${0}.description`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Editor isMinimalize={true} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>{" "}
        </div>
      </section>
      <SubHeaderMain />
      <section className="py-8 md:py-[111px]">
        <div className="max-w-[1328px] mx-auto">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2">
              {isView && (
                <>
                  <h3 className="font-medium text-[28px]/[33.6px] mb-4">
                    {data?.blocks[0].title}
                  </h3>
                  <p className="text-[18px]/[26px]">
                    {data?.blocks[0].description}
                  </p>
                </>
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${1}.title`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="text-black text-[38px]/[42px] sm:text-[34px]/[38px] font-light py-9"
                          placeholder="Block Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${1}.description`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Editor isMinimalize={true} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="md:basis-1/2">
              {isView && (
                <Image
                  className="w-full"
                  width={100}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block2File}`}
                  alt="block"
                  unoptimized
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name="block2File"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleUploadBlockImages(e, "block2File");
                          }}
                        />
                      </FormControl>
                      {!blockImagesBase64List.block2File ? (
                        <FormLabel className="text-black border border-black font-normal text-[14px] rounded-sm py-2 flex justify-center items-center min-h-20">
                          <Image
                            width={16}
                            height={16}
                            className="mr-[8px] min-h-[250px]"
                            src={"/upload.svg"}
                            alt="upload"
                          />
                          Upload Image
                        </FormLabel>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() =>
                              handleDeleteBlockImages("block2File")
                            }
                            type="button"
                            className="absolute z-10 top-0 right-0 rounded-full border-solid bg-orangePrimary color-red -translate-y-1/2 translate-x-1/2"
                          >
                            <X color="white" />
                          </button>
                          <Image
                            width={16}
                            height={16}
                            className="mr-[8px] min-h-[250px] w-full"
                            src={blockImagesBase64List.block2File}
                            alt="upload"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isCreate && (
                <FormField
                  control={form?.control}
                  name={`blocks.${1}.video`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-black mt-10 block">
                        Video
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-black text-[24px]/[29px] sm:text-[24px]/[28px] font-light py-9"
                          placeholder="http://example.com"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
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
      {isView && <TailoredServices />}
      <section className="bg-allTittleColor py-12 md:py-[56px]">
        <div className="max-w-[1328px] mx-auto px-4">
          <h2 className="text-black text-[30px] sm:text-[40px] mb-10 text-center md:text-left">
            <span className="font-light">Our</span> <i>Achievements:</i>
          </h2>
          <div className="flex flex-wrap flex-col md:flex-row md:gap-[70px] max-md:text-center">
            {isView &&
              data?.achievements.map(({ label, value }) => {
                return (
                  <div className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0">
                    <h3 className="text-[28px] text-orangePrimary mb-4">
                      {value}
                    </h3>
                    <strong className="font-medium text-[22px]">{label}</strong>
                  </div>
                );
              })}

            {isCreate &&
              achievementsLabels.map((item: string, idx: number) => {
                form?.setValue(`achievements.${idx}.label`, item);
                return (
                  <div className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0">
                    <FormField
                      control={form?.control}
                      name={`achievements.${idx}.value`}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              className="text-black text-[20px]/[24px] sm:text-[20px]/[24px] font-light py-2 mb-2"
                              placeholder="value"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <strong className="font-medium text-[22px] whitespace-nowrap">
                      {item}
                    </strong>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {isView && (
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
      )}

      {isCreate && (
        <>
          <div className="flex flex-col items-center my-8 max-w-[884px] mx-auto">
            <h3 className="text-[28px]/[34px] mb-8">
              Question and answer dropdowns
            </h3>

            <div className="w-full flex gap-10">
              <FormField
                control={form?.control}
                name={`dropdown.items.${0}.title`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="text-black text-[24px]/[28px] sm:text-[24px]/[28px] font-light py-4"
                        placeholder="Question title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form?.control}
                name={`dropdown.items.${0}.description`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="text-black text-[24px]/[28px] sm:text-[24px]/[28px] font-light py-4 min-h-[100px]"
                        placeholder="Answer description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              onClick={() => onCreateDropdownItem()}
              className="mt-6"
            >
              Create new item <Plus />
            </Button>

            {localDropdownItems &&
              localDropdownItems.map((item, idx) => {
                return (
                  <div
                    key={item.title + idx}
                    className="flex items-center gap-4 mr-auto mt-4 text-[18px]/[22px] "
                  >
                    <span className="text-primaryOrange">{idx + 1}.</span>
                    <div>{item.title}</div>
                    <Button
                      variant={"default"}
                      className="p-1 h-8 w-8 bg-transparent hover:bg-transparent"
                      type="button"
                      onClick={() => onDeleteLocalDropDown(idx)}
                    >
                      <CircleX className="h-4 text-primaryOrange" />
                    </Button>
                  </div>
                );
              })}
          </div>

          {localDropdownItems && (
            <QuestionsAndAnswers
              isBackground={false}
              data={localDropdownItems.map((item, i) => ({
                number: `${i < 9 ? "0" : ""}${i + 1}`,
                title: item.title,
                content: item.description,
              }))}
            />
          )}
        </>
      )}

      <Analytics />

      {isCreate && (
        <div className="my-20 mx-auto max-w-[192px] rounded-lg bg-white py-8 px-6">
          <Button>
            Create Page <Plus />
          </Button>
        </div>
      )}
    </>
  );

  return (
    <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
      {isView ? (
        content()
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onSubmitErrors)}>
            {content()}
          </form>
        </FormProvider>
      )}
    </main>
  );
}
