'use client';

import PieChart from '../Dashboard/Charts/PieChart';
import { PartnerPageResponse } from '../Dashboard/PartnersMain/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import PlaceIdMap from './PlaceIdMap';
import SendDataToPartnerDialog from './SendDataToPartnerDialog';
import UploadPartnerLogo from './UploadPartnerLogo';
import { formSchema } from './constants';
import { PlaceDetails } from './types';
import { GoogleRatingBunner } from '@/app/_components/Partner/GoogleRatingBunner/GoogleRatingBunner';
import { Review } from '@/app/_components/Partner/Review/Review';
import useBreakpoint from '@/app/hooks/useBreakpoint';
import useDotButton from '@/app/hooks/useDotButton';
import PartnerLogoDefault from '@/assets/Partners/partner-logo-default.jpg';
import bgDecorline from '@/assets/bg-decor-line.svg';
import { useAnalyticsStore } from '@/lib/analyticsStore';
import { usePartnersStore } from '@/lib/store';
import {
  addToFileList,
  fileToBase64,
  getRandomHexColor,
  removeFileFromFileList,
  urlsToFileList,
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useMemo, useState } from 'react';

import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { TrashIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

enum TabsEnum {
  SERVICES_PROVIDED = 'Service provided',
  FOCUS = 'Focus',
  INDUSTRIES = 'Industries',
  CLIENT_TARGET = 'Missions',
}

const PartnerDataPage = ({
  partnerData,
  companyPhoto,
  placeInfo,
  isCreate = false,
  isEdit = false,
}: {
  companyPhoto: string;
  partnerData?: PartnerPageResponse | any;
  placeInfo?: PlaceDetails;
  isCreate?: boolean;
  isEdit?: boolean;
}) => {
  const isGet = !isCreate && !isEdit;
  const { postInteractionWithPartner } = useAnalyticsStore();

  const { isAboveLg, isBelowLg } = useBreakpoint('lg');
  const { isAboveMd } = useBreakpoint('md');

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? partnerData?.name : '',
      description: isEdit ? partnerData?.description : '',
      mission: isEdit ? partnerData?.mission : '',
      airFreight: isEdit ? partnerData?.serviceProvided?.airFreight : '',
      seaFreight: isEdit ? partnerData?.serviceProvided?.seaFreight : '',
      roadFreight: isEdit ? partnerData?.serviceProvided?.roadFreight : '',
      missions: [],
      focus: [],
      industries: [],
      placementId: isEdit ? partnerData?.placementId : '',
    },
  });
  const { id } = useParams();
  const { toast } = useToast();
  const { push } = useRouter();

  const param = useParams();

  const { isPartnersLoading, createPartnerPage } = usePartnersStore(
    (state) => state,
  );
  const [activeTab, setActiveTab] = useState<TabsEnum>(
    TabsEnum.SERVICES_PROVIDED,
  );
  const [chartItem, setChartItem] = useState<TabsEnum>(
    TabsEnum.SERVICES_PROVIDED,
  );
  const [awardedByBase64List, setAwardedByBase64List] = useState<string[]>([]);
  const [countryFocusForm, setCountryFocusForm] = useState({
    label: '',
    value: '',
    color: '',
  });
  const [industriesForm, setIndustriesForm] = useState({
    label: '',
    value: '',
    color: '',
  });
  const [missionForm, setMissionForm] = useState({
    label: '',
    color: '',
  });
  const [charData, setChartData] = useState({
    airFreight: isEdit ? +partnerData?.serviceProvided.airFreight : 0,
    seaFreight: isEdit ? +partnerData?.serviceProvided.seaFreight : 0,
    roadFreight: isEdit ? +partnerData?.serviceProvided.roadFreight : 0,
  });

  const [focusData, setFocusData] = useState<
    {
      label: string;
      value: number;
      color: string;
      key?: string;
    }[]
  >(isEdit ? partnerData?.focus : []);
  const calculateCharFocusData = useMemo(() => {
    const partnerDataFocus = Array.isArray(partnerData?.focus)
      ? partnerData.focus
      : [partnerData?.focus];
    return (isGet ? partnerDataFocus : focusData).map((item: any) => ({
      ...item,
      value: +item?.value,
      name: item?.label,
      color: (item as any).color || getRandomHexColor(),
    }));
  }, [partnerData, focusData]);

  const [industriesData, setIndustriesData] = useState<
    {
      label: string;
      value: number;
      color: string;
      key?: string;
    }[]
  >(isEdit ? partnerData?.industries : []);

  const calculateCharIndustriesData = useMemo(() => {
    const partnerDataindustries = Array.isArray(partnerData?.industries)
      ? partnerData.industries
      : [partnerData?.industries];
    return (isGet ? partnerDataindustries : industriesData).map(
      (item: any) => ({
        ...item,
        value: +item.value,
        name: item.label,
        color: (item as any).color || getRandomHexColor(),
      }),
    );
  }, [partnerData, industriesData]);

  const [missionsData, setMissionsData] = useState<
    {
      label: string;
      color: string;
      key?: string;
    }[]
  >(isEdit ? partnerData.missions : []);

  const calculateCharMissionsData = useMemo(() => {
    const partnerDataMissions = Array.isArray(partnerData?.missions)
      ? partnerData.missions
      : [partnerData?.missions];

    return (isGet ? partnerDataMissions : missionsData)?.map(
      (item: any, _: unknown, arr: Array<unknown>) => ({
        ...item,
        value: 100 / arr.length,
        name: item?.label,
        color: item?.color || getRandomHexColor(),
      }),
    );
  }, [partnerData, isGet, missionsData]);

  const reviews = useMemo(() => {
    if (placeInfo?.status !== 'OK') return null;
    const reviewsClone = [...((placeInfo?.result?.reviews as any[]) || [])];
    reviewsClone.sort((a, b) => b.rating - a.rating);
    return reviewsClone.slice(0, 3);
  }, [placeInfo?.result?.reviews]);

  const servicesProvidedData = [
    {
      name: 'Air Freight',
      value: isGet
        ? +partnerData.serviceProvided.airFreight
        : charData.airFreight,
      color: '#3F2011',
      key: 'airFreight',
    },
    {
      name: 'Road Freight',
      value: isGet
        ? +partnerData.serviceProvided.roadFreight
        : charData.roadFreight,
      color: '#FB5304',
      key: 'roadFreight',
    },
    {
      name: 'Sea Freight',
      value: isGet
        ? +partnerData.serviceProvided.seaFreight
        : charData.seaFreight,
      color: '#F4BE37',
      key: 'seaFreight',
    },
  ];

  const currentData = useMemo(() => {
    switch (chartItem) {
      case TabsEnum.SERVICES_PROVIDED:
        return servicesProvidedData;
      case TabsEnum.FOCUS:
        return calculateCharFocusData;
      case TabsEnum.INDUSTRIES:
        return calculateCharIndustriesData;
      case TabsEnum.CLIENT_TARGET:
        return calculateCharMissionsData;
    }
  }, [chartItem]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 'auto' },
    [Fade()],
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const isHasAnyErrors = !!Object.values(form?.formState?.errors || {})?.length;
  const awardedByValues = form?.getValues('awardedBy');

  useEffect(() => {
    isGet && postInteractionWithPartner(partnerData?.id);
  }, [isGet, partnerData?.id, postInteractionWithPartner]);

  useEffect(() => {
    form?.setValue(
      'focus',
      focusData.map(({ label, value }) => ({
        label,
        value: value.toString(),
      })) as any,
    );
  }, [focusData]);

  useEffect(() => {
    form?.setValue(
      'industries',
      industriesData.map(({ label, value, color }) => ({
        label,
        value: value.toString(),
        color,
      })) as any,
    );
  }, [form, industriesData]);

  useEffect(() => {
    form?.setValue(
      'missions',
      (missionsData?.map(({ label, color }) => ({
        label,
        color,
      })) as any) || [],
    );
  }, [form, missionsData]);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const fileList = await urlsToFileList(
        partnerData?.awardsFiles.map(
          (item: any) => `${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`,
        ),
      );

      form?.setValue('awardedBy', fileList);

      const listBase64 = await Promise.all(
        Array.from(fileList).map(async (file) => {
          const base = await fileToBase64(file);

          return base;
        }),
      );

      setAwardedByBase64List(listBase64);
    })();
  }, [isEdit]);

  const onTabChange = (value: string) => {
    setActiveTab(value as TabsEnum);
  };

  const handleAwardUploadChange = (event: any) => {
    (async () => {
      if (!awardedByValues) {
        form?.setValue('awardedBy', event.target.files);
        const file = await fileToBase64(event.target.files[0]);
        setAwardedByBase64List([file]);

        return;
      }
      const newFile = event.target.files[0];

      const updatedFileList = addToFileList(
        awardedByValues as FileList,
        newFile,
      );
      form?.setValue('awardedBy', updatedFileList);
      const list = await Promise.all(
        Array.from(updatedFileList).map(async (file) => {
          const base = await fileToBase64(file);

          return base;
        }),
      );

      setAwardedByBase64List(list);
    })();
  };

  const handleAwardDelete = (index: number) => {
    setAwardedByBase64List((prev) => {
      const clone = [...prev];
      clone.splice(index, 1);

      return clone;
    });

    const updatedFileList = removeFileFromFileList(
      index,
      form?.getValues('awardedBy') as FileList,
    );
    form?.setValue('awardedBy', updatedFileList);
  };

  const onCreatePageSubmit = (data: z.infer<typeof formSchema>) => {
    const body = {
      name: data.name,
      description: data.description,
      mission: data.mission,
      focus: data.focus,
      industries: data.industries,
      serviceProvided: {
        airFreight: data.airFreight.toString(),
        roadFreight: data.roadFreight.toString(),
        seaFreight: data.seaFreight.toString(),
      },
      missions: data.missions,
      placementId: data.placementId,
      files: data.awardedBy as FileList,
    };

    const formData = new FormData();

    formData.append('name', body.name.trim());
    formData.append('description', body.description);
    formData.append('mission', body.mission);
    formData.append('placementId', body.placementId);

    formData.append(`industries`, JSON.stringify(body.industries));
    formData.append(`missions`, JSON.stringify(body.missions));
    formData.append(`focus`, JSON.stringify(body.focus));

    Object.keys(body.serviceProvided).forEach((key) => {
      const typedKey = key as keyof typeof body.serviceProvided;
      formData.append(
        `serviceProvided[${typedKey}]`,
        body.serviceProvided[typedKey],
      );
    });

    Array.from(body.files).forEach((file) =>
      formData.append('awardedFiles', file),
    );

    createPartnerPage(formData as any, id.toString()).then(() => {
      push('/dashboard/partners?tab=active');
      toast({
        title: 'Page successfully created.',
        variant: 'destructive',
        className: 'bg-green-500',
      });
    });
  };

  const content = () => (
    <>
      <section className="flex relative flex-col w-full items-center justify-center bg-cover bg-center text-white text-center z-0">
        {!isGet && (
          <div className="flex flex-col w-full items-center justify-center sm:pt-[47px] pt-10 bg-primaryOrange sm:bg-transparent sm:bg-hero-pattern bg-cover bg-center text-white text-center sm:pb-[240px] md:pb-[230px] realtive">
            <FormField
              control={form?.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 sm:pt-[120px]">
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Name of company"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:hidden absolute -top-32 left-0">
              <Image src={bgDecorline} alt="background" />
            </div>

            <div className="sm:hidden absolute -top-32 right-0 scale-x-[-1]">
              <Image src={bgDecorline} alt="background" />
            </div>
          </div>
        )}
        <div className="max-w-[1295px] w-full mx-auto md:pt-[72px] pt-6 pb-[104px] px-4">
          <div className="lg:flex gap-14 justify-between mb-10 sm:mb-[104px]">
            {isGet ? (
              <div
                className="md:basis-1/2 px-20 rounded-2xl border border-solid border-primaryOrange 
            bg-bgPartnerLogo bg-no-repeat md:[background-position:center_bottom] [background-position:bottom_bottom]
            rotate-180 md:rotate-0 shadow-[2px_2px_10px_0px_#FF672029] h-[250px] md:h-[487px]"
              >
                <div className="relative mx-auto w-2/3 sm:w-[40%] h-full rotate-180 md:rotate-0 flex items-center justify-center">
                  {companyPhoto.endsWith('.svg') ? (
                    <ReactSVG
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${companyPhoto}`}
                      beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 225px');
                      }}
                    />
                  ) : (
                    <Image
                      alt="Company"
                      src={
                        companyPhoto
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}${companyPhoto}`
                          : PartnerLogoDefault
                      }
                      layout="fill"
                      objectFit="contain"
                      unoptimized
                    />
                  )}
                </div>
              </div>
            ) : (
              <UploadPartnerLogo
                companyPhoto={companyPhoto}
                partnerId={id as string}
              />
            )}

            <div className="pt-7 text-black text-left sm:max-w-[606px] basis-1/2">
              <div className="font-medium text-[28px]/[33px] sm:text-[24px]/[28px] mb-4">
                About us
              </div>
              {!isGet ? (
                <FormField
                  control={form?.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 w-[600px]">
                      <FormControl>
                        <Textarea
                          className="text-black min-h-[300px]"
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="md:mb-4 sm:text-[18px]/[26px] text-[15px]/[22px]">
                  {partnerData?.description}
                </p>
              )}
            </div>
          </div>

          <div className="lg:flex gap-14 justify-between mb-4 md:mb-14">
            <div className="text-black text-left text-[18px]/[26px] sm:max-w-[532px] w-full">
              <h5 className="text-[28px]/[33px] sm:text-[24px]/[28px] font-medium mb-4">
                Our mission
              </h5>
              {!isGet ? (
                <FormField
                  control={form?.control}
                  name="mission"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 w-full">
                      <FormControl>
                        <Textarea
                          className="text-black min-h-[300px]"
                          placeholder="Mission"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="mb-4 text-[15px]/[22px] sm:text-[18px]/[26px]">
                  {partnerData?.mission}
                </p>
              )}
            </div>

            {isBelowLg && (
              <div className="p-4 border border-lightOrange mb-10">
                <Select
                  value={chartItem}
                  onValueChange={(val) => setChartItem(val as any)}
                >
                  <SelectTrigger className="border-none bg-lightOrange rounded-none text-orangePrimary font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none !p-0">
                    <SelectItem
                      className="py-3 rounded-none bg-white border-b-[1px] border-b-orangePrimary"
                      key="service-provided"
                      value={TabsEnum.SERVICES_PROVIDED}
                    >
                      Service provided
                    </SelectItem>
                    <SelectItem
                      className="py-3 rounded-none bg-white border-b-[1px] border-b-orangePrimary"
                      key="focus"
                      value={TabsEnum.FOCUS}
                    >
                      Focus
                    </SelectItem>
                    <SelectItem
                      className="py-3 rounded-none bg-white border-b-[1px] border-b-orangePrimary"
                      key="industries"
                      value={TabsEnum.INDUSTRIES}
                    >
                      Industries
                    </SelectItem>
                    <SelectItem
                      className="py-3 rounded-none bg-white border-b-[1px] border-b-orangePrimary"
                      key="clients-target"
                      value={TabsEnum.CLIENT_TARGET}
                    >
                      Missions
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-[280px] h-[280px] mx-auto">
                  <PieChart data={currentData} />
                </div>

                <div className="mt-[30px] flex-1">
                  <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
                    Services lines
                  </div>

                  <div className="text-black">
                    {currentData.map((elem: any) => (
                      <div key={elem.name} className="flex gap-2 mb-4">
                        <div
                          className="w-[24px] h-[24px] rounded-sm"
                          style={{ backgroundColor: elem.color }}
                        ></div>
                        <div>{elem.name}</div>
                        <div className="ml-auto flex items-center">
                          {elem.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isAboveLg && (
              <div className="text-black text-left p-4 border border-lightOrange basis-1/2">
                <Tabs value={activeTab} onValueChange={onTabChange}>
                  <TabsList>
                    <TabsTrigger
                      className={`cursor-pointer text-[16px]/[24px] font-semibold w-[169px] rounded-none border-b border-r border-lightOrange`}
                      value={TabsEnum.SERVICES_PROVIDED}
                      style={{
                        backgroundColor:
                          TabsEnum.SERVICES_PROVIDED === activeTab
                            ? '#FFEDE4'
                            : 'inherit',
                        color:
                          TabsEnum.SERVICES_PROVIDED === activeTab
                            ? '#FF6720'
                            : '#000',
                      }}
                    >
                      {TabsEnum.SERVICES_PROVIDED}
                    </TabsTrigger>
                    <TabsTrigger
                      className={`cursor-pointer text-[16px]/[24px] font-semibold w-[169px] rounded-none border-b border-r border-lightOrange`}
                      value={TabsEnum.FOCUS}
                      style={{
                        backgroundColor:
                          TabsEnum.FOCUS === activeTab ? '#FFEDE4' : 'inherit',
                        color:
                          TabsEnum.FOCUS === activeTab ? '#FF6720' : '#000',
                      }}
                    >
                      {TabsEnum.FOCUS}
                    </TabsTrigger>
                    <TabsTrigger
                      className={`cursor-pointer text-[16px]/[24px] font-semibold w-[169px] rounded-none border-b border-r border-lightOrange`}
                      value={TabsEnum.INDUSTRIES}
                      style={{
                        backgroundColor:
                          TabsEnum.INDUSTRIES === activeTab
                            ? '#FFEDE4'
                            : 'inherit',
                        color:
                          TabsEnum.INDUSTRIES === activeTab
                            ? '#FF6720'
                            : '#000',
                      }}
                    >
                      {TabsEnum.INDUSTRIES}
                    </TabsTrigger>
                    <TabsTrigger
                      className={`cursor-pointer text-[16px]/[24px] font-semibold w-[169px] rounded-none border-b border-r border-lightOrange`}
                      value={TabsEnum.CLIENT_TARGET}
                      style={{
                        backgroundColor:
                          TabsEnum.CLIENT_TARGET === activeTab
                            ? '#FFEDE4'
                            : 'inherit',
                        color:
                          TabsEnum.CLIENT_TARGET === activeTab
                            ? '#FF6720'
                            : '#000',
                      }}
                    >
                      {TabsEnum.CLIENT_TARGET}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={TabsEnum.SERVICES_PROVIDED}>
                    <div className="flex gap-[46px]">
                      <div className="w-[280px] h-[280px]">
                        <PieChart data={servicesProvidedData} />
                      </div>

                      <div className="mt-[30px] flex-1">
                        <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
                          Services lines
                        </div>

                        <div>
                          {servicesProvidedData.map((elem) => (
                            <div key={elem.name} className="flex gap-2 mb-4">
                              <div
                                className="w-[24px] h-[24px] rounded-sm"
                                style={{ backgroundColor: elem.color }}
                              ></div>
                              <div>{elem.name}</div>
                              <div className="ml-auto flex items-center">
                                {!isGet ? (
                                  <FormField
                                    control={form?.control}
                                    name={elem.key as any}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            className="text-black max-w-[50px]"
                                            onInput={(e: any) =>
                                              setChartData({
                                                ...charData,
                                                [elem.key]: +e.target.value,
                                              })
                                            }
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                ) : (
                                  elem.value
                                )}
                                %
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value={TabsEnum.FOCUS}>
                    <div className="flex gap-[46px]">
                      <div className="w-[280px] h-[280px]">
                        <PieChart data={calculateCharFocusData} />
                      </div>

                      <div className="mt-[30px] flex-1">
                        <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
                          Country focus
                        </div>
                        {!isGet && (
                          <>
                            <div className="flex gap-1 mb-2">
                              <Input
                                onChange={(e) =>
                                  setCountryFocusForm({
                                    ...countryFocusForm,
                                    label: e.target.value,
                                  })
                                }
                                value={countryFocusForm.label}
                                placeholder="Label"
                              />
                              <Input
                                type="number"
                                onChange={(e) =>
                                  setCountryFocusForm({
                                    ...countryFocusForm,
                                    value: e.target.value,
                                  })
                                }
                                value={countryFocusForm.value}
                                placeholder="Value"
                              />
                              <Input
                                type="color"
                                onChange={(e) =>
                                  setCountryFocusForm({
                                    ...countryFocusForm,
                                    color: e.target.value,
                                  })
                                }
                                value={countryFocusForm.value}
                                placeholder="Value"
                              />
                            </div>
                            <Button
                              type="button"
                              disabled={
                                !countryFocusForm.value ||
                                !countryFocusForm.label
                              }
                              onClick={() => {
                                setFocusData([
                                  ...focusData,
                                  {
                                    label: countryFocusForm.label,
                                    value: +countryFocusForm.value,
                                    color: countryFocusForm.color,
                                  },
                                ]);
                                setCountryFocusForm({
                                  label: '',
                                  value: '',
                                  color: '',
                                });
                              }}
                              className="w-full mb-2"
                            >
                              Add sector
                            </Button>
                          </>
                        )}
                        <div>
                          {(isGet ? calculateCharFocusData : focusData).map(
                            (elem: any) => (
                              <div key={elem.label} className="flex gap-2 mb-4">
                                <div
                                  className="w-[24px] h-[24px] rounded-sm"
                                  style={{ backgroundColor: elem.color }}
                                ></div>
                                <div>{elem.label}</div>
                                <div className="ml-auto flex items-center">
                                  {elem.value}%
                                </div>
                                {!isGet && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFocusData((data) =>
                                        data.filter(
                                          (item) => item.label !== elem.label,
                                        ),
                                      )
                                    }
                                  >
                                    <TrashIcon />
                                  </button>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value={TabsEnum.INDUSTRIES}>
                    <div className="flex gap-[46px]">
                      <div className="w-[280px] h-[280px]">
                        <PieChart data={calculateCharIndustriesData} />
                      </div>

                      <div className="mt-[30px] flex-1">
                        <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
                          Service lines
                        </div>
                        {!isGet && (
                          <>
                            {' '}
                            <div className="flex gap-1 mb-2">
                              <Input
                                onChange={(e) =>
                                  setIndustriesForm({
                                    ...industriesForm,
                                    label: e.target.value,
                                  })
                                }
                                value={industriesForm.label}
                                placeholder="Label"
                              />
                              <Input
                                type="number"
                                onChange={(e) =>
                                  setIndustriesForm({
                                    ...industriesForm,
                                    value: e.target.value,
                                  })
                                }
                                value={industriesForm.value}
                                placeholder="Value"
                              />
                              <Input
                                type="color"
                                onChange={(e) =>
                                  setIndustriesForm({
                                    ...industriesForm,
                                    color: e.target.value,
                                  })
                                }
                                value={industriesForm.color}
                                placeholder="Value"
                              />
                            </div>
                            <Button
                              type="button"
                              disabled={
                                !industriesForm.value || !industriesForm.label
                              }
                              onClick={() => {
                                setIndustriesData([
                                  ...industriesData,
                                  {
                                    label: industriesForm.label,
                                    value: +industriesForm.value,
                                    color: industriesForm.color,
                                  },
                                ]);
                              }}
                              className="w-full mb-2"
                            >
                              Add sector
                            </Button>
                          </>
                        )}
                        <div>
                          {(isGet
                            ? calculateCharIndustriesData
                            : industriesData
                          ).map((elem: any) => (
                            <div key={elem.label} className="flex gap-2 mb-4">
                              <div
                                className="w-[24px] h-[24px] rounded-sm"
                                style={{ backgroundColor: elem.color }}
                              ></div>
                              <div>{elem.label}</div>
                              <div className="ml-auto flex items-center">
                                {elem.value}%
                              </div>
                              {!isGet && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIndustriesData((data) =>
                                      data.filter(
                                        (item) => item.label !== elem.label,
                                      ),
                                    )
                                  }
                                >
                                  <TrashIcon />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value={TabsEnum.CLIENT_TARGET}>
                    <div className="flex gap-[46px]">
                      <div className="w-[280px] h-[280px]">
                        <PieChart data={calculateCharMissionsData} />
                      </div>

                      <div className="mt-[30px] flex-1">
                        <div className="font-medium border-b border-lightOrange pb-2 w-full mb-6">
                          Services lines
                        </div>

                        {!isGet && (
                          <>
                            {' '}
                            <div className="flex gap-1 mb-2">
                              <Input
                                onChange={(e) =>
                                  setMissionForm({
                                    ...missionForm,
                                    label: e.target.value,
                                  })
                                }
                                value={missionForm.label}
                                placeholder="Label"
                              />

                              <Input
                                type="color"
                                onChange={(e) =>
                                  setMissionForm({
                                    ...missionForm,
                                    color: e.target.value,
                                  })
                                }
                                value={missionForm.color}
                                placeholder="Value"
                              />
                            </div>
                            <Button
                              type="button"
                              disabled={!missionForm.label}
                              onClick={() => {
                                setMissionsData([
                                  ...missionsData,
                                  {
                                    label: missionForm.label,
                                    color: missionForm.color,
                                  },
                                ]);
                                setMissionForm({
                                  label: '',
                                  color: '',
                                });
                              }}
                              className="w-full mb-2"
                            >
                              Add sector
                            </Button>
                          </>
                        )}

                        <div>
                          {(isGet
                            ? calculateCharMissionsData
                            : missionsData
                          )?.map((elem: any) => (
                            <div
                              key={elem.label}
                              className="flex justify-between gap-2 mb-4"
                            >
                              <div
                                className="w-[24px] h-[24px] rounded-sm"
                                style={{ backgroundColor: elem.color }}
                              ></div>
                              <div>{elem.label}</div>
                              {!isGet && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMissionsData((data) =>
                                      data.filter(
                                        (item) => item.label !== elem.label,
                                      ),
                                    )
                                  }
                                >
                                  <TrashIcon />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          <SendDataToPartnerDialog
            trigger={
              <button
                disabled={!isGet}
                onClick={() => {
                  postInteractionWithPartner(partnerData?.id);
                }}
                type="button"
                className="w-full max-w-[343px] animate-button-ping transition-shadow bg-primaryOrange
          mx-auto rounded-md text-white text-center py-4 hover:opacity-90
          cursor-pointer font-medium mb-10 md:mb-[104px]"
              >
                GET A FREE QUOTATION
              </button>
            }
          />

          {!isGet ? (
            <PlaceIdMap
              onChangePlaceId={(placeId: string) =>
                form.setValue('placementId', placeId)
              }
              placeId={isEdit ? form.getValues('placementId') : undefined}
            />
          ) : (
            <>
              {placeInfo && reviews && (
                <>
                  <GoogleRatingBunner placeInfo={placeInfo} />
                  {isAboveMd ? (
                    <>
                      <div className="flex justify-between items-start gap-[43px] mt-10">
                        {reviews.map((review) => (
                          <Review review={review} key={review.time} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div
                      className="mx-auto overflow-hidden mt-4"
                      ref={emblaRef}
                    >
                      <div className="flex">
                        {reviews.map((review) => (
                          <div className="flex-[0_0_100%]" key={review.time}>
                            <Review review={review} />
                            <div className="flex gap-8 mt-6 justify-center">
                              <button className="w-[44px] h-[44px] flex items-center justify-center bg-orangePrimary rounded-full">
                                <Image
                                  onClick={() => emblaApi?.scrollPrev()}
                                  width={8}
                                  height={16}
                                  src="/arrow-slider-left.svg"
                                  alt="prev"
                                />
                              </button>
                              <div className="embla__dots self-center">
                                {scrollSnaps.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => onDotButtonClick(index)}
                                    className={`embla__dot w-2 h-2 rounded-full mx-[6px] border ${
                                      index === selectedIndex
                                        ? 'bg-black scale-[1.5]'
                                        : 'bg-gray-400 scale-100'
                                    } transition-transform border-gray-400`}
                                  />
                                ))}
                              </div>
                              <button className="w-[44px] h-[44px] flex items-center justify-center bg-orangePrimary rounded-full">
                                <Image
                                  onClick={() => emblaApi?.scrollNext()}
                                  width={8}
                                  height={16}
                                  src="/arrow-slider-right.svg"
                                  alt="next"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div className="mt-10 md:mt-[112px]">
            <h3 className="text-4xl md:text-[48px] mb-8 text-black text-center md:text-left">
              <div className="bg-[#FEF1DF] font-light p-1 rounded-sm inline-block">
                <span>Awarded</span>
              </div>
              <i className="font-normal">by:</i>
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_4fr))] gap-10">
              {!isGet && (
                <FormField
                  control={form?.control}
                  name="awardedBy"
                  render={({ field }) => (
                    <FormItem className="min-w-[294px]">
                      <FormControl>
                        <Input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          onChange={handleAwardUploadChange}
                        />
                      </FormControl>
                      <FormLabel className="text-black border border-black font-normal text-[14px] rounded-sm py-2 flex justify-center items-center min-h-20">
                        <Image
                          width={16}
                          height={16}
                          className="mr-[8px]"
                          src="/upload.svg"
                          alt="upload"
                        />
                        Upload award
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isGet &&
                partnerData?.awardsFiles.map((item: any) => (
                  <Image
                    key={item.path}
                    width={293}
                    height={400}
                    className="h-auto w-full"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`}
                    unoptimized
                    alt="award"
                  />
                ))}

              {!isGet &&
                awardedByBase64List.map((base, i) => (
                  <div className="relative" key={base}>
                    <button
                      onClick={() => handleAwardDelete(i)}
                      type="button"
                      className="absolute z-10 top-0 right-0 rounded-full border-solid bg-orangePrimary color-red -translate-y-1/2 translate-x-1/2"
                    >
                      <X color="white" />
                    </button>
                    <Image
                      width={294}
                      height={200}
                      src={base}
                      className="w-full"
                      alt="award"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {isCreate && isHasAnyErrors && (
        <div className="fixed top-2 right-2 bg-white rounded-xl w-[300px] h-[140px] overflow-y-scroll p-2 shadow-md">
          <h3 className="text-2xl font-bold">Error list:</h3>
          {Object.values(form?.formState?.errors || {}).map((error, i) => {
            if (!error?.message) return null;
            return (
              <p key={`${error?.message}-${i}`} className="text-red-500">
                {error?.message?.toString()}
              </p>
            );
          })}
        </div>
      )}
      {!isGet && (
        <Button
          type="submit"
          disabled={form?.formState?.isSubmitting}
          className="fixed left-1/2 bottom-6 -translate-x-1/2 px-10"
        >
          Submit
        </Button>
      )}
    </>
  );

  if (!isGet)
    return (
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onCreatePageSubmit)}>
          {content()}
        </form>
      </FormProvider>
    );

  return content();
};
export default PartnerDataPage;
