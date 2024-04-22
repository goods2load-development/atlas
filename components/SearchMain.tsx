"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
const formSchema = z.object({
  temp: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}
function onChange(values: z.infer<typeof formSchema>) {
  console.log(values);
  return values;
}

export default function SearchMain() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temp: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="temp"
          render={({ field }) => (
            <div>
              <RadioGroup
                defaultValue="option-one"
                className="flex custom-radio"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-one"
                    id="option-one"
                    className="hidden"
                  />
                  <Label htmlFor="option-one">
                    <Image
                      src="/filtericon1.svg"
                      alt="Goods2load Logo"
                      width={58}
                      height={58}
                    />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-two"
                    id="option-two"
                    className="hidden"
                  />
                  <Label htmlFor="option-two">
                    <Image
                      src="/filtericon2.svg"
                      alt="Goods2load Logo"
                      width={58}
                      height={58}
                    />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="option-three"
                    id="option-three"
                    className="hidden"
                  />
                  <Label htmlFor="option-three">
                    <Image
                      src="/filtericon3.svg"
                      alt="Goods2load Logo"
                      width={58}
                      height={58}
                    />
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex bg-[#ffede4] mt-[10px] mr-[5px] p-[24px] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720]">
                <FormItem className="mr-[1px]">
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-l-xl rounded-r-none border-none mr-[3px]"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>Departure</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>Arrival</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>Type of goods</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>Total KG</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="mr-[1px]">
                  <FormLabel>Pallets</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>L*W*H</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-l-none rounded-r-xl border-none"
                      placeholder="temp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>
          )}
        />
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
