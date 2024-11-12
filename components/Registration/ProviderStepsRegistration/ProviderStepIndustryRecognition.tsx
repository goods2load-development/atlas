import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

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

export interface IndustryRecognition {
  code: string;
  name: string;
}

const industryRecognitions = [
  {
    code: 'FIATA',
    name: 'International Federation of Freight Forwarders Associations',
  },
  { code: 'WCA', name: 'World Cargo Alliance' },
  { code: 'IATA', name: 'International Air Transport Association' },
  { code: 'TIA', name: 'Transportation Intermediaries Association' },
  { code: 'BIFA', name: 'British International Freight Association' },
  {
    code: 'NCBFAA',
    name: 'National Customs Brokers & Forwarders Association of America',
  },
  { code: 'JIFFA', name: 'Japan International Freight Forwarders Association' },
  { code: 'CIFA', name: 'China International Freight Forwarders Association' },
  { code: 'AFIF', name: 'Australian Federation of International Forwarders' },
  {
    code: 'FFFAI',
    name: 'Federation of Freight Forwarders’ Associations in India',
  },
  { code: 'ALACAT', name: 'Latin American Association of Freight Forwarders' },
  { code: 'SAFFA', name: 'South African Freight Forwarders Association' },
  {
    code: 'CIFFA',
    name: 'Canadian International Freight Forwarders Association',
  },
  { code: 'SFFA', name: 'Singapore Freight Forwarders Association' },
  {
    code: 'TAFFA',
    name: 'Transport and Freight Forwarders Association of Australia',
  },
  { code: 'ANFFA', name: 'Australian National Freight Forwarders Association' },
  { code: 'ACAAI', name: 'Air Cargo Agents Association of India' },
  { code: 'NAFL', name: 'National Association of Freight Logistics' },
  { code: 'AMACARGA', name: 'Asociación Mexicana de Agentes de Carga' },
  {
    code: 'UTICAD',
    name: 'International Transport and Logistics Service Providers Association',
  },
  { code: 'VLA', name: 'Victorian Logistics Association' },
  {
    code: 'ADDV',
    name: 'Association of German Freight Forwarders and Logistics',
  },
  {
    code: 'UNCTAD',
    name: 'United Nations Conference on Trade and Development',
  },
  {
    code: 'FIDI',
    name: 'Fédération Internationale des Déménageurs Internationaux',
  },
  { code: 'APSA', name: 'Asian Pacific Shipping Association' },
  { code: 'SFFLA', name: 'South Florida Freight Logistics Association' },
  {
    code: 'FAFA',
    name: 'Freight and Forwarders Association of the Philippines',
  },
  { code: 'KFFA', name: 'Korean Freight Forwarders Association' },
  { code: 'ZFFA', name: 'Zambia Freight Forwarders Association' },
  { code: 'FFNZ', name: 'Freight Forwarders New Zealand' },
  { code: 'FAPAA', name: 'Federation of Asia Pacific Aircargo Associations' },
  { code: 'MALCA', name: 'Malca-Amit' },
  { code: 'VLA', name: 'Vermont Logistics Association' },
  { code: 'AFFA', name: 'Association of Freight Forwarders of America' },
  { code: 'FENEX', name: 'Federation of Netherlands Freight Forwarders' },
  { code: 'ACFA', name: 'Association of Cargo Freight Agents' },
  { code: 'ABOL', name: 'Association of Bulgarian Freight Forwarders' },
  { code: 'CEB', name: 'Cargo Executive Board' },
  {
    code: 'HAFFA',
    name: 'Hong Kong Association of Freight Forwarding and Logistics',
  },
  { code: 'ANCLA', name: 'Asociación Nacional de Agentes Aduanales de México' },
  { code: 'SFFL', name: 'South Florida Freight Logistics' },
  { code: 'GLA', name: 'Global Logistics Alliance' },
  {
    code: 'ALNA',
    name: 'Australian Logistics and National Transport Association',
  },
  { code: 'FAFGA', name: 'Federation of Freight Forwarders of Ghana' },
  { code: 'TLF', name: 'Transport Logistics Forum' },
  { code: 'Other', name: 'Please specify which recognized association' },
];

export const FormStepIndustryRecognition = ({
  form,
  setIsFreightDisabled,
}: {
  form: any;
  setIsFreightDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isProvideRecognition, setIsProvideRecognition] = useState(true);

  const industryRecognitionsWatch = form.watch('industryRecognitions');

  useEffect(() => {
    if (!isProvideRecognition) return setIsFreightDisabled(false);

    setIsFreightDisabled(!industryRecognitionsWatch?.length);
  }, [industryRecognitionsWatch, isProvideRecognition, setIsFreightDisabled]);

  useEffect(() => {
    if (!isProvideRecognition) {
      form.setValue('industryRecognitions', []);
      form.setValue('industryProofFile', undefined);
    }
  }, [isProvideRecognition]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 font-semibold">
        <h4
          className={clsx(
            'tracking-wide text-[24px]/[27px]',
            !isProvideRecognition && 'opacity-40',
          )}
        >
          Industry Recognition
        </h4>
        <Switch
          checked={isProvideRecognition}
          onCheckedChange={() => setIsProvideRecognition((prev) => !prev)}
        />
      </div>

      <p className={clsx('', !isProvideRecognition && 'opacity-40')}>
        Industry Recognition & Association Memberships Please provide details of
        any industry recognitions and certifications, or memberships in
        professional associations your currently company holds{' '}
        <strong>(expired certifications are not accepted)</strong>
      </p>

      <div className={clsx('my-4', !isProvideRecognition && 'opacity-40')}>
        <FormField
          control={form.control}
          name="industryRecognitions"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <div className="my-4 flex flex-col gap-2 text-[14px]">
                  {industryRecognitions.map((item: any, idx: number) => {
                    return (
                      <label
                        key={item.name + idx}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          disabled={!isProvideRecognition}
                          value={item.name}
                          checked={field.value?.includes(item.name)}
                          onCheckedChange={(checked) => {
                            const value = item.name;
                            const newValue = checked
                              ? [...(field.value || []), value]
                              : field.value?.filter(
                                  (v: string) => v !== item.name,
                                ) || [];
                            field.onChange(newValue);
                          }}
                        />
                        <span>
                          {item.code} ({item.name})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className={clsx('mt-8', !isProvideRecognition && 'opacity-40')}>
        <div className="font-bold">Proof of recognition</div>
        <p className="mt-2 text-[14px]">
          Please upload any relevan documents that provide proof of recognition,
          such as badges, certificates or membership letters (expired
          sertifications are not accepted)
        </p>
        <FormField
          control={form.control}
          name="industryProofFile"
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
                    field.onChange(e.target.files || null);
                  }}
                />
              </FormControl>
              <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                <Image width={16} height={16} src="/upload.svg" alt="upload" />
                {field.value
                  ? `(${field.value.length}) Files`
                  : `Upload ${field?.value?.length || ''} Files(front&back)`}
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
