'use client';

import { IsRequired } from './Registration/Registration';
import CountryCode from './common/CountryCode';
import { Textarea } from './ui/textarea';
import { ToolTipComponent } from './ui/tooltip';
import { useToast } from './ui/use-toast';
import RingIcon from '@/assets/icons/ring.svg';
import TurnIcon from '@/assets/icons/turn.svg';
import TurnHover from '@/assets/icons/turnhover.svg';
import { useFilterStore } from '@/lib/filterStore';
import CaptchaProvider from '@/lib/providers/CaptchaProvider';
import { useCountriesStore, useUserStore } from '@/lib/store';
import { postRequest } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { BellRing } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import UIButton from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = (isLoggedIn: boolean) =>
  z.object({
    routes: z.array(
      z.object({
        fromCountry: z.string().optional(),
        from: z.string().optional(),
        toCountry: z.string().optional(),
        to: z.string().optional(),
      }),
    ),
    countryCode: isLoggedIn ? z.optional(z.string()) : z.string().min(1),
    phone: isLoggedIn ? z.optional(z.string()) : z.string(),
    email: isLoggedIn ? z.optional(z.string()) : z.string().min(5).email(),
    companyName: isLoggedIn ? z.optional(z.string()) : z.string().min(2),
    message: z.string().min(2),
  });

