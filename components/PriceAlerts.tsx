"use client";
import React, { useEffect, useState } from "react";
import { useCountriesStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UIButton from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/utils";

export default function PriceAlerts() {
  const [step, setStep] = useState(0);
  const formSchema = z.object({
    routes: z.array(
      z.object({
        fromCountry: z.string().optional(),
        from: z.string().optional(),
        toCountry: z.string().optional(),
        to: z.string().optional(),
        price: z.string().optional(),
      })
    ),
    email: z.string().optional(),
    sms: z.string().optional(),
  });
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routes: [{ fromCountry: "", from: "", toCountry: "", to: "", price: "" }],
      email: "",
      sms: "",
    },
  });
  const { control, register } = form;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "routes",
    rules: {
      minLength: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postRequest({
      url: "alerts/price",
      data: {
        contacts: {
          email: values.email?.length ? values.email : undefined,
          phoneNumber: values.sms?.length ? values.sms : undefined,
        },
        routes: values.routes.map((item) => ({
          fromRoute: `${item.fromCountry} ${item.from}`,
          toRoute: `${item.toCountry} ${item.to}`,
          price: item.price ? parseInt(item.price) : 0,
        })),
      },
    }).then(() => {
      setStep(3);
    });
  }
  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });

  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger asChild>
        <UIButton className="w-[44px] h-[44px] sm:w-full sm:h-auto px-1">
          <img src="/ringwhite.svg" />
          <span className="hidden sm:inline">Price alerts</span>
        </UIButton>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[365px] pt-[48px] px-1 sm:px-[66px] overflow-auto max-h-screen ${
          step === 3
            ? "sm:max-w-[632px] pb-[32px] "
            : "sm:max-w-[768px] p-[32px]"
        }`}
      >
        <Form {...form}>
          <form
            className={`flex flex-col justify-between ${step === 3 && "hidden"}`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <DialogHeader
                className={`sm:min-h-[500px] ${step !== 0 && "hidden"}`}
              >
                <DialogTitle className="text-center text-[40px]/[48px] font-light">
                  <Image
                    src={"/ring.svg"}
                    className="filter grayscale contrast-200 mx-auto"
                    alt=""
                    width={54}
                    height={54}
                  />
                  Get price <i className="font-normal">alerts</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[18px]/[26px]">
                  You can opt to receive notifications whenever a specific route
                  becomes available at your desired price point. To enable this
                  feature, simply click the button below to add the routes you
                  are interested in.
                </DialogDescription>
              </DialogHeader>
              <div className={step === 1 ? "sm:min-h-[572px]" : "hidden"}>
                <DialogTitle className="text-center text-[40px]/[48px] font-light">
                  Desired <i className="font-normal">routes</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[18px]/[26px]">
                  You can select up to 10 routes that interest you and set price
                  alerts for them.
                </DialogDescription>
                <div className="flex flex-wrap text-[12px]/[18px] opacity-50 mt-[40px] mb-[4px]">
                  <div className="ml-[32px] w-[180px]">FROM</div>
                  <div className="ml-[54px] w-[180px]">TO</div>
                  <div className="ml-[10px]">PRICE ($)</div>
                </div>
                {fields.map((item, index) => (
                  <div
                    className="flex flex-wrap items-center mb-[8px] w-full"
                    key={index}
                  >
                    <div className="w-[22px]">
                      {index < 9 && "0"}
                      {index + 1}
                    </div>
                    <div className="mx-[10px] w-[240px]">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className=" truncate h-[44px] rounded-l-[8px] rounded-r-none px-1 border-none font-normal text-black bg-[#ffede4] whitespace-nowrap w-1/2 text-left"
                          >
                            {item.fromCountry || "Country"}
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
                                {countriesList.map(
                                  (country: any, i: number) => (
                                    <CommandItem
                                      value={`${country.value}`}
                                      key={i}
                                      onSelect={() => {
                                        update(index, {
                                          ...item,
                                          fromCountry: country.value,
                                        });
                                        getCitiesList(country.value);
                                      }}
                                    >
                                      {country.label}
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="h-[44px] rounded-l-none rounded-r-[8px] border-none font-normal text-black bg-[#ffede4] overflow-hidden w-1/2"
                          >
                            {item.from || "City"}
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
                                {citiesList.map((city: any, i: number) => (
                                  <CommandItem
                                    value={`${city.value}`}
                                    key={i}
                                    onSelect={() => {
                                      update(index, {
                                        ...item,
                                        from: city.value,
                                      });
                                    }}
                                  >
                                    {city.label}
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
                      // onClick={switchLocations}
                      className="p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-[34px] h-[34px] relative z-10 hover:bg-transparent"
                    >
                      <Image
                        className="min-w-[34px] min-h-[34px]"
                        width={34}
                        height={34}
                        alt="turn"
                        src="/turn.png"
                      />
                    </Button>
                    <div className="mx-[10px] w-[240px]">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="h-[44px] rounded-l-[8px] rounded-r-none border-none font-normal text-black bg-[#ffede4] w-1/2"
                          >
                            {item.toCountry || "Country"}
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
                                {countriesList.map(
                                  (country: any, index: number) => (
                                    <CommandItem
                                      value={`${country.value}`}
                                      key={index}
                                      onSelect={() => {
                                        // setFilter({ fromCountry: country.value });
                                        getCitiesList(country.value);
                                      }}
                                    >
                                      {country.label}
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="p-0 text-left h-[44px] rounded-l-none rounded-r-[8px] border-none font-normal text-black bg-[#ffede4] w-1/2 truncate"
                          >
                            {item.to || "City"}
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
                                      // setFilter({ from: item.label });
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
                    <Input
                      className="h-[44px] rounded-[8px] border-[1px] border-orangePrimary text-center w-[90px]"
                      defaultValue={item.price}
                      {...register(`routes.${index}.price` as const)}
                    />
                    <div
                      onClick={() => remove(index)}
                      className={`ml-[10px] rounded-full border-2 border-orangePrimary text-orangePrimary min-w-[20px] w-[20px] min-h-[20px] h-[20px] text-center text-[18px]/[20px] cursor-pointer ${index === 0 && "hidden"}`}
                    >
                      -
                    </div>
                  </div>
                ))}
                <div className="flex mt-[16px]">
                  {fields.length <= 9 && (
                    <div
                      onClick={() =>
                        append({
                          fromCountry: "",
                          from: "",
                          toCountry: "",
                          to: "",
                          price: "",
                        })
                      }
                      className="rounded-full border-2 border-orangePrimary text-orangePrimary w-[20px] h-[20px] text-center text-[18px]/[20px] cursor-pointer mr-[8px]"
                    >
                      +
                    </div>
                  )}
                  Add a route ({fields.length}/10)
                </div>
              </div>
              <div className={step === 2 ? "sm:min-h-[572px]" : "hidden"}>
                <DialogTitle className="text-center text-[40px]/[48px] font-light">
                  <Image src={""} alt="" width={20} height={20} />
                  Contact <i className="font-normal">information</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[18px]/[26px]">
                  Choose how you want to receive notifications (email or SMS)
                  and share your contact information for this.
                </DialogDescription>
                <Tabs
                  defaultValue="email"
                  className="w-full max-w-[396px] mx-auto mt-[44px]"
                >
                  <TabsList className="grid w-[290px] grid-cols-2 mx-auto mb-[28px]">
                    <TabsTrigger
                      className={`data-[state="active"]:bg-[#ffede4] border-b-2 data-[state="active"]:border-orangePrimary rounded-none"}`}
                      value="email"
                    >
                      Email
                    </TabsTrigger>
                    <TabsTrigger
                      value="sms"
                      className={`data-[state="active"]:bg-[#ffede4] border-b-2 data-[state="active"]:border-orangePrimary rounded-none"}`}
                    >
                      SMS
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="email">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mr-3 w-full">
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              className="text-center border-orangePrimary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="sms">
                    <FormField
                      control={form.control}
                      name="sms"
                      render={({ field }) => (
                        <FormItem className="mr-3 w-full">
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              className="text-center border-orangePrimary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            {step !== 3 && (
              <div className="sm:flex justify-between items-center pt-5 space-y-5">
                <div className="flex space-x-1 order-2 justify-center w-full">
                  <div
                    className={`shadow-2xl rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 0 ? "opacity-100" : "opacity-50"}`}
                  />
                  <div
                    className={`shadow-sm rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 1 ? "opacity-100" : "opacity-50"}`}
                  />
                  <div
                    className={`shadow-sm rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 2 ? "opacity-100" : "opacity-50"}`}
                  />
                </div>
                <UIButton
                  secondary
                  onClick={() => setStep(step - 1)}
                  className={`w-full sm:max-w-40 ${step === 0 ? "hidden sm:block invisible" : ""}`}
                >
                  Previous step
                </UIButton>
                <UIButton
                  className="w-full sm:max-w-40 order-3"
                  type="submit"
                  onClick={(e: any) => {
                    console.log("submit");
                    if (step !== 2) {
                      console.log("step");
                      e.preventDefault();
                      setStep(step + 1);
                    }
                    return e;
                  }}
                >
                  Next step
                </UIButton>
              </div>
            )}
          </form>
        </Form>
        <div className={`${step !== 3 && "hidden"}`}>
          <DialogHeader className="mb-[42px]">
            <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
              Thank <i className="font-normal">you!</i>
            </DialogTitle>
            <DialogDescription className="text-center">
              Rest assured that once your desired route reaches the price you
              are looking for, our team will promptly notify you, ensuring you
              never miss out on a great deal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <UIButton className="mx-auto">Explore other offers</UIButton>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
