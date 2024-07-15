"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import Loader from "@/components/common/Loader";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UIButton from "@/components/common/Button";
import { useCountriesStore, useGoodsStore } from "@/lib/store";
import {
  useFilterStore,
  useCurrenciesStore,
  DeliveryBy,
} from "@/lib/filterStore";
import { useRouter } from "next/navigation";

const placementOfGoodsOptions = [
  "Pallets",
  "Tanks",
  "Drums",
  "Big Bags",
  "ULDs",
  "Bulk Cargo",
  "Ro-Ro ",
  "Other",
];

interface IncotermsItem {
  name: string;
  description: string;
}

type Incoterms = {
  [key in DeliveryBy]: IncotermsItem[];
};

const incotermsList: Incoterms = {
  plane: [
    { name: "DDP", description: "Delivered Duty Paid" },
    { name: "DPU", description: "Delivered at Place Unloaded" },
    { name: "DAP", description: "Delivered At Place" },
    { name: "DDU", description: "Delivered Duty Unpaid" },
    { name: "CPT", description: "Carriage Paid To" },
    { name: "CIP", description: "Carriage and Insurance Paid to" },
    { name: "EXW", description: "Ex Works" },
    { name: "FCA", description: "Free Carrier" },
  ],
  ferry: [
    { name: "CFR", description: "Cost and Freight" },
    { name: "CIF", description: "Cost, Insurance and Freight" },
    { name: "CPT", description: "Carriage Paid To" },
    { name: "CIP", description: "Carriage and Insurance Paid" },
    { name: "FOB", description: "Free on Board" },
    { name: "FCA", description: "Free Carrier" },
  ],
  truck: [
    { name: "FCL", description: "Full Container Load" },
    { name: "LCL", description: "Less Than Container Load" },
  ],
};

function CustomRadioGroupItem({
  value,
  imageNumber,
}: {
  value: DeliveryBy;
  imageNumber: number;
}) {
  return (
    <>
      <RadioGroupItem value={value} id={value} className="hidden" />
      <Label htmlFor={value}>
        <Image
          src={`/filtericon${imageNumber}.svg`}
          alt={value}
          width={58}
          height={58}
          className="cursor-pointer"
        />
      </Label>
    </>
  );
}

