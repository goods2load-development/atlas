"use client";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
  const [cookies] = useCookies(["accessToken"]);
  const [isRegisteredWithGoogle, setIsRegisteredWithGoogle] = useState(false);
  const [formState, setFormState] = useState(() => {
    const savedFormState =
      typeof window !== "undefined"
        ? localStorage.getItem("registrationForm")
        : null;

    if (savedFormState) {
      return JSON.parse(savedFormState);
    }
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      address: "",
      postalCode: "",
      city: "",
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
      postalCode: z.string().length(6).regex(new RegExp("^[0-9]*$")),
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
    defaultValues: formState
      ? formState
      : {
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
    ]).then((e) => {
      if (e) setFirstStep(false);
    });
  }

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
        firstName: user?.given_name,
        lastName: user?.family_name,
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
    <RegistrationWrapper
      userRegistration={userRegistration}
      firstStep={firstStep}
    >
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
            <div className="sm:flex mb-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="sm:w-6/12 sm:mr-3">
                    <FormLabel>First name</FormLabel>
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
                name="lastName"
                render={({ field }) => (
                  <FormItem className="sm:w-6/12">
                    <FormLabel>Last name</FormLabel>
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
            </div>
            <div className="sm:flex mb-5">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="sm:w-6/12 sm:mr-3">
                    <FormLabel>Phone number</FormLabel>
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
                name="email"
                render={({ field }) => (
                  <FormItem className="sm:w-6/12">
                    <FormLabel>Email</FormLabel>
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
                  <FormLabel>Company name</FormLabel>
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
                    <FormLabel>Address</FormLabel>
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
                    <FormLabel>Postal / ZIP code</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>City</FormLabel>
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
            {!userRegistration && (
              <>
                <FormLabel>I provide logistic services by:</FormLabel>
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
                <FormItem className="mb-5 flex space-x-3">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="comunication"
                    className="mt-2"
                  />
                  <FormLabel
                    htmlFor="comunication"
                    className="text-[12px]/[16px] font-normal"
                  >
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
    </RegistrationWrapper>
  );
}
