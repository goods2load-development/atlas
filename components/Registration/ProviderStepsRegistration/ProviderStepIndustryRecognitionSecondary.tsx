import { IsRequired } from '../Registration';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const industryRecognitions = [
  'Award for Excellence in Service',
  'Certification of Quality Standarts',
  'Industry Leadership Award',
  'Customer Satisfaction Recognition',
  'Safety Achievement Award',
  'Innovation Award',
  'Other',
];

export const FormStepIndustryRecognitionSecondary = ({
  form,
}: {
  form: any;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-semibold">
        <h4 className={clsx('tracking-wide text-[24px]/[27px]')}>
          Industry Recognition
          <IsRequired />
        </h4>
      </div>

      <div className={clsx('my-4')}>
        <FormField
          control={form.control}
          name="industryRecognitionsSecondary"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <div className="mt-4 mb-2 flex flex-col gap-2 text-[14px]">
                  <FormMessage className="mb-2" />
                  <p className={clsx('text-[14px]')}>
                    <strong className="">
                      Please select the industry recognition your complany has
                      received (check all the apply)
                    </strong>
                    <i className="block mt-2">
                      Note: Providing inaccurate information may negatively
                      impact both our platform and your bussiness&apos;s
                      potential to rank higher and attract quality customers
                    </i>
                  </p>
                  {industryRecognitions.map((item: string, idx: number) => {
                    return (
                      <label
                        key={item + idx}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          value={item}
                          checked={field.value?.includes(item) || false}
                          onCheckedChange={(checked) => {
                            const value = item;
                            const newValue = checked
                              ? [...(field.value || []), value]
                              : field.value?.filter(
                                  (v: string) => v !== item,
                                ) || [];
                            field.onChange(newValue);
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className={clsx('mt-8')}>
        <div className="font-bold">Proof of recognition</div>
        <p className="mt-2 text-[14px]">
          Please upload any relevan documents that provide proof of recognition,
          such as badges, certificates or membership letters (expired
          sertifications are not accepted)
        </p>
        <FormField
          control={form.control}
          name="industryProofFileSecondary"
          render={({ field }) => (
            <FormItem className="mt-2">
              <div className="sm:w-1/2 sm:pr-2">
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
                    field.onChange(e.target.files ? e.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                <img className="" src="/upload.svg" />
                {field.value ? field.value.name : 'Upload PDF(front&back)'}
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="mt-12 text-[14px]">
        <strong className="text-[16px]">Sastainability Certification</strong>

        <p className="block mb-2 mt-6">
          This certification is a significant recognition of our commitment to
          environmentally responsible practices and sustainable operations. It
          demonstrates our dedication to reducing our ecological footprint and
          promoting sustainability within the logistics industry.
        </p>

        <p>
          Having this badge is crucial for our brand reputation, as it not only
          highlights our compliance with recognized environmental standards but
          also enhances customer trust and loyalty. By showcasing our
          Sustainability Certification, we reinforce our position as a
          forward-thinking company that prioritizes both service excellence and
          environmental stewardship.
        </p>

        <FormField
          control={form.control}
          name="sustainability"
          render={({ field }) => (
            <FormItem className="w-full my-4 ">
              <FormControl>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2">
                    <div
                      className={clsx(
                        'w-4 h-4 rounded-full border-2 border-gray-300 flex justify-center items-center cursor-pointer',
                      )}
                    >
                      <div
                        className={clsx(
                          'w-2 h-2 rounded-full',
                          field.value === true
                            ? 'bg-primaryOrange'
                            : 'bg-white',
                        )}
                      />
                    </div>
                    <input
                      className="hidden"
                      type="radio"
                      value={'true'}
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    <span className="cursor-pointer font-medium">
                      I have this recognition
                    </span>
                  </label>

                  <label className="flex items-center gap-2">
                    <div
                      className={clsx(
                        'w-4 h-4 rounded-full border-2 border-gray-300 flex justify-center items-center cursor-pointer',
                      )}
                    >
                      <div
                        className={clsx(
                          'w-2 h-2 rounded-full',
                          field.value === false || !field.value
                            ? 'bg-primaryOrange'
                            : 'bg-white',
                        )}
                      />
                    </div>
                    <input
                      className="hidden"
                      type="radio"
                      value="false"
                      checked={field.value === false || !field.value}
                      onChange={() => field.onChange(false)}
                    />
                    <span className="cursor-pointer font-medium">
                      I dont&apos;t have this recognition
                    </span>
                  </label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className={clsx('mt-8')}>
          <div className="font-bold">Proof of recognition</div>
          <p className="mt-2 text-[14px]">
            Please upload any relevan documents that provide proof of
            recognition, such as badges, certificates or membership letters
            (expired sertifications are not accepted)
          </p>
          <FormField
            control={form.control}
            name="sustainabilityCertificationFile"
            render={({ field }) => (
              <FormItem className="mt-2">
                <div className="sm:w-1/2 sm:pr-2">
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
                      field.onChange(e.target.files ? e.target.files[0] : null);
                    }}
                  />
                </FormControl>
                <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                  <img className="" src="/upload.svg" />
                  {field.value ? field.value.name : 'Upload PDF(front&back)'}
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
