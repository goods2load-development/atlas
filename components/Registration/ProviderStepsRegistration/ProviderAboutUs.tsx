import {
  FormControl,
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
