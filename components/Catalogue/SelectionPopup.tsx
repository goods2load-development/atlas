import CountryCode from '../common/CountryCode';
import { useFilterStore } from '@/lib/filterStore';
import { useUserStore } from '@/lib/store';
import { countVolume, postRequest } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface SelectionPopupProps {
  partnerCompany: string;
  carbonOffset: boolean;
}

function IsRequired() {
  return <i className="text-orangePrimary">*</i>;
}

export default function SelectionPopup(props: SelectionPopupProps) {
  const { user, getUser } = useUserStore((state: any) => state);
  const [step, setStep] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    deliveryBy,
    placementOfGoods,
    arrival,
    departure,
    goodsValue,
    from,
    fromCountry,
    to,
    toCountry,
    typeOfGoods,
    quantity,
    incoterms,
    width,
    length,
    totalKg,
    height,
  } = useFilterStore();
  const formSchema = z.object({
    countryCode: z.string(),
    phone: z
      .string()
      .regex(
        new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'),
      ),
    email: z.string().min(5).email(),
    companyName: z.string().min(2),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '',
      phone: '',
      email: '',
      companyName: '',
    },
  });

  useEffect(() => {
    if (!user?.id) getUser();
  }, [getUser, user?.id]);

  const onPostData = async (userData: any) => {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('login');
    postRequest({
      url: '/selected-routes',
      data: {
        ...userData,
        typeOfFreight: deliveryBy,
        goGreen: props.carbonOffset,
        from: `${fromCountry}, ${from}`,
        to: `${toCountry}, ${to}`,
        withdraw: departure,
        delivery: arrival,
        hsCode: typeOfGoods.match(/^\d+/)?.[0] || '',
        typeOfGoods: typeOfGoods,
        totalKg: Number(totalKg),
        placementOfGoods: placementOfGoods,
        quantity: Number(quantity),
        height: Number(height),
        width: Number(width),
        length: Number(length),
        volume: countVolume(Number(width), Number(length), Number(height)),
        partnerCompany: props.partnerCompany,
        goodsValue: Number(goodsValue),
        incoterms: incoterms,
        recaptchaToken: token,
      },
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onPostData({
      userCompany: values.companyName,
      userEmail: values.email,
      userPhone: values.countryCode + values.phone,

      // userCountry: '', // ?
      // userCity: '', // ?
      // userAddress: '', // ?
      // userPostalCode: '', // ?
    }).then(() => {
      setStep(1);
    });
  }
  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger
        onClick={() => {
          if (user?.id) {
            onPostData({
              userCompany: user.companyName,
              userEmail: user.email,
              userPhone: user.phoneNumber,
            });
          }
        }}
        asChild
      >
        <UIButton className="w-full md:w-[200px] rounded-lg">
          Get a free quotation
        </UIButton>
      </DialogTrigger>
      <DialogContent className="max-w-[632px] p-[48px_52px] overflow-auto max-h-screen">
        {!user?.id ? (
          <>
            <Form {...form}>
              <form
                className={`flex flex-col justify-between ${step !== 0 && 'hidden'}`}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <DialogHeader>
                  <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
                    Enter your <i className="font-normal">details</i>
                  </DialogTitle>
                  <p className="text-center text-[18px]/[26px]">
                    Please provide your email, company phone number and company
                    name below so we can contact you regarding your selection.
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
            <div className={`${step !== 1 && 'hidden'}`}>
              <DialogHeader className="mb-[42px]">
                <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
                  Your selection is being{' '}
                  <i className="font-normal">processed</i>
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
          </>
        ) : (
          <div>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
