import { useCountriesStore } from '@/lib/store';
import { sortByRegion } from '@/lib/utils';

import { useEffect, useMemo, useState } from 'react';

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

export const FormStepRoadFreight = ({ form }: { form: any }) => {
  const { getCountriesByRegions, getStatesByCountry, getInfoAboutState }: any =
    useCountriesStore();

  const [activeAccord, setActiveAccord] = useState<string | undefined>(
    undefined,
  );
  const [countriesData, setCountriesData] = useState<any>(null);
  const [activeCountriesWithStates, setActiveCountriesWithStates] =
    useState<any>([]);

  const [isAccordLoading, setIsAccordLoading] = useState(false);
  const [isProvideServices, setIsProvideServices] = useState(true);
  const [isLoadingStates, setIsLoadingStates] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      if (activeAccord) {
        setIsAccordLoading(true);
        try {
          const regionsData = await getCountriesByRegions(activeAccord);
          const sortedData = sortByRegion(regionsData);
          setCountriesData(sortedData);
        } catch (error) {
          console.error('Error fetching countries data:', error);
        }

        const timeoutId = setTimeout(() => {
          setIsAccordLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    };

    fetchCountriesData();
  }, [activeAccord, getCountriesByRegions]);

  const onSelectActiveCountries = async (
    isSelect: boolean,
    codeCountry: string,
  ) => {
    if (isSelect) {
      setIsLoadingStates(codeCountry);
      const states = await getStatesByCountry(codeCountry);

      const stateInfoPromises = states.map((state: any) =>
        getInfoAboutState(state.name, codeCountry),
      );

      const stateInfos = await Promise.all(stateInfoPromises);

      setIsLoadingStates(null);

      const statesWithInfo = states.map((state: any, index: number) => ({
        ...state,
        locales: stateInfos[index].results[0]?.types,
      }));

      setActiveCountriesWithStates((prev: any) => {
        const countryWithStates = {
          codeCountry,
          states: statesWithInfo.filter(
            (item: any) =>
              item.locales &&
              (item.locales[0] === 'administrative_area_level_1' ||
                item.locales[0] === 'administrative_area_level_2'),
          ),
        };

        const countryExists = prev.some(
          (country: any) => country.codeCountry === codeCountry,
        );

        if (countryExists) {
          return prev;
        }

        return [...prev, countryWithStates];
      });
    } else {
      setActiveCountriesWithStates((prev: any) => {
        return prev.filter(
          (activeCountryWithStates: any) =>
            activeCountryWithStates.codeCountry !== codeCountry,
        );
      });
    }
  };
  useEffect(() => {
    if (!isProvideServices) {
      setActiveAccord(undefined);
      setActiveCountriesWithStates([]);
      form.setValue('cities', []);
    }
  }, [isProvideServices]);

  const memoizedCountriesData = useMemo(() => {
    if (!countriesData) return null;

    return Object.entries(countriesData).map(([label, values]: any, idx) => {
      return (
        <div key={label + idx} className="mb-4">
          <strong className="block font-bold mb-2">{label}</strong>
          {values.map((item: any, idx: number) => {
            const currentCountry = activeCountriesWithStates.find(
              (activeCountry: any) => {
                return activeCountry.codeCountry == item.cca2;
              },
            );

            return (
              item && (
                <div key={item.name.common + idx}>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      value={item.name.common}
                      checked={activeCountriesWithStates.some(
                        (activeCountry: any) =>
                          activeCountry.codeCountry === item.cca2,
                      )}
                      onCheckedChange={(isChecked: boolean) => {
                        onSelectActiveCountries(isChecked, item.cca2);
                      }}
                    />
                    <span className="font-normal">{item.name.common}</span>
                    {isLoadingStates === item.cca2 ? (
                      <Spinner />
                    ) : (
                      <ChevronDown
                        className={clsx(
                          'w-4 h-4',
                          currentCountry?.states.length > 0 ? 'rotate-180' : '',
                        )}
                      />
                    )}
                  </label>

                  {currentCountry && (
                    <FormField
                      control={form.control}
                      name="cities"
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem className="">
                              <FormControl>
                                <div className="pl-6">
                                  {currentCountry?.states?.length &&
                                  isLoadingStates !== item.cca2 ? (
                                    currentCountry?.states?.map(
                                      (state: any, idx: number) => {
                                        return (
                                          <label
                                            key={state.name + idx}
                                            className="flex items-center gap-2"
                                          >
                                            <Checkbox
                                              value={state.name}
                                              checked={
                                                field.value?.includes(
                                                  state.name,
                                                ) || false
                                              }
                                              onCheckedChange={(checked) => {
                                                const value = state.name;
                                                const newValue = checked
                                                  ? [
                                                      ...(field.value || []),
                                                      value,
                                                    ]
                                                  : field.value?.filter(
                                                      (v: string) =>
                                                        v !== value,
                                                    ) || [];
                                                field.onChange(newValue);
                                              }}
                                            />
                                            <span className="text-[14px] font-medium">
                                              {state.name}
                                            </span>
                                          </label>
                                        );
                                      },
                                    )
                                  ) : (
                                    <strong className="text-[14px] font-semibold">
                                      No States
                                    </strong>
                                  )}
                                </div>
                              </FormControl>
                            </FormItem>
                          </>
                        );
                      }}
                    />
                  )}
                </div>
              )
            );
          })}
        </div>
      );
    });
  }, [activeAccord, countriesData, activeCountriesWithStates, isLoadingStates]);

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
          <strong className="uppercase">Road freight</strong>
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
            key={activeAccord}
            type="single"
            collapsible
            className="max-w-[884px] w-full self-center"
            value={activeAccord}
            onValueChange={(value) => {
              window.scroll({
                top: 500,
                behavior: 'smooth',
              });
              setActiveAccord(value);
            }}
          >
            {regions.map((item) => (
              <AccordionItem
                key={item.label}
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
