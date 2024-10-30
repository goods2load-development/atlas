import { IsRequired } from '../Registration';
import { usePartnersStore } from '@/lib/store';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

export const FormStepIndustries = ({ form }: { form: any }) => {
  const { partnersIndustriesData } = usePartnersStore();

  return (
    <>
      <h3 className="mb-4 text-[20px]/[24px]">
        Services Offered <IsRequired />
      </h3>
      <p className="mb-4 text-[14px]/[17px]">
        Please select the services your company specializes in (check all that
        apply):
      </p>

      <FormField
        control={form.control}
        name="industries"
        render={({ field }) => (
          <div className="flex flex-col gap-10 my-10">
            {partnersIndustriesData &&
              partnersIndustriesData.map(({ label, items }) => {
                return (
                  <FormItem key={label} className="mt-3 sm:mt-0">
                    <FormLabel className="font-light sm:font-normal">
                      {label}
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {items &&
                          items.map((item) => {
                            return (
                              <label
                                key={item}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  value={item}
                                  checked={field.value?.includes(item) || false}
                                  onCheckedChange={(checked) => {
                                    const value = item;
                                    const newValue = checked
                                      ? [...(field.value || []), value]
                                      : field.value?.filter(
                                          (v: string) => v !== value,
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
                );
              })}
          </div>
        )}
      />
    </>
  );
};
