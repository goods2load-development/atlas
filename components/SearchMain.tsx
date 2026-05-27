'use client';

import { Dialog, DialogContent } from './ui/dialog';
import LoadingBalls from './ui/loading-balls';
import FilterIcon1 from '@/assets/icons/filtericon1.svg';
import FilterIcon2 from '@/assets/icons/filtericon2.svg';
import FilterIcon3 from '@/assets/icons/filtericon3.svg';
import SadSmile from '@/assets/icons/sad-smile.svg';
import TurnIcon from '@/assets/icons/turn.svg';
import TurnHover from '@/assets/icons/turnhover.svg';
import {
  DeliveryBy,
  useCurrenciesStore,
  useFilterStore,
} from '@/lib/filterStore';
import { useCountriesStore, useGoodsStore } from '@/lib/store';

import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import UIButton from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToolTipComponent } from '@/components/ui/tooltip';

const placementOfGoodsOptions = [
  'Pallets',
  'Tanks',
  'Drums',
  'Big Bags',
  'ULDs',
  'Bulk Cargo',
  'Ro-Ro',
  '20’ Container',
  '40’ Container',
  'Carton Boxes',
  'Other',
];

enum FIELD_NAMES {
  FROM_COUNTRY_OPEN = 'FROM_COUNTRY_OPEN',
  FROM_CITY_OPEN = 'FROM_CITY_OPEN',
  TO_COUNTRY_OPEN = 'TO_COUNTRY_OPEN',
  TO_CITY_OPEN = 'TO_CITY_OPEN',
}

interface IncotermsItem {
  name: string;
  description: string;
}

type Incoterms = {
  [key in DeliveryBy]: IncotermsItem[];
};

const incotermsList: Incoterms = {
  plane: [
    { name: 'Unknown', description: `In case you’re unsure` },
    { name: 'DDP', description: 'Delivered Duty Paid' },
    { name: 'DPU', description: 'Delivered at Place Unloaded' },
    { name: 'DAP', description: 'Delivered At Place' },
    { name: 'CPT', description: 'Carriage Paid To' },
    { name: 'CIP', description: 'Carriage and Insurance Paid To' },
    { name: 'EXW', description: 'Ex Works' },
    { name: 'FCA', description: 'Free Carrier' },
  ],
  ferry: [
    { name: 'Unknown', description: `In case you’re unsure` },
    { name: 'CFR', description: 'Cost and Freight' },
    { name: 'CIF', description: 'Cost, Insurance and Freight' },
    { name: 'FOB', description: 'Free on Board' },
    { name: 'FAS', description: 'Free Alongside Ship' },
    { name: 'CPT', description: 'Carriage Paid To' },
    { name: 'CIP', description: 'Carriage and Insurance Paid To' },
    { name: 'FCA', description: 'Free Carrier' },
  ],
  truck: [
    { name: 'Unknown', description: `In case you’re unsure` },
    { name: 'DDP', description: 'Delivered Duty Paid' },
    { name: 'DPU', description: 'Delivered at Place Unloaded' },
    { name: 'DAP', description: 'Delivered At Place' },
    { name: 'CPT', description: 'Carriage Paid To' },
    { name: 'CIP', description: 'Carriage and Insurance Paid To' },
    { name: 'EXW', description: 'Ex Works' },
    { name: 'FCA', description: 'Free Carrier' },
  ],
};

const filterIcons = {
  1: FilterIcon1,
  2: FilterIcon2,
  3: FilterIcon3,
};

interface CustomRadioGroupItemProps {
  value: string;
  imageNumber: keyof typeof filterIcons;
}

const CustomRadioGroupItem: FC<CustomRadioGroupItemProps> = ({
  value,
  imageNumber,
}) => {
  const Icon = filterIcons[imageNumber];
  return (
    <>
      <RadioGroupItem value={value} id={value} className="hidden" />
      <Label htmlFor={value}>
        <Image
          src={Icon}
          alt={value}
          width={58}
          height={58}
          className="cursor-pointer"
        />
      </Label>
    </>
  );
};

