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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UIButton from "@/components/common/Button";
import { useCountriesStore, useGoodsStore } from "@/lib/store";
import { useFilterStore } from "@/lib/filterStore";
import { useRouter, redirect, useSearchParams } from "next/navigation";

const placementOfGoods = [
  "Pallets",
  "Tanks",
  "Drums",
  "Big Bags",
  "ULDs",
  "Bulk Cargo",
  "Ro-Ro ",
  "Other",
];

function CustomRadioGroupItem({ value, imageNumber, main }: any) {
  return (
    <>
      <RadioGroupItem value={value} id={value} className="hidden" />
      <Label htmlFor={value}>
        <Image
          src={`/filtericon${imageNumber}.png`}
          alt="plane"
          width={58}
          height={58}
          className={main ? "cursor-pointer" : "cursor-pointer"}
        />
      </Label>
    </>
  );
}

export default function SearchMain({ main }: any) {
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
    getProducts,
  } = useFilterStore((state: any) => state);
  const { goodsList, goodsListLoading, getGoodsList } = useGoodsStore(
    (state: any) => state
  );
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
    setFilter({ fromCountry: values.toCountry });
    setFilter({ from: values.to });
    setFilter({ toCountry: values.fromCountry });
    setFilter({ to: values.from });
  }
  const debounce = useRef();
  const [open, setOpen] = useState(false);
  const handleChange = (e: any) => {
    const value = e.target.value;
    setFilter({ typeOfGoods: value });
  };
  const handleFocus = () => {
    console.log("focus");
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
    getProducts();
    if (main) router.push("/catalogue");
  }

  return (
    <form onSubmit={onSubmit}>
      <RadioGroup
        onValueChange={(e) => {
          setFilter({ deliveryBy: e });
        }}
        defaultValue={deliveryBy}
        className={`flex justify-center sm:justify-start custom-radio ${!main && "catalogue"} pb-5 sm:pb-0`}
      >
        <CustomRadioGroupItem value="plane" imageNumber={1} />
        <CustomRadioGroupItem value="ship" imageNumber={2} />
        <CustomRadioGroupItem value="truck" imageNumber={3} />
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
                    {fromCountry || "Select country"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    {countriesListLoading ? (
                      <Loader />
                    ) : (
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
                    {from || "Select city"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    {citiesListLoading ? (
                      <Loader />
                    ) : (
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
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button
            type="button"
            onClick={switchLocations}
            className="block mt-5 sm:mt-0 p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-[34px] h-[34px] mx-auto sm:mx-[-16px] sm:mb-[13px] relative z-10 hover:bg-transparent"
          >
            <Image
              className="min-w-[34px] min-h-[34px]"
              width={34}
              height={34}
              alt="turn"
              src="/turn.png"
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
                    className="h-[60px] sm:rounded-none rounded-l-[16px] rounded-r-none border-none font-normal text-black w-full justify-start"
                  >
                    {toCountry || "Select country"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    {countriesListLoading ? (
                      <Loader />
                    ) : (
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
                    {to || "Select city"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>Not found.</CommandEmpty>
                    {citiesListToLoading ? (
                      <Loader />
                    ) : (
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
                      format(departure, "mm/dd/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departure}
                    onSelect={(e) => setFilter({ departure: e })}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
                      format(arrival, "mm/dd/yyyy")
                    ) : (
                      <span>Pick a date</span>
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
                <Input
                  className="h-[60px] sm:rounded-l-none sm:rounded-r-[16px]  border-none font-normal text-black w-full"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={() => setOpen(false)}
                  value={typeOfGoods}
                  placeholder="Type of goods"
                />
              </PopoverTrigger>
              <PopoverContent
                className="sm:w-[200px] p-0 "
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Command>
                  {goodsListLoading ? (
                    <Loader />
                  ) : goodsList.length ? (
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
                  ) : (
                    <CommandEmpty>Not found.</CommandEmpty>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="sm:flex justify-stretch items-end w-full">
          <div className="mr-[1px] mb-5 sm:mb-0 sm:w-[12%]">
            <label className="mb-2 block">Total KG</label>
            <Input
              className="h-[60px] sm:rounded-r-none sm:rounded-l-[16px] border-none font-normal text-black"
              type="number"
              placeholder="Total KG"
              onChange={(e) => setFilter({ totalKg: e })}
            />
          </div>
          <div className="mr-[1px] mb-5 sm:mb-0 sm:w-[20%]">
            <label className="mb-2 block">Placement of goods</label>
            <Select defaultValue="Pallets">
              <SelectTrigger className="h-[60px] sm:rounded-none border-none font-normal text-black">
                <SelectValue placeholder="Placement of goods" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {placementOfGoods.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-[1px] mb-5 sm:mb-0 sm:w-[20%]">
            <label className="mb-2 block">Quantity of placement</label>
            <Input
              className="h-[60px] sm:rounded-none border-none font-normal text-black"
              type="number"
              placeholder="Quantity of placement"
              onChange={(e) => setFilter({ pallets: e })}
            />
          </div>
          <div className="flex sm:w-[27%] mb-5 sm:mb-0">
            <div className="mr-[1px] sm:w-1/3">
              <label className="mb-2 block text-center sm:text-left">
                Length
              </label>
              <Input
                className="h-[60px] sm:rounded-none border-none rounded-r-none rounded-l-[16px] font-normal text-black"
                placeholder="Length"
                type="number"
                onChange={(e) => setFilter({ length: e })}
              />
            </div>
            <div className="mr-[1px] sm:w-1/3 ">
              <label className="mb-2 block text-center sm:text-left">
                Width
              </label>
              <Input
                className="h-[60px] rounded-none border-none font-normal text-black"
                placeholder="Width"
                onChange={(e) => setFilter({ width: e })}
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
                onChange={(e) => setFilter({ height: e })}
              />
            </div>
          </div>
          <div className="mr-[1px] sm:w-[12%] mb-5 sm:mb-0 flex bg-white sm:rounded-r-[16px] rounded">
            <Select
              defaultValue="FCL"
              onValueChange={(e) => setFilter({ containerLoad: e })}
            >
              <SelectTrigger className="h-[60px] sm:rounded-none border-none font-normal text-black">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="FCL">FCL</SelectItem>
                  <SelectItem value="LCL">LCL</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="rounded-full border-[1px] w-[20px] h-[20px] border-[#FFC1A2] text-[#FFC1A2] mr-[10px]">
                    i
                  </p>
                </TooltipTrigger>
                <TooltipContent className="text-[14px]/[18px] font-normal bg-[#FFC1A2] rounded-[16px] p-[16px_24px] overflow-visible relative">
                  <div
                    className="absolute top-[100%] left-[50%] ml-[-15px]"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "20px solid #FFC1A2",
                    }}
                  />
                  FCL (Full Container Load)
                  <br />
                  LCL (Less than Container Load)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <UIButton
            type="submit"
            className="mt-5 sm:mt-0 ml-0 sm:ml-[4px] self-end h-[60px] rounded-[16px] w-full sm:w-[9%]"
          >
            Explore
          </UIButton>
        </div>
      </div>
    </form>
  );
}
