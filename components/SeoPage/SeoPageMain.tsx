"use client";
import Image from "next/image";

import useDotButton from "@/app/hooks/useDotButton";
import clsx from "clsx";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { CircleX, Edit, Plus, X } from "lucide-react";

import Header from "@/components/Header";
import SearchMain from "@/components/SearchMain";
import SubHeaderMain from "@/components/SubHeaderMain";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import Analytics from "@/components/Dashboard/Analytics";
import TailoredServices from "../TailoredServices";

import { DropdownItem, SeoPage, SeoPageCategory } from "./types";
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
import { fileToBase64, getRequest, urlsToFileList } from "@/lib/utils";
import Editor from "../ui/editor";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useTemplatesStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import PartnersOurPartners from "@/app/_components/Partners/PartnersOurPartners/PartnersOurPartners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TemplateCategoryDialog from "../Dashboard/TemplateMain/TemplateCategoryDialog";
import useBreakpoint from "@/app/hooks/useBreakpoint";
import { formatToSlug } from "../Dashboard/BlogMain/utils";

type BlockFiles = "block1File" | "block2File";

const achievementsLabels: string[] = [
  "Delivered shippings",
  "Countries covered",
  "Companies served",
  "Monthly User",
];

const seoPageSchema = z.object({
  category: z.string(),
  description: z.string().min(3, "At least 3 symbols"),
  title: z.string().min(3, "At least 3 symbols"),
  subText: z.string().min(3, "At least 3 symbols"),
  block1File: z
    .unknown()
    .transform((value) => value as FileList | undefined)
    .refine((files) => true, "You need to provide a file"),
  block2File: z
    .unknown()
    .transform((value) => value as FileList | undefined)
    .refine((files) => true, "You need to provide a file"),
  blocks: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      video: z.string().optional(),
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
      .nonempty("Dropdown items cannot be empty"),
  }),
});

