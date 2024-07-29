"use client";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useCountriesStore } from "@/lib/store";
import { useRegistrationStore } from "@/lib/store";
import Link from "next/link";
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
import RegistrationWrapper from "@/components/RegistrationWrapper";
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
import InputPassword from "@/components/common/InputPassword";
import RegistrationSuccessPopup from "./RegistrationSuccessPopup";
import CountryCode from "@/components/common/CountryCode";
interface CountriesProps {
  value: string;
  label: string;
}

const MAX_UPLOAD_SIZE = 2000000;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

function IsRequired() {
  return <i className="text-orangePrimary">*</i>;
}

export default function UserRegistration() {
  const router = useRouter();
  const [cookies] = useCookies(["accessToken"]);
  const [isRegisteredWithGoogle, setIsRegisteredWithGoogle] = useState(false);
  const [formState, setFormState] = useState(() => {
    const savedFormState =
      typeof window !== "undefined"
        ? localStorage.getItem("registrationForm")
        : null;

    if (savedFormState) {
      const parsedForm = JSON.parse(savedFormState);

      if (!parsedForm.communication) {
        parsedForm.communication = false;
      }

      if (!parsedForm.provider) {
        parsedForm.provider = false;
      }

      return parsedForm;
    }

    return {
      firstName: "",
      lastName: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      address: "",
      postalCode: "",
      city: "",
      communication: false,
      provider: false,
    };
  });

  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    localStorage.setItem("registrationForm", JSON.stringify(formState));
  }, [formState]);

  const formSchema = z
    .object({
      countryCode: z.string(),
      phoneNumber: z.string().regex(new RegExp("^[0-9]{4,10}$")),
      email: z.string().min(5).email(),
      companyName: z.string().min(2),
      address: z.string().optional(),
      postalCode: z.string().length(6).regex(new RegExp("^[0-9]*$")).optional(),
      city: z.string().optional(),
      country: z.string(),
      provider: z.boolean().optional(),
      ferry: z.boolean().optional(),
      truck: z.boolean().optional(),
      plane: z.boolean().optional(),
      insuranceStatement: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File size must be less than 2MB")
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, "File must be a PDF")
        .optional(),
      issuingAuthority: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File size must be less than 2MB")
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, "File must be a PDF")
        .optional(),
      tradeLicenseNumber: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File size must be less than 2MB")
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, "File must be a PDF")
        .optional(),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: z.string(),
      privacy: z.boolean(),
      communication: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
    .refine((data) => !data.provider || data.insuranceStatement, {
      message: "No file uploaded",
      path: ["insuranceStatement"],
    })
    .refine((data) => !data.provider || data.issuingAuthority, {
      message: "No file uploaded",
      path: ["issuingAuthority"],
    })
    .refine((data) => !data.provider || data.tradeLicenseNumber, {
      message: "No file uploaded",
      path: ["tradeLicenseNumber"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formState
      ? formState
      : {
          ferry: false,
          truck: false,
          plane: false,
        },
  });
  // const { formState } = form;
  const { countriesList, getCountriesList } = useCountriesStore(
    (state: any) => state
  );
  const { postUserRegistrationData } = useRegistrationStore(
    (state: any) => state
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    postUserRegistrationData(values);
  }
  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });
  const [userRegistration, setUserRegistration] = useState(true);
  async function fillFieldsWithGoogle() {
    signIn("google", { redirect: true });
  }

  useEffect(() => {
    if (cookies.accessToken) {
      fillFields();
    }
  }, [cookies.accessToken]);

  async function fillFields() {
    const token = getCookie("accessToken");
    const decodedToken = await getSession({
      req: { headers: { cookie: `accessToken=${token}` } },
    });
    if (decodedToken) {
      const { user }: any = decodedToken;
      const formattedUser = {
        phoneNumber: user?.phone,
        email: user?.email,
        companyName: user?.company,
        address: user?.address,
      };
      localStorage.setItem("registrationForm", JSON.stringify(formattedUser));
      // refresh default values for form
      form.reset(formattedUser);
      setIsRegisteredWithGoogle(true);
      router.refresh();
    }
  }

  return (
    <RegistrationWrapper userRegistration={userRegistration}>
      <Button
        variant="outline"
        onClick={fillFieldsWithGoogle}
        className="flex gap-2 justify-center w-full border-orangePrimary text-[16px]/[24px] font-semibold p-[18px] h-[60px]"
      >
        <GoogleIcon />
        <span>Sign in with Google </span>
      </Button>
      <Divider />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="sm:flex mb-5">
            <div className="sm:w-6/12 sm:mr-2">
              <FormLabel className="font-light sm:font-normal">
                Company phone number
                <IsRequired />
              </FormLabel>
              <div className="flex mt-2">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="sm:w-5/12 sm:mr-2">
                      <FormControl>
                        <CountryCode
                          onChange={field.onChange}
                          className="bg-gray-2 border-transparent outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="sm:w-7/12">
                      <FormControl>
                        <Input
                          className="bg-gray-2 border-0"
                          {...field}
                          onBlur={handleChange}
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
                <FormItem className="sm:w-6/12 mt-3 sm:mt-0">
                  <FormLabel className="font-light sm:font-normal">
                    Email
                    <IsRequired />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      {...field}
                      onBlur={handleChange}
                      disabled={isRegisteredWithGoogle}
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
                <FormLabel className="font-light sm:font-normal">
                  Company name
                  <IsRequired />
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-2 border-0"
                    placeholder=""
                    {...field}
                    onBlur={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:flex mb-5">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:w-8/12 sm:mr-3">
                  <FormLabel className="font-light sm:font-normal">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder=""
                      {...field}
                      onBlur={handleChange}
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
                <FormItem className="sm:w-4/12">
                  <FormLabel className="font-light sm:font-normal">
                    Postal / ZIP code
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-2 border-0"
                      placeholder="XXX XXX"
                      {...field}
                      onBlur={handleChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel className="font-light sm:font-normal">
                  Country
                  <IsRequired />
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesList.map((item: any) => (
                        <SelectItem key={item.value} value={item.label}>
                          {item.label}
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
            name="city"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel className="font-light sm:font-normal">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-2 border-0"
                    placeholder=""
                    {...field}
                    onBlur={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!userRegistration && (
            <>
              <FormLabel className="font-light sm:font-normal">
                I provide logistic services by:
              </FormLabel>
              <div className="flex mb-5 space-x-8">
                <FormField
                  control={form.control}
                  name="ferry"
                  render={({ field }) => (
                    <FormItem className="flex space-x-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="ferry"
                        className="mt-2"
                      />
                      <FormLabel
                        htmlFor="ferry"
                        className="text-sm font-medium"
                      >
                        Ferry
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plane"
                  render={({ field }) => (
                    <FormItem className="flex space-x-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="plane"
                        className="mt-2"
                      />
                      <FormLabel
                        htmlFor="plane"
                        className="text-sm font-medium"
                      >
                        Plane
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="truck"
                  render={({ field }) => (
                    <FormItem className="flex space-x-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="truck"
                        className="mt-2"
                      />
                      <FormLabel
                        htmlFor="truck"
                        className="text-sm font-medium"
                      >
                        Truck
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="insuranceStatement"
                render={({ field }) => (
                  <FormItem className="w-full mb-5 sm:flex flex-wrap">
                    <div className="sm:w-1/2 sm:pr-2">
                      <FormLabel className="text-[14px]/[18px] font-normal">
                        Insurance statement, license to be fill in
                      </FormLabel>
                      <FormDescription className="text-[12px]">
                        *Attachments not bigger than 2MB
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                      <img className="mr-[8px]" src="/upload.svg" />
                      {field.value
                        ? field.value.name
                        : "Upload PDF(front&back)"}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuingAuthority"
                render={({ field }) => (
                  <FormItem className="w-full mb-5 sm:flex flex-wrap">
                    <div className="sm:w-1/2 sm:pr-2">
                      <FormLabel className="text-[14px]/[18px] font-normal">
                        Issuing authority, form to be fill in
                      </FormLabel>
                      <FormDescription className="text-[12px]">
                        *Attachments not bigger than 2MB
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="temp"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                      <img className="mr-[8px]" src="/upload.svg" />
                      {field.value
                        ? field.value.name
                        : "Upload PDF(front&back)"}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tradeLicenseNumber"
                render={({ field }) => (
                  <FormItem className="w-full mb-5 sm:flex flex-wrap">
                    <div className="sm:w-1/2 sm:pr-2">
                      <FormLabel className="text-[14px]/[18px] font-normal">
                        Trade license number, form to be fill in
                      </FormLabel>
                      <FormDescription className="text-[12px]">
                        *Attachments not bigger than 2MB
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="temp"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="border border-black font-normal text-[14px] rounded-sm py-2 sm:w-1/2 flex justify-center items-center">
                      <img className="mr-[8px]" src="/upload.svg" />
                      {field.value
                        ? field.value.name
                        : "Upload PDF(front&back)"}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>
                  Password
                  <IsRequired />
                </FormLabel>
                <FormControl>
                  <InputPassword className="bg-gray-2 border-0" {...field} />
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
                <FormLabel>
                  Confirm password
                  <IsRequired />
                </FormLabel>
                <FormControl>
                  <InputPassword className="bg-gray-2 border-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="mb-1 flex space-x-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="privacy"
                  className="mt-2"
                />
                <FormLabel
                  htmlFor="privacy"
                  className="text-[12px]/[16px] font-normal"
                >
                  I have read and agree to the{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:no-underline"
                  >
                    Privacy Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms-of-service"
                    className="underline hover:no-underline"
                  >
                    Terms of use
                  </Link>{" "}
                  of the website.
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="communication"
            render={({ field }) => (
              <FormItem className="mb-5 flex space-x-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="communication"
                  className="mt-2"
                />
                <FormLabel
                  htmlFor="communication"
                  className="text-[12px]/[16px] font-normal"
                >
                  Yes, I would like to receive communication from{" "}
                  <Link
                    href="/terms-of-service"
                    className="underline hover:no-underline"
                  >
                    GOODS2LOAD
                  </Link>
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
          >
            Continue
          </Button>
        </form>
      </Form>
      <RegistrationSuccessPopup />
    </RegistrationWrapper>
  );
}
