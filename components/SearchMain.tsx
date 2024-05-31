"use client";
import React, { useEffect, useState, useMemo } from "react";
// import debouce from "lodash.debounce";

import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
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
    citiesList,
    citiesListTo,
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
  const { goodsList, getGoodsList } = useGoodsStore((state: any) => state);
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
  function onSubmit() {
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
        <div className="flex items-center space-x-2">
          <CustomRadioGroupItem value="plane" imageNumber={1} />
        </div>
        <div className="flex items-center space-x-2">
          <CustomRadioGroupItem value="ship" imageNumber={2} />
        </div>
        <div className="flex items-center space-x-2">
          <CustomRadioGroupItem value="truck" imageNumber={3} />
        </div>
      </RadioGroup>
      <div
        className={`flex bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] ${main ? "p-[24px] mt-[10px] mr-[5px] items-end" : "items-center ml-[8px]"}`}
      >
        <div className="mr-1 max-w-32">
          {main && <label>From</label>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="rounded-l-xl rounded-r-none border-none font-normal text-black w-full"
              >
                {fromCountry || "Select country"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  {countriesList.map((country: any, index: number) => (
                    <CommandItem
                      value={`${country.value}`}
                      key={index}
                      onSelect={() => {
                        setFilter("fromCountry", country.value);
                        getCitiesList(country.value);
                      }}
                    >
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mr-1 max-w-32">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="rounded-none border-none font-normal text-black"
              >
                {from || "Select city"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  {citiesList.map((item: any, index: number) => (
                    <CommandItem
                      value={`${item.value}`}
                      key={index}
                      onSelect={() => {
                        setFilter("from", item.label);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          type="button"
          onClick={switchLocations}
          className="p-0 rounded-full border-0 bg-transparent w-[34px] h-[34px] mt-8 mx-[-13px] relative z-10 hover:bg-transparent"
        >
          <Image width={34} height={34} alt="turn" src="/turn.png" />
        </Button>
        <div className="mr-1 max-w-32">
          {main && <label>To</label>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="rounded-l-xl rounded-r-none border-none font-normal text-black w-full"
              >
                {toCountry || "Select country"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>Not found.</CommandEmpty>
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
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mr-1 max-w-32">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="rounded-none border-none font-normal text-black"
              >
                {to || "Select city"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>Not found.</CommandEmpty>
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
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className=" max-w-32 mr-[1px]">
          {main && <label>Departure</label>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                type="button"
                className="text-black font-normal rounded-none hover:bg-white border-0 w-full"
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
                className="text-black font-normal rounded-none hover:bg-white border-0 w-full"
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
        {/* <FormField
            control={form.control}
            name="typeOfGoods"
            render={({ field }) => (
              <div className="mr-[1px]">
                <label>Type of goods</label>
                
                  <Input className="rounded-none border-none" {...field} />
                
                
              </div>
            )}
          /> */}
        <div className="mr-1 max-w-32">
          {main && <label>Type of goods</label>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="rounded-none border-none font-normal text-black truncate w-32"
              >
                {typeOfGoods || "Select type of goods"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  // onChangeCapture={debouncedResults}
                  onChangeCapture={handleChange}
                  placeholder="Search..."
                />
                <CommandEmpty>Not found.</CommandEmpty>
                {goodsList.length && (
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
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mr-[1px] max-w-24">
          {main && <label>Total KG</label>}
          <Input
            className="rounded-none border-none font-normal text-black"
            type="number"
            onChange={(e) => setFilter({ totalKg: e })}
          />
        </div>
        <div className="mr-[1px] max-w-24">
          {main && <label>Pallets</label>}
          <Input
            className="rounded-none border-none"
            type="number"
            onChange={(e) => setFilter({ pallets: e })}
          />
        </div>
        <div>
          {main && <label>L*W*H</label>}
          <Input
            className="rounded-l-none rounded-r-xl border-none"
            onChange={(e) => setFilter({ measurements: e })}
          />
        </div>
      </div>
      {main && (
        <Button
          type="button"
          // onClick
          className="self-end mb-[10px] rounded-full bg-orangePrimary w-[98px] h-[98px] border-2 border-white font-medium text-[20px]/[24px]"
        >
          Explore
        </Button>
      )}
    </form>
  );
}
