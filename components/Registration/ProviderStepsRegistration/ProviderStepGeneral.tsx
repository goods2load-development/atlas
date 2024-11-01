import { IsRequired } from '../Registration';

import clsx from 'clsx';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const FormStepGeneral = ({ form }: { form: any }) => {
  const { trigger } = form;

  return (
    <>
      <h4 className="mb-10">
        <strong>
          All companies must have a Google Business Profile with reviews.
        </strong>{' '}
        If your company does not have one, you are required to create it before
        enrollment.{' '}
        <strong>Google Business Profile to link the review api:</strong>
      </h4>

      <FormField
        control={form.control}
        name="googleBusinessProfile"
        render={({ field }) => (
          <FormItem className="w-full mb-5">
            <FormLabel className="font-light sm:font-normal">
              Google Business Profile
              <IsRequired />
            </FormLabel>
            <FormControl>
              <Input
                className="bg-gray-2 border-0"
                placeholder="Short answer text"
                {...field}
                onBlur={() => {
                  trigger('googleBusinessProfile');
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
