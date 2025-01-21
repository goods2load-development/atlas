'use client';

import { fileToBase64 } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import NextImage from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const validateImageDimensions = (file: File, width: number, height: number) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.src = URL?.createObjectURL(file);
    img.onload = () => {
      resolve(img.width === width && img.height === height);
    };
  });

const validateImageEqually = (file: File) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.src = URL?.createObjectURL(file);
    img.onload = () => {
      resolve(img.width === img.height);
    };
  });

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Enter a valid URL'),

  bigBanner: z.union([
    z.string(),
    z
      .unknown()
      .transform((value) => value as FileList)
      .refine((files) => files?.length === 1, 'You need to provide a file')
      .refine(
        async (files) => files?.[0]?.size <= 5000000,
        'The file is too large, it should be less than 5MB',
      ),
  ]),
  smallBanner: z.union([
    z.string(),
    z
      .unknown()
      .transform((value) => value as FileList)
      .refine((files) => files?.length === 1, 'You need to provide a file')
      .refine(
        async (files) => files?.[0]?.size <= 5000000,
        'The file is too large, it should be less than 5MB',
      )
      .refine(async (files: any) => {
        if (!files) {
          return false;
        }

        if (typeof files[0] === 'string') {
          return true;
        }

        try {
          return await validateImageEqually(files[0]);
        } catch (error) {
          return false;
        }
      }, 'The image must be 1x1'),
  ]),
});

const ReferralFormDialog = ({
  onSubmitCallback,
  defaultValues = null,
}: {
  onSubmitCallback: (data: any) => void;
  defaultValues?: any;
}) => {
  const [smallBannerSrc, setSmallBannerSrc] = useState<string | null>(null);
  const [bigBannerSrc, setBigBannerSrc] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    shouldUnregister: false,
    ...(!!defaultValues && {
      defaultValues: {
        ...defaultValues,
        smallBanner: `${process.env.NEXT_PUBLIC_BASE_URL}${defaultValues.smallBanner}`,
        bigBanner: `${process.env.NEXT_PUBLIC_BASE_URL}${defaultValues.bigBanner}`,
      },
    }),
  });

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const bigBannerValue = getValues('bigBanner');
  const smallBannerValue = getValues('smallBanner');

  useEffect(() => {
    (async () => {
      const bannerConfigs = [
        {
          banner: bigBannerValue,
          setBanner: setBigBannerSrc,
        },
        {
          banner: smallBannerValue,
          setBanner: setSmallBannerSrc,
        },
      ];

      for (const { banner, setBanner } of bannerConfigs) {
        if (typeof banner === 'string') {
          setBanner(banner);
        } else if (banner?.length) {
          const base64 = await fileToBase64(banner[0]);
          setBanner(base64);
        } else {
          setBanner(null);
        }
      }
    })();
  }, [bigBannerValue, smallBannerValue]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmitCallback(data);
    reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-[14px]/[24px] font-bold">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-2 border-0 !mt-0"
                    placeholder="Banner 1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-[14px]/[24px] font-bold">
                  Link
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-2 border-0 !mt-0"
                    placeholder="https://****.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bigBanner"
            render={({ field }) => (
              <FormItem className="w-full mb-5 sm:flex flex-wrap">
                <div className="sm:w-1/2 sm:pr-2">
                  <FormLabel className="text-[14px]/[18px] font-normal">
                    Large banner for your referral
                  </FormLabel>
                  <FormDescription className="text-[12px]">
                    *Attachments not bigger than 5MB.
                    <br />
                    Recommended resolution 1360x360
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files || null)}
                  />
                </FormControl>
                <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                  <NextImage
                    width={16}
                    height={16}
                    className="mr-[8px]"
                    src="/upload.svg"
                    alt="upload"
                  />
                  {field.value
                    ? (field.value as FileList)?.[0]?.name
                    : 'Upload banner'}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {bigBannerSrc && (
            <div className="w-1/3 relative inline-block">
              <button
                onClick={() => {
                  setValue('bigBanner', null as any);
                  setBigBannerSrc(null);
                }}
                type="button"
                className="bg-orangePrimary w-4 h-4 rounded-full flex items-center justify-center
              absolute -top-2 -right-2"
              >
                <X color="white" />
              </button>
              <NextImage
                className="w-full"
                src={bigBannerSrc}
                width={100}
                height={100}
                alt="banner"
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="smallBanner"
            render={({ field }) => (
              <FormItem className="w-full mb-5 sm:flex flex-wrap">
                <div className="sm:w-1/2 sm:pr-2">
                  <FormLabel className="text-[14px]/[18px] font-normal">
                    Small banner for your referral
                  </FormLabel>
                  <FormDescription className="text-[12px]">
                    *Attachments not bigger than 5MB.
                    <br />
                    Recommended resolution 1x1
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files || null)}
                  />
                </FormControl>
                <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                  <NextImage
                    width={16}
                    height={16}
                    className="mr-[8px]"
                    src="/upload.svg"
                    alt="upload"
                  />
                  {field.value
                    ? (field.value as FileList)?.[0]?.name
                    : 'Upload banner'}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {smallBannerSrc && (
            <div className="w-1/3 relative inline-block">
              <button
                onClick={() => {
                  setValue('smallBanner', null as any);
                  setSmallBannerSrc(null);
                }}
                type="button"
                className="bg-orangePrimary w-4 h-4 rounded-full flex items-center justify-center
              absolute -top-2 -right-2"
              >
                <X color="white" />
              </button>
              <NextImage
                className="w-full"
                src={smallBannerSrc}
                width={100}
                height={100}
                alt="banner"
              />
            </div>
          )}
          <Button
            type="submit"
            className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
          >
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ReferralFormDialog;
