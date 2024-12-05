import { useCountriesStore, usePortsStore } from '@/lib/store';
import { sortByRegion } from '@/lib/utils';

import { useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Spinner from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';

const regions = [
  {
    label: 'Africa',
    value: 'africa',
  },
  {
    label: 'Asia',
    value: 'asia',
  },
  {
    label: 'Europe',
    value: 'europe',
  },
  {
    label: 'North America',
    value: 'North America',
  },
  {
    label: 'Oceania',
    value: 'oceania',
  },
  {
    label: 'South America',
    value: 'South America',
  },
];

export const FormStepSeaFreight = ({
  form,
  step,
  activeCountries,
  setActiveCountries,
  activeAccord,
  isProvideServices,
  setIsProvideServices,
  setActiveAccord,
  setIsFreightDisabled,
  seaports,
}: {
  form: any;
  step: any;
  activeCountries: string[];
  setActiveCountries: any;
  activeAccord: string | undefined;
  isProvideServices: boolean;
  setIsProvideServices: any;
  setActiveAccord: any;
  seaports: any;
  setIsFreightDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { getCountriesByRegions }: any = useCountriesStore();
  const { getSeaPortsByCountry }: any = usePortsStore();

  const [countriesData, setCountriesData] = useState<any>(null);

  const [isAccordLoading, setIsAccordLoading] = useState(false);

  const [activeCountryAccord, setActiveCountryAccord] = useState('');

  useEffect(() => {
    if (!isProvideServices) return setIsFreightDisabled(false);

    setIsFreightDisabled(!seaports?.length);
  }, [seaports, isProvideServices, setIsFreightDisabled]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      if (activeAccord) {
        setIsAccordLoading(true);
        try {
          const regionsData = await getCountriesByRegions(activeAccord);
          const sortedData = sortByRegion(regionsData);

          const countriesWithCities: any = {};

          for (const region in sortedData) {
            countriesWithCities[region] = await Promise.all(
              sortedData[region].map(async (item: any) => {
                const seaports: any = await getSeaPortsByCountry(item.cca2);

                if (
                  !Array.isArray(seaports.data) ||
                  seaports.data.length === 0
                ) {
                  return;
                }

                return {
                  ...item,
                  seaports: seaports.data,
                };
              }),
            );
          }

          setCountriesData(countriesWithCities);
        } catch (error) {
          console.error('Error fetching countries data:', error);
        }

        setIsAccordLoading(false);
      }
    };

    fetchCountriesData();
  }, [activeAccord, getCountriesByRegions]);

  useEffect(() => {
    if (!isProvideServices) {
      setActiveAccord(undefined);
      setActiveCountries([]);
      form.setValue('seaports', []);
    }
  }, [isProvideServices]);

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScroll = (() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    return (key: string) => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        const element = refs.current[key];
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
          });
        }
      }, 10);
    };
  })();

  const scrollTimeout = useRef<any>(null);

  const onSmoothScroll = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      window.scroll({
        top: 300,
        behavior: 'smooth',
      });
    }, 10);
  };

  const memoizedCountriesData = useMemo(() => {
    if (!countriesData) return null;

    return Object.entries(countriesData).map(([label, values]: any, idx) => {
      return (
        <Accordion
          key={idx}
          type="single"
          collapsible
          className="max-w-[884px] w-full self-center"
          value={activeCountryAccord}
          onValueChange={(value) => {
            handleScroll(value);
            setActiveCountries((prev: any) => {});
            setActiveCountryAccord(value);
          }}
        >
          <strong className="block font-bold mb-1 mt-3">{label}</strong>
          {values.map((item: any, idx: number) => {
            return item && item.seaports.length > 0 ? (
              <AccordionItem
                ref={(el) => {
                  refs.current[item.cca2] = el;
                }}
                key={item.name.common + idx}
                value={item.cca2}
                className={clsx('border-transparent pl-2')}
              >
                <AccordionTrigger
                  isChevron={false}
                  className="text-orangePrimary font-light hover:no-underline ml-0 py-1.5 max-w-max"
                  disabled={false}
                >
                  <div className="text-[16px]/[20px] font-normal text-left  gap-1 inline-flex items-center">
                    <h3 className="text-blackTertiary">{item.name.common}</h3>
                    <ChevronDown className={clsx('w-4 h-4')} />
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  key={activeCountryAccord + idx}
                  className="pl-5 text-[16px]/[24px] font-light max-w-[760px] text-blackTertiary"
                >
                  <div className="flex gap-3 text-[14px]/[15px] text-gray-600 font-medium mt-3">
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        let selectedSeaports = item.seaports
                          ?.filter((seaport: any) => seaport.unlocode)
                          ?.map((seaport: any) => {
                            return `(${seaport.unlocode}) ${seaport.port_name}`;
                          });

                        const existingSeaports =
                          form.getValues('seaports') || [];

                        const uniqueSeaports = [
                          ...new Set([
                            ...existingSeaports,
                            ...selectedSeaports,
                          ]),
                        ];

                        form.setValue('seaports', uniqueSeaports);
                      }}
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        item?.seaports?.map((seaport: any) => {
                          form.setValue(
                            'seaports',
                            form
                              .getValues('seaports')
                              ?.filter(
                                (existSeaport: any) =>
                                  existSeaport !==
                                  `(${seaport.unlocode}) ${seaport.port_name}`,
                              ),
                          );
                        });
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                  <FormField
                    control={form.control}
                    name="seaports"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div className="pl-1 my-1">
                            {item.seaports.map((item: any, idx: number) => {
                              if (!item.unlocode) {
                                return;
                              }

                              const seaportValue = `(${item.unlocode}) ${item.port_name}`;

                              return (
                                <label
                                  key={seaportValue + idx}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    value={seaportValue}
                                    checked={
                                      field.value?.includes(seaportValue) ||
                                      false
                                    }
                                    onCheckedChange={(checked) => {
                                      const value = seaportValue;
                                      const newValue = checked
                                        ? [...(field.value || []), value]
                                        : field.value?.filter(
                                            (v: string) => v !== value,
                                          ) || [];
                                      field.onChange(newValue);
                                    }}
                                  />
                                  <div className="text-[14px]f font-medium flex gap-1 items-center">
                                    <span className="text-[12px]">
                                      ({item.unlocode})
                                    </span>
                                    <span>
                                      {item.port_name.includes('PORT')
                                        ? item.port_name
                                        : item.port_name + ' Port'}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null;
          })}
        </Accordion>
      );
    });
  }, [countriesData, activeCountryAccord]);

  return (
    <>
      <label className="flex justify-center items-center gap-2 mb-10">
        <span>
          I don&apos;t provide <strong>services</strong>
        </span>
        <Switch
          checked={isProvideServices}
          onCheckedChange={(isChecked: boolean) =>
            setIsProvideServices(isChecked)
          }
        />
        <span>
          I provide <strong>services</strong>
        </span>
      </label>
      <div className={clsx('', !isProvideServices && 'opacity-40')}>
        <h4 className="text-center text-[20px]/[24px] mb-4 tracking-wide">
          <strong className="uppercase">Sea freight</strong>
        </h4>
        <h4 className="mb-2 tracking-wide">
          <strong>GEOGRAPHICAL AREA OF ACTION</strong>
        </h4>
        <p className="text-[14px] text-gray-500">
          Please select the geographical areas where your company operates
          (check all that apply). Providing inaccurate information may
          negatively impact both our platform and your business&apos;s ability
          to rank higher and deliver services effectively in the designated
          regions.
        </p>

        <div className="mb-10">
          <Accordion
            key={activeCountryAccord}
            type="single"
            collapsible
            className="max-w-[884px] w-full self-center"
            value={activeAccord}
            onValueChange={(value) => {
              onSmoothScroll();
              setActiveAccord(value);
            }}
          >
            {regions.map((item: any, idx: number) => (
              <AccordionItem
                key={activeCountryAccord + idx}
                value={item.value}
                className={clsx('sm:py-1')}
              >
                <AccordionTrigger
                  className="text-orangePrimary font-light hover:no-underline md:ml-4 ml-0"
                  disabled={!isProvideServices}
                >
                  <div className="text-[18px]/[22px] font-normal text-left">
                    <h3 className="text-blackTertiary inline">{item.label}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent
                  key={activeAccord}
                  className="pl-5 text-[16px]/[24px] font-light max-w-[760px] text-blackTertiary"
                >
                  {isAccordLoading && <Spinner />}
                  {!isAccordLoading && memoizedCountriesData}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};
