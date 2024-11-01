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
  const { clearErrors } = form;
  const [isProvideRecognition, setIsProvideRecognition] = useState(true);

  useEffect(() => {
    if (!isProvideRecognition) {
      form.setValue('industryRecognitionsSecondary', []);
      form.setValue('industryProofFileSecondary', undefined);
    }
  }, [isProvideRecognition]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-semibold">
        <h4 className={clsx('tracking-wide text-[24px]/[27px]')}>
          Additional Validations
          <IsRequired />
        </h4>
        <Switch
          checked={isProvideRecognition}
          onCheckedChange={() => setIsProvideRecognition((prev) => !prev)}
        />
      </div>

      <div
        className={clsx('my-4', {
          'opacity-40 pointer-events-none': isProvideRecognition,
        })}
      >
        <FormField
          control={form.control}
          name="industryRecognitionsSecondary"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <div className="mt-4 mb-2 flex flex-col gap-2 text-[14px]">
                  <FormMessage className="mb-2" />
                  <p className={clsx('text-[14px]')}>
                    <span>
                      Please select the industry recognition your complany has
                      received (check all the apply)
                    </span>
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
                  multiple
                  accept="application/pdf, image/*"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      field.onChange(e.target.files || null);
                      clearErrors('industryProofFileSecondary');
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
              </FormControl>
              <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                <img className="" src="/upload.svg" />
                {field.value
                  ? `(${field.value?.length}) Files`
                  : `Upload ${field?.value?.length || ''} Files(front&back)`}
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="mt-12 text-[14px]">
        <strong className="text-[16px]">Sustainability</strong>

        <p className="block my-4">
          This certification is essential for companies we engage with,
          reflecting a commitment to sustainable, eco-friendly practices.
          Partnering with certified companies strengthens our brand reputation,
          assures compliance with environmental standards, and builds customer
          trust. By prioritizing sustainability, we position ourselves as a
          forward-thinking company dedicated to excellence and environmental
          responsibility.
        </p>

        {/* <FormField
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
        /> */}

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
