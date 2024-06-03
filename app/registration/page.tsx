"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useCountriesStore } from "@/lib/store";
import { useRegistrationStore } from "@/lib/store";

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

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

import RegistrationWrapperFirst from "@/components/RegistrationWrapper";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoogleIcon from "@/assets/AuthProviderLogos/GoogleIcon";
import Divider from "@/components/Divider";
import { getSession, signIn } from "next-auth/react";
import { getCookie } from "react-use-cookie";

interface CountriesProps {
  value: string;
  label: string;
}

// TODO get roles list

const userRoles = [
  {
    value: "role1",
    name: "Role 1",
  },
  {
    value: "role2",
    name: "Role 2",
  },
  {
    value: "role3",
    name: "Role 3",
  },
];

export default function UserRegistration() {
  const router = useRouter();

  // TODO finalize validation schema
  const formSchema = z
    .object({
      role: z.string(),
      firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
      }),
      lastName: z.string(),
      phoneNumber: z.string(),
      email: z.string().email(),
      companyName: z.string(),
      address: z.string(),
      postalCode: z.string().length(6),
      city: z.string(),
      country: z.string(),
      provider: z.boolean().optional(),
      ferry: z.boolean().optional(),
      truck: z.boolean().optional(),
      plane: z.boolean().optional(),
      license: z.any().optional(),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: z.string(),
      privacy: z.boolean(),
      comunication: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      ferry: false,
      truck: false,
      plane: false,
    },
  });
  const {
    trigger,
    formState: { errors },
  } = form;
  const { countriesList, getCountriesList } = useCountriesStore(
    (state: any) => state
  );
  const { firstStep, setFirstStep, postUserRegistrationData } =
    useRegistrationStore((state: any) => state);
  function onSubmit(values: z.infer<typeof formSchema>) {
    postUserRegistrationData(values, license);
  }
  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });
  const [userRegistration, setUserRegistration] = useState(true);
  const [license, setLicense] = useState<File | null>(null);
  function nextStep() {
    trigger([
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "companyName",
      "address",
      "postalCode",
      "city",
      "country",
    ]);
    if (!Object.keys(errors).length) setFirstStep(false);
  }

  async function fillFieldsWithGoogle(event: any) {
    event.preventDefault()
    const result = await signIn("google", { redirect: false });
    const token = getCookie("accessToken");
    const decodedToken = await getSession({
      req: { headers: { cookie: `accessToken=${token}` } },
    });
    if (decodedToken) {
      const { user }: any = decodedToken;
      form.setValue("firstName", user?.given_name);
      form.setValue("lastName", user?.family_name);
      form.setValue("email", user?.email);
      form.setValue("phoneNumber", user?.phone);
      form.setValue("companyName", user?.company);
      form.setValue("address", user?.address);
    }
  }

  return (
    <RegistrationWrapperFirst
      userRegistration={userRegistration}
      firstStep={firstStep}
    >
      <Button
        variant="outline"
        onClick={(event) => fillFieldsWithGoogle(event)}
        className="flex gap-2 justify-center w-full border-orangePrimary text-[16px]/[24px] font-semibold p-[18px] h-[60px]"
      >
        <GoogleIcon />
        <span>Fill with Google </span>
      </Button>
      {/* {errors ? (
        <p className="my-2 text-sm text-center font-medium text-destructive">
          Something went wrong, please try again
        </p>
      ) : (
        <></>
      )} */}
      <Divider />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={`${!firstStep && "hidden"}`}>
            <div className="flex flex-wrap flex-col content-center mb-5">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem className="flex space-x-4 space-y-0">
                    <FormLabel className="text-[14px]/[24px]">
                      I <b>order</b> services
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                          setUserRegistration(!e);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-[14px]/[24px]">
                      I <b>provide</b> services
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex mb-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-6/12 mr-3">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-6/12">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex mb-5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-6/12 mr-3">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-6/12">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder=""
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
                <FormItem className="w-full mb-5">
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex mb-5">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-8/12 mr-3">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="w-4/12">
                    <FormLabel>Postal / ZIP code</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-2 border-0"
                        placeholder="XXX XXX"
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countriesList &&
                          countriesList.length &&
                          countriesList.map((item: any) => (
                            <SelectItem key={item.iso3} value={item.iso3}>
                              {item.country}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!userRegistration && (
              <>
                <FormLabel>I provide logistic services by:</FormLabel>
                <div className="flex mb-5">
                  <FormField
                    control={form.control}
                    name="ferry"
                    render={({ field }) => (
                      <FormItem className="mr-8">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="ferry"
                          className="hidden"
                        />
                        <FormLabel
                          htmlFor="ferry"
                          className="flex items-center space-x-2 text-sm font-medium"
                        >
                          <span className="border border-orangePrimary rounded-sm inline-block w-[18px] h-[18px] mr-4">
                            <Image
                              src="/check.png"
                              alt="check"
                              width={16}
                              height={16}
                              className="hidden"
                            />
                          </span>
                          Ferry
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="plane"
                    render={({ field }) => (
                      <FormItem className="mr-8">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="plane"
                          className="hidden"
                        />
                        <FormLabel
                          htmlFor="plane"
                          className="flex items-center space-x-2 text-sm font-medium"
                        >
                          <span className="border border-orangePrimary rounded-sm inline-block w-[18px] h-[18px] mr-4">
                            <Image
                              src="/check.png"
                              alt="check"
                              width={16}
                              height={16}
                              className="hidden"
                            />
                          </span>
                          Plane
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="truck"
                    render={({ field }) => (
                      <FormItem className="mr-8">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="truck"
                          className="hidden"
                        />
                        <FormLabel
                          htmlFor="truck"
                          className="flex items-center space-x-2 text-sm font-medium"
                        >
                          <span className="border border-orangePrimary rounded-sm inline-block w-[18px] h-[18px] mr-4">
                            <Image
                              src="/check.png"
                              alt="check"
                              width={16}
                              height={16}
                              className="hidden"
                            />
                          </span>
                          Truck
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem className="w-full mb-5">
                      <FormLabel>
                        Insurance statement, LICENSE TO BE FILL IN (.PDF)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-2 border-0"
                          placeholder="temp"
                          type="file"
                          accept="application/pdf"
                          {...field}
                          onChange={(e) => {
                            if (e.target.files?.length)
                              setLicense(e.target.files[0]);
                            return field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        *Attachments not bigger than 2MB
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <div className={`${firstStep && "hidden"}`}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>User Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((item) => (
                          <SelectItem
                            key={`role-${item.name}`}
                            value={item.name}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="mb-1">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="privacy"
                    className="hidden"
                  />
                  <FormLabel
                    htmlFor="privacy"
                    className="flex items-center space-x-2 text-[12px]/[16px] font-normal"
                  >
                    <span className="border border-orangePrimary rounded-sm inline-block w-[18px] h-[18px] mr-4">
                      <Image
                        src="/check.png"
                        alt="check"
                        width={16}
                        height={16}
                        className="hidden"
                      />
                    </span>
                    I have read and agree to the Privacy Terms and Terms of use
                    of the website.
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comunication"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="comunication"
                    className="hidden"
                  />
                  <FormLabel
                    htmlFor="comunication"
                    className="flex items-center space-x-2 text-[12px]/[16px] font-normal"
                  >
                    <span className="border border-orangePrimary rounded-sm inline-block w-[18px] h-[18px] mr-4">
                      <Image
                        src="/check.png"
                        width={16}
                        height={16}
                        alt="check"
                        className="hidden"
                      />
                    </span>
                    Yes, I would like to receive communication from GOODS2LOAD
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className={`flex ${firstStep && "hidden"}`}>
            <Button
              type="submit"
              className="bg-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-6/12 mr-3"
            >
              Continue
            </Button>
            <Button
              onClick={() => setFirstStep(true)}
              type="button"
              className="bg-white border-2  text-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-6/12 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <div className={`flex ${!firstStep && "hidden"}`}>
        <Button
          type="button"
          onClick={nextStep}
          className="bg-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-6/12 mr-3"
        >
          Continue
        </Button>
        <Button
          onClick={router.back}
          type="button"
          className="bg-white border-2  text-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-6/12 hover:text-white"
        >
          Cancel
        </Button>
      </div>
    </RegistrationWrapperFirst>
  );
}