export function ToolTipComponent({
  text,
  children,
  asChild,
}: {
  text: string;
  children?: any;
  asChild?: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>
          {children ? (
            children
          ) : (
            <div className="flex items-center">
              <p className="rounded-full border-[1px] w-[20px] h-[20px] border-[#FFC1A2] text-[#FFC1A2] mr-[10px] text-center text-[12px]">
                i
              </p>
            </div>
          )}
        </TooltipTrigger>
        {!!text.length && (
          <TooltipContent
            side={!!children ? "top" : "right"}
            className="text-[14px]/[18px] font-normal bg-[#FEF1DF] rounded-[16px] p-[16px_24px] overflow-visible relative"
          >
            {!children && (
              <div
                className="absolute top-[50%] right-[100%] mt-[-10px]"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderRight: "10px solid #FEF1DF  ",
                }}
              />
            )}
            {text}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

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
    getProducts,
    valid,
  } = useFilterStore((state: any) => state);
  const { goodsList, goodsListLoading, getGoodsList } = useGoodsStore(
    (state: any) => state
  );
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);
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

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFilter({ typeOfGoods: value });
  };

  const handleFocus = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (typeOfGoods.length >= 2 && open) {
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
      getProducts();
      if (main) router.push("/catalogue");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <RadioGroup
        onValueChange={(e) => {
          setFilter({
            deliveryBy: e,
            incoterms: incotermsList[e as DeliveryBy][0].name,
          });
        }}
        defaultValue={deliveryBy}
        className={`flex justify-center sm:justify-start custom-radio ${!main && "catalogue"} pb-5 sm:pb-0`}
      >
        <CustomRadioGroupItem value={DeliveryBy.plane} imageNumber={1} />
        <CustomRadioGroupItem value={DeliveryBy.ferry} imageNumber={2} />
        <CustomRadioGroupItem value={DeliveryBy.truck} imageNumber={3} />
      </RadioGroup>
      <div
        className={`bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] items-end p-[24px] mt-[10px] `}
      >
        <div className="sm:flex justify-stretch items-end w-full mb-[24px] sm:mb-[48px]">
          <div className="flex sm:w-[26%] items-end">
            <div className="mr-[1px] w-1/2">
              <label className="mb-2 block">From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="h-[60px] rounded-l-[16px] rounded-r-none border-none font-normal text-black w-full justify-start"
                  >
                    <ToolTipComponent asChild text={fromCountry}>
                      {fromCountry ? (
                        <span className="block w-full truncate">
                          {fromCountry}
                        </span>
                      ) : (
                        <span className="text-gray-500 block w-full truncate">
                          Select country
                        </span>
                      )}
                    </ToolTipComponent>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    {countriesListLoading ? (
                      <Loader />
                    ) : (
                      <ScrollArea className="h-72 w-full">
                        <CommandGroup>
                          {countriesList.map((country: any, index: number) => (
                            <CommandItem
                              value={`${country.value}`}
                              key={index}
                              onSelect={() => {
                                setFilter({ fromCountry: country.value });
                                getCitiesList(country.value);
                              }}
                            >
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="h-[60px] sm:rounded-none rounded-r-[16px] rounded-l-none  border-none font-normal text-black justify-start w-full"
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
                  <Command>
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
            className="mb-[-28px] block p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-[34px] h-[34px] mx-auto sm:mx-[-16px] sm:mb-[13px] relative z-10 hover:bg-transparent group"
          >
            <Image
              className="min-w-[34px] min-h-[34px] group-hover:hidden"
              width={34}
              height={34}
              alt="turn"
              src="/turn.svg"
            />
            <Image
              className="min-w-[34px] min-h-[34px] hidden group-hover:block"
              width={34}
              height={34}
              alt="turn"
              src="/turnhover.svg"
            />
          </Button>
          <div className="flex sm:w-[26%] items-end mb-5 sm:mb-0">
            <div className="mr-[1px] w-1/2">
              <label className="mb-2 block">To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="pl-[26px] h-[60px] sm:rounded-none rounded-l-[16px] rounded-r-none border-none font-normal text-black w-full justify-start"
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
                  <Command>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="h-[60px] w-full sm:rounded-none rounded-l-none rounded-r-[16px] border-none font-normal text-black justify-start"
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
                  <Command>
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
          <div className="flex sm:w-[24%]">
            <div className="mr-[1px] mb-5 sm:mb-0 w-1/2">
              <label className="mb-2 block">Departure</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="justify-start h-[60px] text-black font-normal sm:rounded-none rounded-l-[16px] rounded-r-none hover:bg-white border-0 w-full"
                  >
                    {departure ? (
                      format(departure, "MM/dd/yyyy")
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
            <div className="mr-[1px] mb-5 sm:mb-0 w-1/2">
              <label className="mb-2 block">Arrival</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="justify-start h-[60px] text-black font-normal sm:rounded-none hover:bg-white border-0 w-full rounded-r-[16px] rounded-l-none"
                  >
                    {arrival ? (
                      format(arrival, "MM/dd/yyyy")
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
          <div className="mr-[1px] sm:w-[24%] mb-5 sm:mb-0">
            <label className="mb-2 block">Type of goods</label>
            <Popover open={open}>
              <PopoverTrigger className="w-full">
                {/*<ToolTipComponent text={typeOfGoods}/>*/}
                <Input
                  className="h-[60px] rounded-[16px] sm:rounded-l-none sm:rounded-r-[16px]  border-none font-normal text-black w-full"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={() => setOpen(false)}
                  value={typeOfGoods}
                  placeholder="Type of goods"
                  // hint={typeOfGoods}
                />
                {/* </ToolTipComponent> */}
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
        </div>
        <div className="sm:flex justify-stretch items-end w-full">
          <div className="mr-[1px] mb-5 sm:mb-0 sm:w-[10%]">
            <label className="mb-2 block">Total KG</label>
            <Input
              className="h-[60px] rounded-[16px] sm:rounded-r-none sm:rounded-l-[16px] border-none font-normal text-black"
              type="number"
              placeholder="Total KG"
              min="1"
              value={totalKg}
              onChange={(e) => setFilter({ totalKg: e.target.value })}
            />
          </div>
          <div className="sm:w-[22%] flex">
            <div className="mr-[1px] mb-5 sm:mb-0 w-1/2">
              <label className="mb-2 block">Placement</label>
              <Select
                defaultValue={placementOfGoods}
                onValueChange={(e) => setFilter({ placementOfGoods: e })}
              >
                <SelectTrigger className="h-[60px] rounded-l-[16px] rounded-r-none sm:rounded-none border-none font-normal text-black">
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
            <div className="mr-[1px] mb-5 sm:mb-0 w-1/2">
              <label className="mb-2 block">Quantity</label>
              <Input
                className="h-[60px] rounded-l-none rounded-r-[16px] sm:rounded-none border-none font-normal text-black"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setFilter({ quantity: e.target.value })}
              />
            </div>
          </div>
          <div className="flex sm:w-[30%] mb-5 sm:mb-0">
            <div className="mr-[1px] sm:w-1/3">
              <label className="mb-2 block text-center sm:text-left">
                Length
              </label>
              <Input
                className="h-[60px] sm:rounded-none border-none rounded-r-none rounded-l-[16px] font-normal text-black"
                placeholder="Length"
                type="number"
                value={length}
                onChange={(e) => setFilter({ length: e.target.value })}
              />
            </div>
            <div className="mr-[1px] sm:w-1/3 ">
              <label className="mb-2 block text-center sm:text-left">
                Width
              </label>
              <Input
                value={width}
                className="h-[60px] rounded-none border-none font-normal text-black"
                placeholder="Width"
                type="number"
                onChange={(e) => setFilter({ width: e.target.value })}
              />
            </div>
            <div className="mr-[1px] sm:w-1/3">
              <label className="mb-2 block text-center sm:text-left">
                Height
              </label>
              <Input
                className="h-[60px] sm:rounded-none rounded-r-[16px] rounded-l-none border-none font-normal text-black"
                placeholder="Height"
                type="number"
                value={height}
                onChange={(e) => setFilter({ height: e.target.value })}
              />
            </div>
          </div>
          <div className="sm:w-[30%] flex">
            <div className="mr-[1px] w-1/2">
              <label className="mb-2 block text-center sm:text-left">
                Goods Value
              </label>
              <div className="flex text-black items-center bg-white font-normal pl-[12px] sm:rounded-none rounded-l-[16px] rounded-r-none">
                {selectedCurrency.symbol}
                <Input
                  className="h-[60px] sm:rounded-none rounded-r-[16px] rounded-l-none border-none font-normal text-black pl-[2px]"
                  placeholder="Goods Value"
                  type="number"
                  value={goodsValue}
                  onChange={(e) => setFilter({ goodsValue: e.target.value })}
                />
              </div>
            </div>
            <div className="mr-[1px] w-1/2 mb-5 sm:mb-0">
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
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ToolTipComponent asChild text="Please fill out all fields">
            <div className="sm:w-[10%] w-full">
              <UIButton
                type="submit"
                disabled={!valid}
                className="mt-5 sm:mt-0 ml-0 sm:ml-[4px] self-end h-[60px] rounded-[16px] w-full pointer-events-auto"
              >
                Explore
              </UIButton>
            </div>
          </ToolTipComponent>
        </div>
      </div>
    </form>
  );
}