function SolutionFinder({ isPulseAnimation }: { isPulseAnimation?: boolean }) {
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
  const [step, setStep] = useState(0);
  const { user } = useUserStore((state: any) => state);
  const isLoggedIn = !!Object.values(user).length;

  const {
    countriesList,
    countriesListLoading,
    citiesList,
    citiesListLoading,
    getCountriesList,
    getCitiesList,
  } = useCountriesStore((state: any) => state);
  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(isLoggedIn)),
    defaultValues: {
      routes: [
        {
          fromCountry,
          from,
          toCountry,
          to,
        },
      ],
      email: '',
      countryCode: '',
      phone: '',
      companyName: '',
      message: '',
    },
  });
  const { control, register, watch } = form;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'routes',
    rules: {
      minLength: 1,
    },
  });

  const { toast } = useToast();

  const isFieldsFilled = () => {
    const currentRoute = fields.slice(-1)[0];

    return (
      currentRoute?.from &&
      currentRoute.fromCountry &&
      currentRoute.to &&
      currentRoute.toCountry
    );
  };

  const isSearchFilled = () => {
    return (
      Boolean(length) &&
      Boolean(width) &&
      Boolean(height) &&
      Boolean(goodsValue) &&
      Boolean(typeOfGoods) &&
      Boolean(placementOfGoods) &&
      Boolean(quantity) &&
      Boolean(totalKg) &&
      Boolean(incoterms) &&
      Boolean(departure) &&
      Boolean(arrival)
    );
  };

  async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('login');
    postRequest({
      url: 'alerts/price',
      data: {
        contacts: {
          phone: isLoggedIn
            ? user.phoneNumber
            : `${(values as any).countryCode}${(values as any).phone}`,
          email: isLoggedIn ? user.email : values.email,
          companyName: isLoggedIn ? user.companyName : values.companyName,
        },
        message: values.message,
        routes: values.routes.map((item) => ({
          deliveryBy,
          fromRoute: `${item.fromCountry}, ${item.from}`,
          toRoute: `${item.toCountry}, ${item.to}`,
          arrival,
          departure,
          goodsValue,
          typeOfGoods,
          placementOfGoods,
          quantity,
          totalKg,
          incoterms,
          width,
          length,
          height,
        })),
        recaptchaToken: token,
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
        <UIButton
          className={clsx(
            'w-full px-1',
            isPulseAnimation && 'animate-button-ping transition-shadow',
          )}
        >
          <BellRing />
          Solution Finder
        </UIButton>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[465px] pt-[48px] px-1 overflow-auto max-h-screen sm:pl-10 ${
          step === 3
            ? 'sm:max-w-[632px] pb-[32px] sm:pl-8 px-8'
            : 'sm:max-w-[632px] p-[32px]'
        }`}
      >
        <Form {...form}>
          <form
            className={`flex flex-col justify-between ${step === 3 && 'hidden'} ${step === 2 ? 'h-[594px] md:h-[424px]' : null}`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <DialogHeader
                className={`sm:min-h-[300px] ${step !== 0 && 'hidden'} items-center`}
              >
                <DialogTitle className="text-center text-[40px]/[48px] font-light">
                  <Image
                    src={RingIcon}
                    className="filter grayscale contrast-200 mx-auto mb-8"
                    alt=""
                    width={54}
                    height={54}
                  />
                  Get a Solution <i className="font-normal">finder</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[18px]/[26px] pt-3 max-w-[504px]">
                  You can opt to receive notifications whenever a specific
                  solution becomes available. To enable this feature, simply
                  click the button below to add the solution you are interested
                  in.
                </DialogDescription>
              </DialogHeader>
              <div
                className={`${step === 1 && isSearchFilled() ? 'sm:min-h-[272px]' : 'hidden'} ${step === 2 ? 'h-[424px]' : null}`}
              >
                <DialogTitle className="text-center text-[40px]/[48px] font-light my-4">
                  Desired <i className="font-normal">routes</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[18px]/[26px] max-w-[452px] mx-auto">
                  Here, you can set your preferred solution for the route you
                  previously selected, and we&#39;ll notify you when we will
                  find the right partner for you.
                </DialogDescription>
                <div className="flex-wrap text-[12px]/[18px] opacity-50 mt-[40px] mb-[4px] hidden sm:flex ">
                  <div className="ml-[26px] w-[240px]">FROM</div>
                  <div className="ml-[44px] w-[230px]">TO</div>
                </div>
                {fields.map((item, index) => (
                  <div
                    className="flex flex-wrap sm:flex-nowrap items-center mb-[8px] w-full justify-center sm:justify-start gap-2 sm:gap-0"
                    key={index}
                  >
                    <div className="mx-[5px] sm:w-[240px] w-full mt-4 sm:mt-0 flex items-center sm:block justify-center">
                      <div className="text-[14px]/[18px] opacity-50 mb-1 sm:hidden mr-2">
                        From
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-start truncate h-[44px] rounded-l-[8px] rounded-r-none px-1 border-none font-normal text-black bg-[#ffede4] whitespace-nowrap sm:w-1/2 w-[135px] text-left"
                          >
                            <ToolTipComponent
                              text={item.fromCountry || 'Country'}
                            >
                              <div className="block w-[115px] sm:w-[120px] truncate text-left pl-2">
                                {item.fromCountry || 'Contry'}
                              </div>
                            </ToolTipComponent>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full sm:w-[200px] p-0 pointer-events-auto">
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
                                      }}
                                    >
                                      {country.label}
                                    </CommandItem>
                                  ),
                                )}
                              </CommandGroup>
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover
                        onOpenChange={() => getCitiesList(item.fromCountry)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-start h-[44px] rounded-l-none rounded-r-[8px] border-none font-normal text-black bg-[#ffede4] overflow-hidden sm:w-1/2 w-[135px]"
                          >
                            <ToolTipComponent text={item.from || 'City'}>
                              <div className="block truncate w-[115px] sm:w-[100px] text-left">
                                {item.from || 'City'}
                              </div>
                            </ToolTipComponent>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                      onClick={() => {
                        const switched = {
                          fromCountry: item.toCountry,
                          from: item.to,
                          toCountry: item.fromCountry,
                          to: item.from,
                        };
                        update(index, {
                          ...item,
                          ...switched,
                        });
                      }}
                      className="ml-6 sm:ml-0 p-0 rounded-full border-0 bg-transparent min-w-[34px] min-h-[34px] w-full sm:w-[34px] h-[34px] relative z-10 hover:bg-transparent group"
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
                    <div className="mx-[5px] sm:w-[230px] w-full flex items-center sm:block justify-center">
                      <div className="text-right w-[38px] text-[14px]/[18px] opacity-50 mb-1 sm:hidden mr-2">
                        To
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-start h-[44px] rounded-l-[8px] rounded-r-none border-none font-normal text-black bg-[#ffede4] sm:w-1/2 w-[135px]"
                          >
                            <ToolTipComponent
                              text={item.toCountry || 'Country'}
                            >
                              <div className="block w-[115px] sm:w-[95px] truncate text-left">
                                {item.toCountry || 'Country'}
                              </div>
                            </ToolTipComponent>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                                          toCountry: country.value,
                                        });
                                      }}
                                    >
                                      {country.label}
                                    </CommandItem>
                                  ),
                                )}
                              </CommandGroup>
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover
                        onOpenChange={() => getCitiesList(item.toCountry)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-start p-0 text-left h-[44px] rounded-l-none rounded-r-[8px] border-none font-normal text-black bg-[#ffede4] truncate pl-2 sm:w-1/2 w-[135px]"
                          >
                            <ToolTipComponent text={item.to || 'City'}>
                              <div className="block w-[115px] sm:w-[100px] truncate text-left">
                                {item.to || 'City'}
                              </div>
                            </ToolTipComponent>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 pointer-events-auto">
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
                                    onSelect={() =>
                                      update(index, {
                                        ...item,
                                        to: city.value,
                                      })
                                    }
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
                  </div>
                ))}
              </div>
              <div
                className={`${step === 1 && !isSearchFilled() ? 'sm:min-h-[172px]' : 'hidden'}`}
              >
                <DialogTitle className="text-center text-[24px]/[29px] sm:text-[40px]/[48px] font-light my-4">
                  Just a step away!
                  <Link
                    className="text-primaryOrange underline hover:no-underline"
                    href="/"
                  >
                    Click here
                  </Link>
                  to fill in the search bar and get matched with the right
                  partner.
                </DialogTitle>
              </div>
              <div className={step === 2 ? '' : 'hidden'}>
                <DialogTitle className="text-center text-[40px]/[48px] font-light my-4">
                  Enter <i className="font-normal">your details</i>
                </DialogTitle>
                <DialogDescription className="text-center text-[14px] mx-auto max-w-[490px]">
                  Please provide your company name, phone number, email address,
                  and a message detailing why you need this partner&apos;s
                  services. This will help us better understand your needs and
                  communicate your requirements more effectively with the
                  logistics provider.
                </DialogDescription>

                {/* Conditional rendering of fields based on isLoggedIn */}
                {!isLoggedIn && (
                  <>
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
                  </>
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mt-[16px]">
                      <label className="text-[14px]">
                        Message
                        <IsRequired />
                      </label>
                      <FormControl>
                        <Textarea
                          className="border-none bg-gray-2 min-h-[200px]"
                          placeholder="ABCD FZ LLC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {step !== 3 && (
              <div className="sm:flex justify-between items-center py-5 space-y-5">
                <div className="flex space-x-1 order-2 justify-center w-full">
                  <div
                    className={`shadow-2xl rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 0 ? 'opacity-100' : 'opacity-50'}`}
                  />
                  <div
                    className={`shadow-sm rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 1 ? 'opacity-100' : 'opacity-50'}`}
                  />
                  <div
                    className={`shadow-sm rounded-full w-[16px] h-[16px] bg-orangePrimary border-4 border-white ${step === 2 ? 'opacity-100' : 'opacity-50'}`}
                  />
                </div>
                <UIButton
                  secondary
                  onClick={() => setStep(step - 1)}
                  className={`w-full sm:max-w-40 ${step === 0 ? 'hidden sm:block invisible' : ''}`}
                >
                  Previous step
                </UIButton>
                <UIButton
                  className={`w-full sm:max-w-40 order-3 ${step === 1 && !isSearchFilled() ? 'hidden' : null}`}
                  type="submit"
                  onClick={(e: any) => {
                    if (step !== 2) {
                      e.preventDefault();

                      if (step === 1 && !isFieldsFilled()) {
                        toast({
                          title: 'Fill out the fields',
                          variant: 'destructive',
                          className: 'bg-red-500 text-white',
                        });
                        return;
                      } else {
                        setStep(step + 1);
                      }
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
        <div className={`${step !== 3 && 'hidden'}`}>
          <DialogHeader className="mb-[42px]">
            <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
              Thank <i className="font-normal">you!</i>
            </DialogTitle>
            <DialogDescription className="text-center text-[18px]/[26px]">
              We&apos;re on it! You&apos;ll be connected with logistics
              providers who fit your needs, and we&apos;ll reach out if we need
              more details to ensure everything goes smoothly.
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

const SolutionFinderWrapped = ({
  isPulseAnimation,
}: {
  isPulseAnimation?: boolean;
}) => (
  <CaptchaProvider>
    <SolutionFinder isPulseAnimation={isPulseAnimation} />
  </CaptchaProvider>
);

export default SolutionFinderWrapped;
