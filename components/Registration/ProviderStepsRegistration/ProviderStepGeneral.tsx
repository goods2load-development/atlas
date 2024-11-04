import { IsRequired } from '../Registration';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToolTipComponent } from '@/components/ui/tooltip';

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
            <div className="flex gap-2 items-center">
              {' '}
              <FormLabel className="font-light sm:font-normal">
                Google Business Profile
                <IsRequired />
              </FormLabel>{' '}
              <ToolTipComponent
                text={
                  <>
                    How do I find my Google business profile link? <br />
                    Log in using the Google account associated with your
                    business. <br />
                    Once logged in, you'll see your business dashboard. Look for
                    the “Share your Business Profile” button on the <br />
                    right side of the screen. Click this button to reveal your
                    Google Business Profile URL.
                  </>
                }
              />
            </div>
            <FormControl>
              <Input
                className="bg-gray-2 border-0"
                placeholder="https://maps.app.goo.gl/XhPCaVAFQc7cPqg5A"
                {...field}
                onBlur={() => {
                  trigger('googleBusinessProfile');
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
