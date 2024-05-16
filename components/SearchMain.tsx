"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useCountriesStore } from "@/lib/store";
import { useRouter, redirect, useSearchParams } from "next/navigation";

function CustomRadioGroupItem({ value, imageNumber }: any) {
  return (
    <>
      <RadioGroupItem
        value={value}
        id={value}
        className="hidden"
      />
      <Label htmlFor={value}>
        <Image
          src={`/filtericon${imageNumber}.png`}
          alt="plane"
          width={58}
          height={58}
          className="cursor-pointer"
        />
      </Label>
    </>
  );
};

function GetValuesFromQuery(searchParams) {
  const defaults = {
    deliveryBy: "plane",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    typeOfGoods: "",
    totalKg: "",
    pallets: "",
    measurements: "",
    type: "",
  };
}

export default function SearchMain({ main }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { citiesList, getCountriesList } = useCountriesStore(
    (state: any) => state
  );
  useEffect(() => {
    // if (!citiesList.length) getCountriesList();
    console.log("search", searchParams);
  }, [searchParams]);
  const formSchema = z.object({
    deliveryBy: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
    departure: z.date({
      required_error: "A date is required.",
    }).optional(),
    arrival: z.date({
      required_error: "A date is required.",
    }).optional(),
    typeOfGoods: z.string().optional(),
    totalKg: z.string().optional(),
    pallets: z.number().optional(),
    measurements: z.string().optional(),
    type: z.string().optional(),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    if (main) {
      // return redirect("/account");
      router.push("/account?");
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryBy: "plane",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="deliveryBy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex custom-radio"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <CustomRadioGroupItem value="plane" imageNumber={1} />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <CustomRadioGroupItem value="ship" imageNumber={2} />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <CustomRadioGroupItem value="truck" imageNumber={3} />
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex bg-[#ffede4] mt-[10px] mr-[5px] p-[24px] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720]">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="mr-1 max-w-32">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="rounded-l-xl rounded-r-none border-none font-normal text-black"
                      >
                        {field.value
                          ? citiesList.find(
                              (city: string) => city === field.value
                            )
                          : "Select"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {/* {citiesList.map((city: string) => (
                          <CommandItem
                            value={city}
                            key={city}
                            onSelect={() => {
                              form.setValue("from", city);
                            }}
                          >
                            {city}
                          </CommandItem>
                        ))} */}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormControl>
                  <Input
                    className="rounded-l-xl rounded-r-none border-none font-normal text-black"
                    {...field}
                  />
                </FormControl> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" className="p-0 rounded-full border-0 bg-transparent w-[34px] h-[34px] mt-8 mx-[-13px] relative z-10 hover:bg-none">
            <Image width={34} height={34} alt="turn" src="/turn.png"/>
          </Button>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="mr-1 max-w-32">
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border-none font-normal text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem className=" max-w-32 mr-[1px]">
                <FormLabel>Departure</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        type="button"
                        className="text-black font-normal rounded-none hover:bg-white border-0 w-full"
                      >
                        {field.value ? (
                          format(field.value, "mm/dd/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrival"
            render={({ field }) => (
              <FormItem className="mr-[1px] max-w-32">
                <FormLabel>Arrival</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        type="button"
                        className="text-black font-normal rounded-none hover:bg-white border-0 w-full"
                      >
                        {field.value ? (
                          format(field.value, "mm/dd/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeOfGoods"
            render={({ field }) => (
              <FormItem className="mr-[1px]">
                <FormLabel>Type of goods</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalKg"
            render={({ field }) => (
              <FormItem className="mr-[1px] max-w-24">
                <FormLabel>Total KG</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border-none font-normal text-black"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pallets"
            render={({ field }) => (
              <FormItem className="mr-[1px] max-w-24">
                <FormLabel>Pallets</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border-none"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="measurements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>L*W*H</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-l-none rounded-r-xl border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="self-end mb-[10px] rounded-full bg-orangePrimary w-[98px] h-[98px] border-2 border-white font-medium text-[20px]/[24px]"
        >
          Explore
        </Button>
      </form>
    </Form>
  );
}
