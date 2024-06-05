"use client";
import React, { useEffect, useState, useMemo } from "react";
// import debouce from "lodash.debounce";

import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCountriesStore, useGoodsStore } from "@/lib/store";
import { useFilterStore } from "@/lib/filterStore";
import { useRouter, redirect, useSearchParams } from "next/navigation";

function Loader() {
  return (
    <div className="p-2">
      <Skeleton className="h-3 w-full bg-gray-300" />
      <Skeleton className="h-3 w-[85%] bg-gray-300 my-1" />
      <Skeleton className="h-3 w-[95%] bg-gray-300" />
    </div>
  );
}

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
  const handleChange = (e: any) => {
    getGoodsList(e.target.value);
  };
  // const debouncedResults = useMemo(() => {
  //   return debouce(handleChange, 500);
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     debouncedResults.cancel();
  //   };
  // });

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
  function onSubmit(e: any) {
    e.preventDefault();
    router.push("/catalogue");
  }

  return (
    <form onSubmit={onSubmit} className={!main ? "flex items-center" : ""}>
      <RadioGroup
        onValueChange={(e) => {
          setFilter({ deliveryBy: e });
        }}
        defaultValue={deliveryBy}
        className={`flex custom-radio ${!main && "catalogue"}`}
      >
        <CustomRadioGroupItem value="plane" imageNumber={1} />
        <CustomRadioGroupItem value="ship" imageNumber={2} />
        <CustomRadioGroupItem value="truck" imageNumber={3} />
      </RadioGroup>
      <div className="flex">
        <div
          className={`flex justify-stretch bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] items-end ${main ? "p-[24px] mt-[10px] mr-[5px]" : "ml-[8px]"}`}
        >
          <div className="mr-[1px] max-w-32">
            {main && <label>From</label>}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="h-[60px] rounded-l-xl rounded-r-none border-none font-normal text-black w-full justify-start"
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
          <div className="max-w-32">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="h-[60px] rounded-none border-none font-normal text-black justify-start"
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
          <Button
            type="button"
            onClick={switchLocations}
            className="p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-[34px] h-[34px] mx-[-16px] mb-[13px] relative z-10 hover:bg-transparent"
          >
            <Image
              className="min-w-[34px] min-h-[34px]"
              width={34}
              height={34}
              alt="turn"
              src="/turn.png"
            />
          </Button>
          <div className="mr-[1px] max-w-32">
            {main && <label>To</label>}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="h-[60px] rounded-none border-none font-normal text-black w-full justify-start"
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
          <div className="mr-[1px] max-w-32">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="h-[60px] rounded-none border-none font-normal text-black justify-start"
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
          <div className="mr-[1px] max-w-32">
            {main && <label>Departure</label>}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-[60px] text-black font-normal rounded-none hover:bg-white border-0 w-full"
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
          <div className="mr-[1px] max-w-32">
            {main && <label>Arrival</label>}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  type="button"
                  className="h-[60px] text-black font-normal rounded-none hover:bg-white border-0 w-full"
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
          <div className="mr-[1px] max-w-40">
            {main && <label>Type of goods</label>}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="h-[60px] rounded-none border-none font-normal text-black truncate w-full"
                >
                  <span className="text-ellipsis whitespace-no-wrap overflow-hidden block w-full">
                    {typeOfGoods || "Select type of goods"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    // onChangeCapture={debouncedResults}
                    onChangeCapture={handleChange}
                    placeholder="Search..."
                  />
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
          <div className="mr-[1px] max-w-24">
            {main && <label>Total KG</label>}
            <Input
              className="h-[60px] rounded-none border-none font-normal text-black"
              type="number"
              onChange={(e) => setFilter({ totalKg: e })}
            />
          </div>
          <div className="mr-[1px] max-w-24">
            {main && <label>Pallets</label>}
            <Input
              className="h-[60px] rounded-none border-none"
              type="number"
              onChange={(e) => setFilter({ pallets: e })}
            />
          </div>
          <div className="mr-[1px] max-w-20">
            {main && <label>L*W*H</label>}
            <Input
              className="h-[60px] rounded-none border-none"
              onChange={(e) => setFilter({ measurements: e })}
            />
          </div>
          <div className="mr-[1px] max-w-20">
            <Input
              className="h-[60px] rounded-none border-none"
              onChange={(e) => setFilter({ measurements: e })}
            />
          </div>
          <div className="max-w-20">
            <Input
              className="h-[60px] rounded-l-none rounded-r-xl border-none"
              onChange={(e) => setFilter({ measurements: e })}
            />
          </div>
        </div>
        {main && (
          <Button
            type="submit"
            // onClick
            className="self-end mb-[10px] rounded-full bg-orangePrimary w-[98px] h-[98px] border-2 border-white font-medium text-[20px]/[24px]"
          >
            Explore
          </Button>
        )}
      </div>
    </form>
  );
}
