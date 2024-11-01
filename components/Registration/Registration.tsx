'use client';

import { FormAboutUs } from './ProviderStepsRegistration/ProviderAboutUs';
import { FormStepAirFreight } from './ProviderStepsRegistration/ProviderStepAirFreight';
import { FormStepFinalAgreement } from './ProviderStepsRegistration/ProviderStepFinalAgreement';
import { FormStepGeneral } from './ProviderStepsRegistration/ProviderStepGeneral';
import { FormStepIndustries } from './ProviderStepsRegistration/ProviderStepIndustries';
import { FormStepIndustryRecognition } from './ProviderStepsRegistration/ProviderStepIndustryRecognition';
import { FormStepIndustryRecognitionSecondary } from './ProviderStepsRegistration/ProviderStepIndustryRecognitionSecondary';
import { FormStepRoadFreight } from './ProviderStepsRegistration/ProviderStepRoadFreight';
import { FormStepSeaFreight } from './ProviderStepsRegistration/ProviderStepSeaFreight';
import RegistrationSuccessPopup from './RegistrationSuccessPopup';
import GoogleIcon from '@/assets/AuthProviderLogos/GoogleIcon';
import { usePartnersStore, useRegistrationStore } from '@/lib/store';
import { useCountriesStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { getCookie } from 'react-use-cookie';
import { z } from 'zod';

import Divider from '@/components/Divider';
import RegistrationWrapper from '@/components/RegistrationWrapper';
import CountryCode from '@/components/common/CountryCode';
import InputPassword from '@/components/common/InputPassword';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const ERRORS_ON_STEPS: Record<number, string[]> = {
  0: [
    'email',
    'companyPhoto',
    'companyName',
    'password',
    'confirmPassword',
    'privacy',
    'phoneNumber',
    'country',
    'postalCode',
    'insuranceStatement',
    'issuingAuthority',
    'tradeLicenseNumber',
  ],
  1: ['googleBusinessProfile'],
  2: ['industryRecognitions', 'industryProofFile'],
  3: ['industryProofFileSecondary', 'industryRecognitionsSecondary'],
  4: ['industries'],
  8: ['aboutUs', 'ourMission'],
};

const MAX_UPLOAD_SIZE = 2000000;
const ACCEPTED_FILE_TYPES = ['application/pdf'];

export function IsRequired() {
  return <i className="text-orangePrimary">*</i>;
}

export default function Registration() {
  const { getPartnersIndustries } = usePartnersStore();
  const [step, setStep] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [cookies] = useCookies(['accessToken']);
  const isUser = useSearchParams().toString().split('=')[0] !== 'provider';
  const [isRegisteredWithGoogle, setIsRegisteredWithGoogle] = useState(false);

  const [formState, setFormState] = useState(() => {
    const savedFormState =
      typeof window !== 'undefined'
        ? localStorage.getItem('registrationForm')
        : null;

    if (savedFormState) {
      const parsedForm = JSON.parse(savedFormState);

      if (!parsedForm.communication) {
        parsedForm.communication = false;
      }
      parsedForm.provider = !isUser;
      return parsedForm;
    }

    return {
      firstName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      email: '',
      companyName: '',
      companyPhoto: '',
      address: '',
      postalCode: '',
      city: '',
      communication: false,
      provider: !isUser,
      branches: false,
    };
  });

  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getPartnersIndustries();
  }, []);

  useEffect(() => {
    localStorage.setItem('registrationForm', JSON.stringify(formState));
  }, [formState]);

  const formSchema = z
    .object({
      countryCode: z.string(),
      phoneNumber: z.string().regex(new RegExp('^[0-9]{4,10}$')),
      email: z.string().min(5).email(),
      companyName: z.string().min(2),
      companyPhoto: z.custom(
        (file) => {
          return (
            file &&
            typeof file.size === 'number' &&
            file.size <= MAX_UPLOAD_SIZE &&
            file.type.includes('image')
          );
        },
        {
          message: 'Company logo required and must be less than 2MB',
        },
      ),
      address: z.string().optional(),
      postalCode: z
        .string()
        .regex(/^[0-9A-Za-z- ]{3,10}$/, 'Invalid postal code format')
        .optional(),
      city: z.string().optional(),
      country: z.string(),
      provider: z.boolean().optional(),
      googleBusinessProfile: z
        .string()
        .url('This field must be a valid URL') // Ensures the input is a valid URL
        .min(3, 'This field is required')
        .optional(),
      // sustainability: z.boolean().optional(),
      finalAgreement: z.boolean().optional(),
      sustainabilityCertificationFile: z
        .unknown()
        .transform((value) => (value ? Array.from(value as FileList) : []))
        .refine(
          (files) => files.every((file) => file.size <= MAX_UPLOAD_SIZE),
          { message: 'File size must be less than 2MB' },
        )
        .optional(),
      industries: z
        .array(z.string())
        .min(1, 'At least one industry must be selected')
        .optional(),
      industryRecognitions: z.array(z.string()).optional(),
      industryProofFile: z
        .unknown()
        .transform((value) => (value ? Array.from(value as FileList) : []))
        .refine(
          (files) => files.every((file) => file.size <= MAX_UPLOAD_SIZE),
          { message: 'File size must be less than 2MB' },
        ),
      industryProofFileSecondary: z
        .unknown()
        .transform((value) => (value ? Array.from(value as FileList) : []))
        .refine(
          (files) => files.every((file) => file.size <= MAX_UPLOAD_SIZE),
          { message: 'File size must be less than 2MB' },
        ),
      industryRecognitionsSecondary: z.array(z.string()).optional(),
      cities: z.array(z.string()).optional(),
      airports: z.array(z.string()).optional(),
      seaports: z.array(z.string()).optional(),
      insuranceStatement: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 2MB')
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, 'File must be a PDF')
        .optional(),
      issuingAuthority: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 2MB')
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, 'File must be a PDF')
        .optional(),
      tradeLicenseNumber: z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 2MB')
        .refine((file) => {
          return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, 'File must be a PDF')
        .optional(),
      password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
      }),
      confirmPassword: z.string(),
      privacy: z.boolean(),
      communication: z.boolean().optional(),
      aboutUs: z
        .string()
        .refine(
          (val) => {
            const wordCount = val ? val.trim().split(/\s+/).length : 0;
            return wordCount >= 80 && wordCount <= 150;
          },
          {
            message: 'The field must contain between 80 and 150 words',
          },
        )
        .optional(),
      ourMission: z
        .string()
        .refine(
          (val) => {
            const wordCount = val ? val.trim().split(/\s+/).length : 0;
            return wordCount >= 80 && wordCount <= 150;
          },
          {
            message: 'The field must contain between 80 and 150 words',
          },
        )
        .refine((val) => /#\w+/.test(val), {
          message: 'Must include at least one hashtag, e.g., #insurance',
        })
        .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })
    .refine((data) => !data.provider || data.insuranceStatement, {
      message: 'No file uploaded',
      path: ['insuranceStatement'],
    })
    .refine((data) => !data.provider || data.issuingAuthority, {
      message: 'No file uploaded',
      path: ['issuingAuthority'],
    })
    .refine((data) => !data.provider || data.tradeLicenseNumber, {
      message: 'No file uploaded',
      path: ['tradeLicenseNumber'],
    })
    .refine((data) => !data.provider || data.industryProofFileSecondary, {
      message: 'No file uploaded',
      path: ['industryProofFileSecondary'],
    })
    .refine(
      (data) =>
        !data.provider ||
        (Array.isArray(data.industries) && data.industries.length > 0),
      {
        message: 'At least one industry must be selected',
        path: ['industries'],
      },
    )
    .refine(
      (data) => {
        return (
          !data.industryRecognitions ||
          (data.industryRecognitions &&
            data.industryProofFile &&
            data.industryRecognitions.length === data.industryProofFile.length)
        );
      },
      (data) => ({
        message: `You need to provide ${data?.industryRecognitions?.length} proof ${data!.industryRecognitions!.length <= 1 ? 'file' : 'files'}`,
        path: ['industryRecognitions'],
      }),
    )
    .refine(
      (data) => {
        return (
          !data.industryRecognitionsSecondary ||
          (data.industryRecognitionsSecondary &&
            data.industryProofFileSecondary &&
            data.industryRecognitionsSecondary.length ===
              data.industryProofFileSecondary.length)
        );
      },
      (data) => ({
        message: `You need to provide ${data?.industryRecognitionsSecondary?.length} proof ${data!.industryRecognitionsSecondary!.length <= 1 ? 'file' : 'files'}`,
        path: ['industryRecognitionsSecondary'],
      }),
    )

    .refine((data) => !data.provider || data.googleBusinessProfile, {
      message: 'This field is required',
      path: ['googleBusinessProfile'],
    })
    .refine((data) => !data.provider || data.finalAgreement, {
      message: 'You need to accept this agreement',
      path: ['finalAgreement'],
    })
    .refine((data) => !data.provider || !!data.aboutUs, {
      message: 'This field is require',
      path: ['aboutUs'],
    })
    .refine((data) => !data.provider || !!data.ourMission, {
      message: 'This field is require',
      path: ['ourMission'],
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
  const { watch, trigger, clearErrors } = form;

  const isProvider = watch('provider');

  const { countriesList, getCountriesList } = useCountriesStore(
    (state: any) => state,
  );
  const { postUserRegistrationData } = useRegistrationStore(
    (state: any) => state,
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('login');

    const { seaports, googleBusinessProfile, ...rest } = values;

    postUserRegistrationData({
      ...rest,
      airports: values?.airports || [],
      ports: seaports || [],
      cities: values?.cities || [],
      bussinessProfileUrl: googleBusinessProfile,
      recaptchaToken: token,
    });
  }

  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });

  const [userRegistration, setUserRegistration] = useState(isUser);
  async function fillFieldsWithGoogle() {
    signIn('google', { redirect: true });
  }

  useEffect(() => {
    if (cookies.accessToken) {
      fillFields();
    }
  }, [cookies.accessToken]);

  const onSmoothScroll = () => {
    window.scroll({
      top: 300,
      behavior: 'smooth',
    });
  };

  const onNextStep = async () => {
    if (!ERRORS_ON_STEPS[step]) {
      onSmoothScroll();
      setStep((step) => step + 1);
      return;
    }

    if (await trigger(ERRORS_ON_STEPS[step] as any)) {
      onSmoothScroll();
      setStep((step) => step + 1);
    }
  };

  const onPrevStep = () => {
    onSmoothScroll();
    setStep((step) => step - 1);
  };

  async function fillFields() {
    const token = getCookie('accessToken');
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
      localStorage.setItem('registrationForm', JSON.stringify(formattedUser));
      // refresh default values for form
      form.reset(formattedUser);
      setIsRegisteredWithGoogle(true);
      router.refresh();
    }
  }

  return (
    <RegistrationWrapper userRegistration={userRegistration}>
      {/* <Button
        variant="outline"
        onClick={fillFieldsWithGoogle}
        className="flex gap-2 justify-center w-full border-orangePrimary text-[16px]/[24px] font-semibold p-[18px] h-[60px]"
      >
        <GoogleIcon />
        <span>Sign in with Google </span>
      </Button>
      <Divider /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 && (
            <>
              <div className="text-center mb-10">
                <span className="text-[40px]/[60px] italic font-normal">
                  Welcome!
                </span>
                <br />
                <span className="text-[16px]/[20px] font-normal">
                  Please enter your details
                </span>
              </div>
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

                            !e
                              ? router.push('/registration?user')
                              : router.push('/registration?provider');
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
                  <div className="flex mt-2 w-full">
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
                        <FormItem className="sm:w-7/12 w-full">
                          <FormControl>
                            <Input
                              className="bg-gray-2 border-0"
                              {...field}
                              onBlur={(value) => {
                                clearErrors('phoneNumber');
                                handleChange(value);
                              }}
                              placeholder="12345678"
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
                        Business Email
                        <IsRequired />
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-2 border-0"
                          placeholder="email@efgh.com"
                          {...field}
                          onBlur={(value) => {
                            handleChange(value);
                            trigger('email');
                          }}
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
                        placeholder="EFGH FZ LLC"
                        {...field}
                        onBlur={(value) => {
                          handleChange(value);
                          trigger('companyName');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyPhoto"
                render={({ field }) => (
                  <>
                    <FormItem className="w-full mb-5 flex gap-4 items-center justify-between">
                      <FormLabel className="font-light sm:font-normal">
                        Company logo
                      </FormLabel>
                      <div className="flex flex-col">
                        <FormDescription className="text-[12px]">
                          *Attachments not bigger than 2MB. Only .png or .svg
                          images.
                        </FormDescription>
                        <FormControl>
                          <Input
                            className="hidden"
                            name="companyPhoto"
                            type="file"
                            accept="image/png, image/svg+xml"
                            onChange={(e) => {
                              if (e.target.files?.length) {
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null,
                                );
                                clearErrors('companyPhoto');
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="border border-black font-normal text-[14px] rounded-sm py-2 flex justify-center items-center">
                          <img className="mr-[8px]" src="/upload.svg" />
                          {field.value ? field.value.name : 'Upload logo'}
                        </FormLabel>
                      </div>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
              <div className="sm:flex mb-5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:w-8/12 sm:mr-3">
                      <FormLabel className="font-light sm:font-normal">
                        Business Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-2 border-0"
                          placeholder="Name of street, 234"
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
                          placeholder="000 000"
                          {...field}
                          onBlur={(val) => {
                            trigger('postalCode');
                            handleChange(val);
                          }}
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
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          trigger('country');
                        }}
                      >
                        <SelectTrigger className="bg-gray-2 border-transparent outline-none placeholder:text-gray-500">
                          <SelectValue
                            className="placeholder:text-gray-500"
                            placeholder="Country"
                          />
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
                        placeholder="Dubai"
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
                  <FormLabel className="font-light sm:font-normal my-2 block">
                    <strong>I provide logistic services by:</strong>
                  </FormLabel>
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
                              if (e.target.files?.length) {
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null,
                                );
                                clearErrors('insuranceStatement');
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                          <img className="mr-[8px]" src="/upload.svg" />
                          {field.value
                            ? field.value.name
                            : 'Upload PDF(front&back)'}
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
                              if (e.target.files?.length) {
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null,
                                );
                                clearErrors('issuingAuthority');
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                          <img className="mr-[8px]" src="/upload.svg" />
                          {field.value
                            ? field.value.name
                            : 'Upload PDF(front&back)'}
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
                              if (e.target.files?.length) {
                                field.onChange(
                                  e.target.files ? e.target.files[0] : null,
                                );
                                clearErrors('tradeLicenseNumber');
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="border border-black font-normal text-[14px] rounded-sm py-2 sm:w-1/2 flex justify-center items-center">
                          <img className="mr-[8px]" src="/upload.svg" />
                          {field.value
                            ? field.value.name
                            : 'Upload PDF(front&back)'}
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
                      <InputPassword
                        placeholder=""
                        className="bg-gray-2 border-0"
                        {...field}
                        onBlur={() => {
                          trigger('password');
                        }}
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
                    <FormLabel>
                      Confirm password
                      <IsRequired />
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        placeholder=""
                        className="bg-gray-2 border-0"
                        {...field}
                        onBlur={() => {
                          trigger('confirmPassword');
                        }}
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
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        trigger('privacy');
                      }}
                      id="privacy"
                      className="mt-2"
                    />
                    <FormLabel
                      htmlFor="privacy"
                      className="text-[12px]/[16px] font-normal"
                    >
                      I have read and agree to the{' '}
                      <Link
                        href="/privacy-policy"
                        className="underline hover:no-underline"
                      >
                        Privacy Terms
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/terms-of-service"
                        className="underline hover:no-underline"
                      >
                        Terms of use
                      </Link>{' '}
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
                      Yes, I would like to receive communication from{' '}
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
            </>
          )}
          <div className={clsx('pt-6 mb-10', step !== 1 && 'hidden')}>
            <FormStepGeneral form={form} />
          </div>

          <div className={clsx('pt-6 mb-10', step !== 2 && 'hidden')}>
            <FormStepIndustryRecognition form={form} />
          </div>

          <div className={clsx('pt-6 mb-10', step !== 3 && 'hidden')}>
            <FormStepIndustryRecognitionSecondary form={form} />
          </div>

          <div className={clsx('pt-6', step !== 4 && 'hidden')}>
            <FormStepIndustries form={form} />
          </div>

          <div className={clsx('pt-6', step !== 5 && 'hidden')}>
            <FormStepAirFreight form={form} />
          </div>

          <div className={clsx('pt-6', step !== 6 && 'hidden')}>
            <FormStepSeaFreight form={form} />
          </div>

          <div className={clsx('pt-6', step !== 7 && 'hidden')}>
            <FormStepRoadFreight form={form} />
          </div>

          <div className={clsx('pt-6', step !== 8 && 'hidden')}>
            <FormAboutUs form={form} />
          </div>

          <div className={clsx('pt-6', step !== 9 && 'hidden')}>
            <FormStepFinalAgreement form={form} />
          </div>

          <div className="flex gap-2 items-center">
            {isProvider && step !== 0 && (
              <Button
                onClick={onPrevStep}
                type="button"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Previous step
              </Button>
            )}

            {isProvider && step !== 9 && (
              <Button
                onClick={onNextStep}
                type="button"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Next
              </Button>
            )}

            {!isProvider && (
              <Button
                type="submit"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Countinue
              </Button>
            )}

            {isProvider && step === 9 && (
              <Button
                type="submit"
                className="bg-orangePrimary border-2 border-orangePrimary rounded-[8px] font-medium text-[16px]/[22px] w-full"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
      <RegistrationSuccessPopup />
    </RegistrationWrapper>
  );
}