export default function SeoPageMain({
  type,
  data,
}: {
  type: "view" | "edit" | "create";
  data?: SeoPage;
}) {
  const {
    categories,
    onCreateTemplatePage,
    onEditTemplatePage,
    getTemplateCategories,
  }: any = useTemplatesStore();
  const [relatedPages, setRelatedPages] = useState<SeoPage[] | undefined>(
    undefined
  );

  const isView = type === "view";
  const isEdit = type === "edit";
  const isCreate = type === "create";

  const [blockImagesBase64List, setBlockImagesBase64List] = useState<any>({
    block1File: null,
    block2File: null,
  });

  const router = useRouter();

  const [localDropdownItems, setLocalDropDownItems] = useState<DropdownItem[]>(
    isEdit ? (data?.dropdown?.items as any) : []
  );
  const [qaForm, setQAForm] = useState({
    title: "",
    description: "",
  });

  const form = useForm<z.infer<typeof seoPageSchema>>({
    mode: "all",
    resolver: zodResolver(seoPageSchema),
    ...(isEdit &&
      data && {
        defaultValues: {
          title: data.title,
          description: data.description,
          category: data.category.id,
          blocks: data.blocks,
          achievements: data.achievements,
          dropdown: data.dropdown,
          subText: data?.subText,
        },
      }),
  });

  const getRelatedPages = () => {
    return getRequest({
      url: "seo-pages",
      params: {
        excludeId: data?.id || undefined,
        category: data?.category.id || undefined,
      },
    });
  };

  useEffect(() => {
    if (isView) {
      getRelatedPages().then((data) => setRelatedPages(data?.data));
    }
  }, [data]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: "auto" },
    [Autoplay({ playOnInit: true, delay: 5000 }), Fade()]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { isBelowSm } = useBreakpoint("sm");

  useEffect(() => {
    getTemplateCategories();
  }, []);

  useEffect(() => {
    form.setValue("dropdown.items", localDropdownItems as any);
  }, [form, localDropdownItems]);

  useEffect(() => {
    if (!isEdit || !data) return;
    (async () => {
      const urlsList = [data?.block1File, data?.block2File].map(
        (item) => `${process.env.NEXT_PUBLIC_BASE_URL}${item}`
      );
      const [file1, file2] = await Promise.all(
        urlsList.map(async (url) => await urlsToFileList([url]))
      );

      form?.setValue("block1File", file1);
      form?.setValue("block2File", file2);

      const listBase64 = await Promise.all(
        Array.from([file1, file2]).map(async (files) => {
          const base = await fileToBase64(files[0]);

          return base;
        })
      );

      setBlockImagesBase64List({
        block1File: listBase64[0],
        block2File: listBase64[1],
      });
    })();
  }, [data, form, isEdit]);

  const onCreateDropdownItem = () => {
    const { title, description } = qaForm;
    if (!title || !description) return;

    setLocalDropDownItems((prev) => [...prev, qaForm]);
    setQAForm({
      title: "",
      description: "",
    });
  };

  const onDeleteLocalDropDown = (targetIdx: number) => {
    setLocalDropDownItems((prev) =>
      prev.filter((item, prevIdx) => targetIdx !== prevIdx)
    );
  };

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

  function convertYouTubeUrl(url: string) {
    const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const longUrlPattern = /youtube\.com\/.*v=([a-zA-Z0-9_-]+)/;

    let videoId;

    const shortUrlMatch = url.match(shortUrlPattern);
    if (shortUrlMatch) {
      videoId = shortUrlMatch[1];
    }

    const longUrlMatch = url.match(longUrlPattern);
    if (longUrlMatch) {
      videoId = longUrlMatch[1];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return url;
    }
  }

  const handleDeleteBlockImages = (field: BlockFiles) => {
    form?.setValue(field, undefined);
    setBlockImagesBase64List((prev: any) => ({ ...prev, [field]: null }));
  };

  const onSubmit = (updatesData: z.infer<typeof seoPageSchema>) => {
    const formData = new FormData();

    formData.append("title", updatesData.title);
    formData.append("description", updatesData.description);
    formData.append("blocks", JSON.stringify(updatesData.blocks));
    formData.append("achievements", JSON.stringify(updatesData.achievements));
    formData.append("dropdown", JSON.stringify({ items: localDropdownItems }));
    formData.append("block1File", updatesData.block1File as any);
    formData.append("block2File", updatesData.block2File as any);
    formData.append("categoryId", updatesData.category);
    formData.append("subText", updatesData.subText);
    formData.append("slug", formatToSlug(updatesData?.title));

    if (isCreate) {
      onCreateTemplatePage(formData).then((data: any) => {
        router.push(`/${data.slug}`);
      });
    }

    if (isEdit) {
      onEditTemplatePage(data?.id, formData).then((data: any) => {
        router.push(`/${data.slug}`);
      });
    }
  };

  const content = () => (
    <>
      <Header>
        <div className="px-4 max-w-[1328px] mx-auto">
          {!isView && (
            <div className="">
              <FormField
                control={form?.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-4 sm:mt-16">
                    <FormLabel className="twxt-white text-[26px]/[30px] mt-6 mb-2">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[30px]/[36px] sm:text-[24px]/[28px] font-light py-9 bg-transparent border-transparent  text-black placeholder:text-gray-500 bg-white max-w-[400px]"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <br />
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />

              <FormField
                control={form?.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4 sm:mt-10">
                    <FormLabel className="twxt-white text-[26px]/[30px] mt-6 mb-2">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[30px]/[36px] sm:text-[24px]/[28px] font-light py-9 bg-transparent border-transparent  text-black placeholder:text-gray-500 bg-white max-w-[650px]"
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <br />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel className="text-white text-[26px]/[30px]">
                        Category
                      </FormLabel>

                      <TemplateCategoryDialog type="create">
                        <Button
                          type="button"
                          className="bg-transparent text-white hover:bg-transparent hover:opacity-80 transition-all p-0"
                        >
                          <Plus />
                        </Button>
                      </TemplateCategoryDialog>
                    </div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="max-w-[526px] min-w-60 w-full h-[60px] bg-white border-none rounded-[8px] pl-[20px] text-black pr-[20px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((item: SeoPageCategory) => {
                          return (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-white" />
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
        </div>
      </Header>
      <div className="mt-[-270px] sm:mt-[-120px] mb-20 w-full px-[16px] max-w-[1328px] mx-auto">
        {isView && <SearchMain main />}
      </div>
      <section
        className={clsx("pb-8 md:pb-[111px]", {
          "mt-40": !isView,
        })}
      >
        <div className="max-w-[1328px] mx-auto px-4">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2 max-md:order-1">
              {isView &&
                (data?.blocks[0]?.video ? (
                  <iframe
                    className="max-w-full"
                    width="560"
                    height="315"
                    src={convertYouTubeUrl(data?.blocks[0]?.video)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    className="w-full"
                    width={100}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block1File}`}
                    alt="block"
                    unoptimized
                  />
                ))}
              {!isView && (
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
              {!isView && (
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
                  <div
                    className="text-[18px]/[26px]"
                    dangerouslySetInnerHTML={{
                      __html: data?.blocks[0].description || "",
                    }}
                  ></div>
                </>
              )}
              {!isView && (
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
              {!isView && (
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
      <section className="py-12 md:py-[111px]">
        <div className="max-w-[1328px] mx-auto px-4">
          <div className="flex max-md:justify-center max-md:flex-wrap md:gap-14 gap-8">
            <div className="md:basis-1/2">
              {isView && (
                <>
                  <h3 className="font-medium text-[28px]/[33.6px] mb-4">
                    {data?.blocks[0].title}
                  </h3>
                  <div
                    className="text-[18px]/[26px]"
                    dangerouslySetInnerHTML={{
                      __html: data?.blocks[1].description || "",
                    }}
                  ></div>
                </>
              )}
              {!isView && (
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
              {!isView && (
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
              {isView &&
                (data?.blocks[1]?.video ? (
                  <iframe
                    className="max-w-full"
                    width="560"
                    height="315"
                    src={convertYouTubeUrl(data?.blocks[1]?.video)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    className="w-full"
                    width={100}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.block2File}`}
                    alt="block"
                    unoptimized
                  />
                ))}
              {!isView && (
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
              {!isView && (
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
      {!!relatedPages?.length && (
        <section className="w-full mx-auto">
          <div className="max-w-[1328px] mx-auto px-4">
            <h2 className="text-[30px]/[34px] md:text-[40px]/[44px] mb-8 md:mb-10 max-md:justify-center flex items-center gap-2 font-light">
              <div className="py-1.5 px-2 bg-[#FEF1DF] rounded-[4px] font-normal">
                <i>Related</i>
              </div>{" "}
              topics:
            </h2>
            <div className="mx-auto overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {relatedPages.map((page: SeoPage, index: number) => (
                  <div
                    className={clsx("min-w-0 md:pr-10 flex-[0_0_33.3333%]", {
                      "!flex-[0_0_100%]": isBelowSm,
                    })}
                    key={index}
                  >
                    <div className="relative">
                      <Image
                        width={405}
                        height={360}
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${page.block1File}`}
                        alt={page.blocks[0].title}
                        unoptimized
                        className="h-[360px] w-[405px]"
                      />
                    </div>
                    <div className="p-4 flex flex-col">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          <Link
                            href={{
                              pathname: `/${page.title}`,
                            }}
                          >
                            {page.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 max-h-40 line-clamp-3">
                          {page.description}
                        </p>
                      </div>

                      <Link
                        href={{
                          pathname: `/${page.title}`,
                        }}
                        className="text-orange-500 hover:underline mt-4 inline-block self-start"
                      >
                        Know more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {scrollSnaps.length >= 2 && (
                <div className="flex flex-col">
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
              )}
            </div>
          </div>
        </section>
      )}
      {isView && <TailoredServices className="py-20 md:py-[104px]" />}
      <section className="bg-allTittleColor py-12 md:py-[56px]">
        <div className="max-w-[1328px] mx-auto px-4">
          <h2 className="text-black text-[30px] sm:text-[40px] mb-10 text-center md:text-left">
            <span className="font-light">Our</span> <i>Achievements:</i>
          </h2>
          <div className="flex justify-between flex-col md:flex-row md:gap-[70px] max-md:text-center">
            {isView &&
              data?.achievements.map(({ label, value }) => {
                return (
                  <div
                    key={label}
                    className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0 border-r border-[#FFC1A2] last:border-transparent"
                  >
                    <h3 className="text-[28px] text-orangePrimary mb-4">
                      {value}
                    </h3>
                    <strong className="font-medium text-[22px] whitespace-nowrap">
                      {label}
                    </strong>
                  </div>
                );
              })}

            {!isView &&
              achievementsLabels.map((item: string, idx: number) => {
                form?.setValue(`achievements.${idx}.label`, item);
                return (
                  <div
                    key={item}
                    className="max-md:py-6 md:pr-[70px] pb-4 md:pb-0 border-r border-[#FFC1A2] last:border-transparent"
                  >
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

      <section className="pt-8 md:pt-[104px] bg-bgSeoPage [background-position:top_right] max-md:[background-size:140px] bg-no-repeat mb-12">
        {isView && (
          <div
            className="text-[18px]/[26px] max-w-[75%] mx-auto"
            dangerouslySetInnerHTML={{
              __html: data?.subText || "",
            }}
          ></div>
        )}
        {!isView && (
          <FormField
            control={form?.control}
            name={"subText"}
            render={({ field }) => (
              <FormItem className="max-w-[75%] mx-auto">
                <FormControl>
                  <Editor isMinimalize={true} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </section>

      {!isView && (
        <>
          <div className="flex flex-col items-center my-8 max-w-[884px] mx-auto">
            <h3 className="text-[28px]/[34px] mb-8">
              Question and answer dropdowns
            </h3>

            <div className="w-full flex gap-10">
              <Input
                value={qaForm.title}
                onChange={(e) =>
                  setQAForm({
                    ...qaForm,
                    title: e.target.value,
                  })
                }
                className="text-black text-[24px]/[28px] sm:text-[24px]/[28px] font-light py-4"
                placeholder="Question title"
              />

              <Textarea
                value={qaForm.description}
                onChange={(e) =>
                  setQAForm({
                    ...qaForm,
                    description: e.target.value,
                  })
                }
                className="text-black text-[24px]/[28px] sm:text-[24px]/[28px] font-light py-4 min-h-[100px]"
                placeholder="Answer description"
              />
            </div>

            <Button
              type="button"
              onClick={onCreateDropdownItem}
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
        </>
      )}

      <QuestionsAndAnswers
        isBackground={isView}
        data={(isView && data ? data?.dropdown?.items : localDropdownItems).map(
          (item, i) => ({
            number: `${i < 9 ? "0" : ""}${i + 1}`,
            title: item.title,
            content: item.description,
          })
        )}
      />

      <Analytics />

      {!isView && (
        <div className="my-20 mx-auto max-w-[192px] rounded-lg bg-white py-8 px-6">
          <Button>
            {isCreate && (
              <>
                Create Page <Plus />
              </>
            )}
            {isEdit && (
              <>
                Edit Page <Edit />
              </>
            )}
          </Button>
        </div>
      )}

      {isView && (
        <PartnersOurPartners className="py-8 md:pt-12 md:pb-[104px]" />
      )}
    </>
  );

  return (
    <main className="flex min-h-screen flex-col p-74 justify-between colored-main max-w-full">
      {isView ? (
        content()
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>{content()}</form>
        </FormProvider>
      )}
    </main>
  );
}
