import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const FormAboutUs = ({ form }: { form: any }) => {
  return (
    <>
      <div>
        <h4 className="text-[20px]/[24px] mb-4 tracking-wide font-bold">
          About Us
        </h4>
        <FormField
          control={form.control}
          name="aboutUs"
          render={({ field }) => (
            <FormItem className="w-full mb-10">
              <FormDescription>
                Provide a brief description of your company and core services
                (max 150 words). This will appear on your partner page, helping
                SMEs and other visitors understand your expertise and strengths.
                Use this opportunity to showcase what makes you a valuable
                logistics partner and connect with potential clients on the
                GOODS2LOAD platform.
              </FormDescription>
              <FormControl>
                <Textarea
                  maxLength={150}
                  minLength={80}
                  className="bg-gray-2 border-0 min-h-[150px]"
                  {...field}
                  onBlur={() => form.trigger('aboutUs')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <h4 className="text-[20px]/[24px] mb-4 tracking-wide font-bold">
          Our mission
        </h4>
        <FormField
          control={form.control}
          name="ourMission"
          render={({ field }) => (
            <FormItem className="w-full mb-5">
              <FormDescription>
                Please provide keywords with hashtags (e.g., #sustainability,
                #innovation, #efficiency, #customerfocus) that capture your
                mission&apos;s essence. Consider what sets your services apart
                and how you aim to impact the logistics industry, as these will
                help potential clients understand your core values.
              </FormDescription>
              <FormControl>
                <Textarea
                  maxLength={150}
                  minLength={80}
                  className="bg-gray-2 border-0 min-h-[150px]"
                  {...field}
                  onBlur={() => form.trigger('ourMission')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