export default function SearchMain({ main }: { main?: boolean }) {
  const router = useRouter();
  const {
    countriesList,
    countriesListLoading,
    citiesList,
    citiesListLoading,
    citiesListTo,
    citiesListToLoading,
    getCountriesList,
    getCitiesList,
  } = useCountriesStore((state: any) => state);
  const {
    setFilter,
    hydrate,
    persistSearchForm,
    deliveryBy,
    fromCountry,
    from,
    toCountry,
    to,
    departure,
    arrival,
    typeOfGoods,
    totalKg,
    placementOfGoods,
    quantity,
    length,
    width,
    height,
    goodsValue,
    incoterms,
    getPartners,
    valid,
  } = useFilterStore((state: any) => state);
  const { goodsList, goodsListLoading, getGoodsList } = useGoodsStore(
    (state: any) => state,
  );
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);

  useEffect(() => {
    // Restore saved search form state from localStorage (client-side only)
    hydrate();
  }, []);

  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });

  function switchLocations() {
    const values = {
      fromCountry: fromCountry,
      from: from,
      toCountry: toCountry,
      to: to,
    };
    setFilter({
      fromCountry: values.toCountry,
      from: values.to,
      toCountry: values.fromCountry,
      to: values.from,
    });
  }
  const debounce = useRef();
  const [open, setOpen] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState({
    response: false,
    error: false,
    loading: false,
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFilter({ typeOfGoods: value });
  };

  const handleFocus = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (typeOfGoods.length >= 4 && open) {
      clearTimeout(debounce.current);
      // @ts-ignore
      debounce.current = setTimeout<any>(() => {
        getGoodsList(typeOfGoods);
      }, 1000);
    }
  }, [typeOfGoods]);

  function onSubmit(e: any) {
    e.preventDefault();

    if (valid) {
      persistSearchForm();
      getPartners();
      if (main) router.push('/catalogue');
    }
  }

  function filter(value: string, search: string) {
    if (value.includes(search.toLocaleLowerCase())) return 1;
    else return 0;
  }

  const [popoverOpen, setPopoverOpen] = useState<
    null | keyof typeof FIELD_NAMES
  >(null);

  const onFileUploaded = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoadingAI({
      loading: true,
      response: false,
      error: false,
    });

    try {
      const response = await fetch('https://hscode.vition.ai/get_hscode', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer e509ff5e0f716f5418997f68bd665a8d',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { hscode, object } = await response.json();

      if (hscode === 'Unavailable') throw new Error(`Error: Unavailable code.`);

      setFilter({
        typeOfGoods: `${hscode} ${object}`,
      });
      setIsLoadingAI({
        response: true,
        error: false,
        loading: true,
      });
    } catch (err) {
      setIsLoadingAI({
        response: false,
        error: true,
        loading: true,
      });
    } finally {
      setTimeout(() => {
        setIsLoadingAI({
          ...isLoadingAI,
          loading: false,
        });
      }, 4000);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <RadioGroup
          value={deliveryBy}
          onValueChange={(e) => {
            setFilter({
              deliveryBy: e,
              incoterms: incotermsList[e as DeliveryBy][0].name,
            });
          }}
          className={`flex justify-center sm:justify-start custom-radio ${!main && 'catalogue'} pb-5 sm:pb-0`}
        >
          <CustomRadioGroupItem value={DeliveryBy.plane} imageNumber={1} />
          <CustomRadioGroupItem value={DeliveryBy.ferry} imageNumber={2} />
          <CustomRadioGroupItem value={DeliveryBy.truck} imageNumber={3} />
        </RadioGroup>
        <div
          className={`bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] items-end p-[24px] mt-[10px] `}
        >
          <div className="lg:flex justify-stretch items-end w-full mb-[24px] lg:mb-[48px]">
            <div className="flex lg:w-[26%] items-end">
              <div className="mr-[1px] w-1/2">
                <label className="mb-2 block">From</label>
                <Popover open={popoverOpen === FIELD_NAMES.FROM_COUNTRY_OPEN}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="h-[60px] rounded-l-[16px] rounded-r-none border-none font-normal text-black w-full justify-start"
                      onClick={() =>
                        setPopoverOpen(
                          popoverOpen === FIELD_NAMES.FROM_COUNTRY_OPEN
                            ? null
                            : FIELD_NAMES.FROM_COUNTRY_OPEN,
                        )
                      }
                    >
                      <ToolTipComponent asChild text={fromCountry}>
                        {fromCountry ? (
                          <span className="block w-full truncate">
                            {fromCountry}
                          </span>
                        ) : (
                          <span className="text-gray-500">Select country</span>
                        )}
                      </ToolTipComponent>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" className="w-[200px] p-0">
                    <Command filter={filter}>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      {countriesListLoading ? (
                        <Loader />
                      ) : (
                        <ScrollArea className="h-72 w-full">
                          <CommandGroup>
                            {countriesList.map(
                              (country: any, index: number) => (
                                <CommandItem
                                  value={`${country.value}`}
                                  key={index}
                                  onSelect={() => {
                                    setFilter({ fromCountry: country.value });
                                    getCitiesList(country.value);
                                    setPopoverOpen(null);
                                  }}
                                >
                                  {country.label}
                                </CommandItem>
                              ),
                            )}
                          </CommandGroup>
                        </ScrollArea>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-1/2">
                <Popover open={popoverOpen === FIELD_NAMES.FROM_CITY_OPEN}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="h-[60px] lg:rounded-none rounded-r-[16px] rounded-l-none  border-none font-normal text-black justify-start w-full"
                      onClick={() =>
                        setPopoverOpen(
                          popoverOpen === FIELD_NAMES.FROM_CITY_OPEN
                            ? null
                            : FIELD_NAMES.FROM_CITY_OPEN,
                        )
                      }
                    >
                      <ToolTipComponent asChild text={from}>
                        {from ? (
                          <span className="block w-full truncate">{from}</span>
                        ) : (
                          <span className="text-gray-500">Select city</span>
                        )}
                      </ToolTipComponent>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command filter={filter}>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      {citiesListLoading ? (
                        <Loader />
                      ) : (
                        <ScrollArea className="h-72 w-full">
                          <CommandGroup>
                            {citiesList.map((item: any, index: number) => (
                              <CommandItem
                                value={`${item.value}`}
                                key={index}
                                onSelect={() => {
                                  setFilter({ from: item.label });
                                  setPopoverOpen(null);
                                }}
                              >
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button
              type="button"
              onClick={switchLocations}
              className="mb-[-28px] block p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-[34px] h-[34px] mx-auto lg:mx-[-16px] lg:mb-[13px] relative z-10 hover:bg-transparent group"
            >
              <Image
                className="min-w-[34px] min-h-[34px] group-hover:hidden"
                width={34}
                height={34}
                alt="turn"
                src={TurnIcon}
              />
              <Image
                className="min-w-[34px] min-h-[34px] hidden group-hover:block"
                width={34}
                height={34}
                alt="turn"
                src={TurnHover}
              />
            </Button>
            <div className="flex lg:w-[26%] items-end mb-5 lg:mb-0">
              <div className="mr-[1px] w-1/2">
                <label className="mb-2 block">To</label>
                <Popover open={popoverOpen === FIELD_NAMES.TO_COUNTRY_OPEN}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="pl-[26px] h-[60px] lg:rounded-none rounded-l-[16px] rounded-r-none border-none font-normal text-black w-full justify-start"
                      onClick={() =>
                        setPopoverOpen(
                          popoverOpen === FIELD_NAMES.TO_COUNTRY_OPEN
                            ? null
                            : FIELD_NAMES.TO_COUNTRY_OPEN,
                        )
                      }
                    >
                      <ToolTipComponent asChild text={toCountry}>
                        {toCountry ? (
                          <span className="block w-full truncate">
                            {toCountry}
                          </span>
                        ) : (
                          <span className="text-gray-500">Select country</span>
                        )}
                      </ToolTipComponent>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command filter={filter}>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      {countriesListLoading ? (
                        <Loader />
                      ) : (
                        <ScrollArea className="h-72 w-full">
                          <CommandGroup>
                            {countriesList.map((item: any, index: number) => (
                              <CommandItem
                                value={`${item.value}`}
                                key={index}
                                onSelect={() => {
                                  setFilter({ toCountry: item.value });
                                  getCitiesList(item.value, true);
                                  setPopoverOpen(null);
                                }}
                              >
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mr-[1px] w-1/2">
                <Popover open={popoverOpen === FIELD_NAMES.TO_CITY_OPEN}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="h-[60px] w-full lg:rounded-none rounded-l-none rounded-r-[16px] border-none font-normal text-black justify-start"
                      onClick={() =>
                        setPopoverOpen(
                          popoverOpen === FIELD_NAMES.TO_CITY_OPEN
                            ? null
                            : FIELD_NAMES.TO_CITY_OPEN,
                        )
                      }
                    >
                      <ToolTipComponent asChild text={to}>
                        {to ? (
                          <span className="block w-full truncate">{to}</span>
                        ) : (
                          <span className="text-gray-500">Select city</span>
                        )}
                      </ToolTipComponent>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command filter={filter}>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      {citiesListToLoading ? (
                        <Loader />
                      ) : (
                        <ScrollArea className="h-72 w-full">
                          <CommandGroup>
                            {citiesListTo.map((item: any, index: number) => (
                              <CommandItem
                                value={`${item.value}`}
                                key={index}
                                onSelect={() => {
                                  setFilter({ to: item.label });
                                  setPopoverOpen(null);
                                }}
                              >
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex lg:w-[24%]">
              <div className="mr-[1px] mb-5 lg:mb-0 w-1/2">
                <label className="mb-2 block">Departure</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      type="button"
                      className="justify-start h-[60px] text-black font-normal lg:rounded-none rounded-l-[16px] rounded-r-none hover:bg-white border-0 w-full"
                    >
                      {departure ? (
                        format(departure, 'MM/dd/yyyy')
                      ) : (
                        <span className="text-gray-500">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departure}
                      onSelect={(e) => setFilter({ departure: e })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mr-[1px] mb-5 lg:mb-0 w-1/2">
                <label className="mb-2 block">Arrival</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      type="button"
                      className="justify-start h-[60px] text-black font-normal lg:rounded-none hover:bg-white border-0 w-full rounded-r-[16px] rounded-l-none"
                    >
                      {arrival ? (
                        format(arrival, 'MM/dd/yyyy')
                      ) : (
                        <span className="text-gray-500">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={arrival}
                      onSelect={(e) => setFilter({ arrival: e })}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mr-[1px] lg:w-[24%] mb-5 lg:mb-0">
              <label className="mb-2 block">Type of goods</label>
              <Popover open={open}>
                <PopoverTrigger className="w-full">
                  <ToolTipComponent asChild text={typeOfGoods}>
                    <div className="flex">
                      <Input
                        className="h-[60px] rounded-[16px] sm:rounded-l-none sm:rounded-r-[16px]
                      border-none font-normal text-black w-full "
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={() => setOpen(false)}
                        value={typeOfGoods}
                        placeholder="e.g. 48025620 - Uncoated A4 paper ..."
                      />
                    </div>
                  </ToolTipComponent>
                </PopoverTrigger>
                <PopoverContent
                  className="md:w-[300px] w-[200px]  p-0 "
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <Command>
                    {goodsListLoading ? (
                      <Loader />
                    ) : goodsList.length ? (
                      <ScrollArea className="h-72 w-full">
                        <CommandGroup>
                          {goodsList.map((item: any, index: number) => (
                            <CommandItem
                              value={`${item.value}`}
                              key={index}
                              onSelect={() => {
                                setFilter({ typeOfGoods: item.label });
                                setOpen(false);
                              }}
                            >
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    ) : (
                      <CommandEmpty>Not found.</CommandEmpty>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* <div className="mr-[1px] sm:w-[24%] mb-5 sm:mb-0">
              <label className="mb-2 flex items-end gap-2">
                Take a photo{' '}
                <ToolTipComponent
                  text={
                    <p className="max-w-[250px]">
                      Not sure about your HS code? <br /> Let us help! Just snap
                      a quick photo, and our AI system will identify the correct
                      classification for your product in no time.
                    </p>
                  }
                />
              </label>
              <div>
                <label
                  className="h-[60px] w-[150px] rounded-[16px] sm:rounded-l-none sm:rounded-r-[16px]  border-none
              bg-white font-normal text-black flex items-center justify-center"
                >
                  <Image width={50} height={50} src={AiImage} alt="AI upload" />
                  <input
                    onChange={onFileUploaded}
                    accept="image/jpg, image/png"
                    className="hidden"
                    type="file"
                  />
                </label>
              </div>
            </div> */}
          </div>
          <div className="lg:flex justify-stretch items-end w-full">
            <div className="mr-[1px] mb-5 lg:mb-0 lg:w-[14%]">
              <label className="mb-2 block">Total Weight(Kg)</label>
              <Input
                className="h-[60px] rounded-[16px] lg:rounded-r-none lg:rounded-l-[16px] border-none font-normal text-black"
                type="number"
                placeholder="e.g. 300"
                min="1"
                value={totalKg}
                onChange={(e) => setFilter({ totalKg: e.target.value })}
              />
            </div>
            <div className="lg:w-[25%] flex">
              <div className="mr-[1px] mb-5 lg:mb-0 w-1/2">
                <label className="mb-2 flex gap-2">
                  Placement{' '}
                  <ToolTipComponent
                    text={
                      <p className="max-w-[250px]">
                        We understand that your shipment may include a variety
                        of product types, placements, and dimensions. To ensure
                        optimal service, kindly share all relevant details
                        directly with the selected logistics provider when you
                        make contact.
                      </p>
                    }
                  />
                </label>
                <Select
                  defaultValue={placementOfGoods}
                  onValueChange={(e) => setFilter({ placementOfGoods: e })}
                >
                  <SelectTrigger className="h-[60px] rounded-l-[16px] rounded-r-none lg:rounded-none border-none font-normal text-black">
                    <SelectValue placeholder="Placement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {placementOfGoodsOptions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mr-[1px] mb-5 lg:mb-0 w-1/2">
                <label className="mb-2 block">Quantity</label>
                <Input
                  className="h-[60px] rounded-l-none rounded-r-[16px] lg:rounded-none border-none font-normal text-black"
                  type="number"
                  placeholder="e.g. 5"
                  value={quantity}
                  onChange={(e) => setFilter({ quantity: e.target.value })}
                />
              </div>
            </div>
            <div className="flex lg:w-[30%] mb-5 lg:mb-0">
              <div className="mr-[1px] lg:w-1/3">
                <label className="mb-2 block text-center lg:text-left">
                  Length (cm)
                </label>
                <Input
                  className="h-[60px] lg:rounded-none border-none rounded-r-none rounded-l-[16px] font-normal text-black"
                  placeholder="e.g. 100"
                  type="number"
                  value={length}
                  onChange={(e) => setFilter({ length: e.target.value })}
                />
              </div>
              <div className="mr-[1px] lg:w-1/3 ">
                <label className="mb-2 block text-center lg:text-left">
                  Width (cm)
                </label>
                <Input
                  value={width}
                  className="h-[60px] rounded-none border-none font-normal text-black"
                  placeholder="e.g. 120"
                  type="number"
                  onChange={(e) => setFilter({ width: e.target.value })}
                />
              </div>
              <div className="mr-[1px] lg:w-1/3">
                <label className="mb-2 block text-center lg:text-left">
                  Height (cm)
                </label>
                <Input
                  className="h-[60px] lg:rounded-none rounded-r-[16px] rounded-l-none border-none font-normal text-black"
                  placeholder="e.g. 165"
                  type="number"
                  value={height}
                  onChange={(e) => setFilter({ height: e.target.value })}
                />
              </div>
            </div>
            <div className="lg:w-[25%] flex">
              <div className="mr-[1px] w-1/2">
                <label className="mb-2 block text-center lg:text-left">
                  Goods Value
                </label>
                <div className="flex text-black items-center bg-white font-normal pl-[12px] lg:rounded-none rounded-l-[16px] rounded-r-none">
                  {selectedCurrency.symbol}
                  <Input
                    className="h-[60px] lg:rounded-none rounded-r-[16px] rounded-l-none border-none font-normal text-black pl-[2px]"
                    placeholder="11200"
                    type="number"
                    value={goodsValue}
                    onChange={(e) => setFilter({ goodsValue: e.target.value })}
                  />
                </div>
              </div>
              <div className="mr-[1px] w-1/2 mb-5 lg:mb-0">
                <label className="mb-2 block">Incoterms*</label>
                <Select
                  value={incoterms}
                  onValueChange={(e) => {
                    if (e && e.length) setFilter({ incoterms: e });
                  }}
                >
                  <SelectTrigger className="h-[60px] rounded-l-none rounded-r-[16px] border-none font-normal text-black">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="overflow-visible">
                    <SelectGroup>
                      {incotermsList[deliveryBy as DeliveryBy].map(
                        (item: IncotermsItem) => (
                          <div className="flex" key={item.name}>
                            <SelectItem value={item.name} key={item.name}>
                              {item.name}
                            </SelectItem>
                            <ToolTipComponent text={item.description} />
                          </div>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ToolTipComponent asChild text="Please fill out all fields">
              <div className="lg:w-[10%] w-full">
                <UIButton
                  type="submit"
                  disabled={!valid}
                  className="mt-5 lg:mt-0 ml-0 lg:ml-[4px] self-end h-[60px] rounded-[16px] w-full pointer-events-auto"
                >
                  Explore
                </UIButton>
              </div>
            </ToolTipComponent>
          </div>
        </div>
      </form>
      <Dialog open={isLoadingAI.loading}>
        <DialogContent
          isCloseBtn={false}
          className="p-8 max-w-[500px] py-[80px] outline-none"
        >
          {isLoadingAI.response && (
            <div className="flex justify-center items-center mb-4">
              <svg
                className="w-[50px] h-[50px] text-orangePrimary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
              </svg>
            </div>
          )}

          {isLoadingAI.error && (
            <div className="flex justify-center items-center mb-4">
              <Image width={100} height={100} src={SadSmile} alt="Error" />
            </div>
          )}

          {isLoadingAI.response && (
            <p className="text-center text-xl p-1">
              Image successfully converted
            </p>
          )}

          {isLoadingAI.error && (
            <p className="text-center text-xl p-1">
              Oops! We couldn’t identify the HS Code. Please try uploading a
              clearer image, or check the size and the formats
            </p>
          )}

          {!isLoadingAI.response && !isLoadingAI.error && (
            <p className="text-center text-xl p-1">
              Converting image into HS Code...
            </p>
          )}

          {!isLoadingAI.response && !isLoadingAI.error && <LoadingBalls />}
        </DialogContent>
      </Dialog>
    </>
  );
}
