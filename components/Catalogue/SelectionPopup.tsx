import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postRequest } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UIButton from "@/components/common/Button";
import { useFilterStore } from "@/lib/filterStore";
import CountryCode from "../common/CountryCode";

interface SelectionPopupProps {
  orderId: string;
  company: string;
  withdraw: string;
  delivery: string;
  portArrival: string;
  portDeparture: string;
  price: string;
  placementOfGoods: string;
}

function IsRequired() {
  return <i className="text-orangePrimary">*</i>;
}

export default function SelectionPopup(props: SelectionPopupProps) {
  const {deliveryBy} = useFilterStore(); // required field for BE
  const [step, setStep] = useState(0);
  const formSchema = z.object({
    countryCode: z.string(),
    phone: z
      .string()
      .regex(
        new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$")
      ),
    email: z.string().min(5).email(),
    companyName: z.string().min(2),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "",
      phone: "",
      email: "",
      companyName: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {

    postRequest({
      url: "orders/select-catalog",
      data: {
        orderId: props.orderId,
        transportation: deliveryBy,
        customerPhone: values.countryCode + values.phone,
        customerEmail: values.email,
        company: values.companyName,
        fromCompany: props.company,
        withdraw: props.withdraw,
        delivery: props.delivery,
        portArrival: props.portArrival,
        portDeparture: props.portDeparture,
        price: props.price, 
        placementOfGoods: props.placementOfGoods
      },
    }).then(() => {
      setStep(1);
    });
  }
  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger asChild>
        <UIButton className="rounded-none w-full md:w-[200px]">Select</UIButton>
      </DialogTrigger>
      <DialogContent className="max-w-[632px] p-[48px_52px] overflow-auto max-h-screen">
        <Form {...form}>
          <form
            className={`flex flex-col justify-between ${step !== 0 && "hidden"}`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
                Enter your <i className="font-normal">details</i>
              </DialogTitle>
              <p className="text-center text-[18px]/[26px]">
                Please provide your email, company phone number and company name
                below so we can contact you regarding your selection.
              </p>
            </DialogHeader>
            <div className="flex gap-2 mt-[32px]">
              <div>
                <label className="text-[14px]">
                  Company phone number
                  <IsRequired />
                </label>
                <div className="flex mt-2 gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-4/12">
                        <FormControl>
                          <CountryCode
                            onChange={field.onChange}
                            className="border-none bg-gray-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            className="border-none bg-gray-2"
                            placeholder="0000000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <label className="text-[14px]">
                      Email
                      <IsRequired />
                    </label>
                    <FormControl>
                      <Input
                        className="border-none bg-gray-2"
                        placeholder="email@abcd.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="mt-[16px]">
                  <label className="text-[14px]">
                    Company name
                    <IsRequired />
                  </label>
                  <FormControl>
                    <Input
                      className="border-none bg-gray-2"
                      placeholder="ABCD FZ LLC"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UIButton className="mx-auto mt-[40px] w-[184px]" type="submit">
              Send
            </UIButton>
          </form>
        </Form>
        <div className={`${step !== 1 && "hidden"}`}>
          <DialogHeader className="mb-[42px]">
            <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
              Your selection is being <i className="font-normal">processed</i>
            </DialogTitle>
            <p className="text-center text-[18px]/[26px]">
              We will contact you at the provided contact details.
              <br /> Thank you!
            </p>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <UIButton className="mx-auto  w-[184px]">I got it</UIButton>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
