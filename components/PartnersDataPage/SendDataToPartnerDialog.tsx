import CountryCode from '../common/CountryCode';
import { Textarea } from '../ui/textarea';
import CaptchaProvider from '@/lib/providers/CaptchaProvider';
import { useUserStore } from '@/lib/store';
import { postRequest } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function IsRequired() {
  return <i className="text-orangePrimary">*</i>;
}

const formSchema = (isLoggedIn: boolean) =>
  z.object({
    countryCode: isLoggedIn ? z.optional(z.string()) : z.string().min(1),
    phone: isLoggedIn
      ? z.optional(z.string())
      : z.string().regex(new RegExp('^[0-9]{4,15}$')),
    email: isLoggedIn ? z.optional(z.string()) : z.string().min(5).email(),
    companyName: isLoggedIn ? z.optional(z.string()) : z.string().min(2),
    message: z.string().min(2),
    attachments: z.array(z.instanceof(File)).max(5, 'Max 5 files').optional(),
  });

interface Props {
  title?: React.ReactNode;
  trigger: React.ReactNode;
}

function SendDataDialog({ title, trigger }: Props) {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { user } = useUserStore((state: any) => state);
  const isLoggedIn = !!Object.values(user).length;

  const Title = title || (
    <DialogTitle className="text-center text-[40px]/[48px] font-light mb-[16px]">
      Enter your <i className="font-normal">details</i>
    </DialogTitle>
  );

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(isLoggedIn)),
  });

  useEffect(() => {
    form.setValue('attachments', selectedFiles);
  }, [selectedFiles]);

  const onSubmit = async (values: z.infer<ReturnType<typeof formSchema>>) => {
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha('pollVote');

    const formData = new FormData();

    if (isLoggedIn) {
      formData.append('phone', user.phoneNumber);
      formData.append('email', user.email);
      formData.append('companyName', user.companyName);
    } else {
      formData.append(
        'phone',
        `${(values as any).countryCode}${(values as any).phone}`,
      );
      formData.append('email', values.email as string);
      formData.append('companyName', values.companyName as string);
    }

    formData.append('message', values.message);
    formData.append('recaptchaToken', token);

    if (values.attachments && values.attachments.length > 0) {
      values.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}partners/${id}/free-quotation`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (data) {
        setStep(1);
      } else {
        setStep(0);
      }
    } catch (error) {
      setStep(0);
    }
  };

  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[632px] p-[48px_52px] overflow-auto max-h-screen">
        <Form {...form}>
          <form
            className={`flex flex-col justify-between ${step !== 0 && 'hidden'}`}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              {Title}
              <p className="text-center text-[18px]/[26px]">
                Please provide your email, company phone number, and company
                name below so we can contact you regarding your selection.
              </p>
            </DialogHeader>

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

            <FormField
              control={form.control}
              name="attachments"
              render={() => (
                <FormItem className="flex-1 mt-4">
                  <span className="text-[14px]">Attachments</span>
                  <FormControl>
                    <input
                      className="hidden"
                      id="file-upload"
                      type="file"
                      multiple
                      accept="*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const validFiles = files.filter(
                          (file) => file.size <= 10 * 1024 * 1024,
                        );

                        if (selectedFiles.length + validFiles.length > 5) {
                          alert('Max 5 files!');
                          return;
                        }

                        const updated = [...selectedFiles, ...validFiles];
                        setSelectedFiles(updated);
                        form.setValue('attachments', updated);
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="file-upload"
                    className="border border-black font-normal text-[14px] rounded-sm py-2 flex justify-center items-center cursor-pointer"
                  >
                    <Image
                      className="mr-2"
                      src="/upload.svg"
                      alt="upload"
                      width={16}
                      height={16}
                    />
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : 'Upload files'}
                  </FormLabel>
                  <FormMessage />

                  {selectedFiles.length > 0 && (
                    <ul className="text-xs mt-2 list-disc ml-4">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <span>
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{' '}
                            MB)
                          </span>
                          <button
                            type="button"
                            className="text-red-500 hover:underline"
                            onClick={() => {
                              const newFiles = selectedFiles.filter(
                                (_, i) => i !== index,
                              );
                              setSelectedFiles(newFiles);
                              form.setValue('attachments', newFiles);
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
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
              Your selection is being <i className="font-normal">processed</i>
            </DialogTitle>
            <p className="text-center text-[18px]/[26px]">
              We will contact you at the provided contact details.
              <br /> Thank you!
            </p>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <UIButton className="mx-auto w-[184px]">I got it</UIButton>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const SendDataToPartnerDialog = (props: Props) => (
  <CaptchaProvider>
    <SendDataDialog {...props} />
  </CaptchaProvider>
);

export default SendDataToPartnerDialog;
