'use client';

import { dateValues } from './constants';
import { OrderRoute } from './types';
import { toNormalText } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Reply } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  reasons: z.array(z.string()),
  message: z.string().max(1000),
});

const ReplyDialog = ({
  order,
  onSubmitCallback,
}: {
  order: OrderRoute;
  onSubmitCallback: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reasons: [],
    },
  });
  const { setValue, getValues } = form;
  const reasons = getValues('reasons');
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<null | string>(null);

  const onChangeReason = (isChecked: boolean, field: string) => {
    if (isChecked) return setValue('reasons', [...reasons, field]);
    if (!isChecked)
      setValue(
        'reasons',
        reasons.filter((item) => item !== field),
      );
  };

  const { watch } = form;

  const incorectFileds = watch('reasons');

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmitCallback(data).then(() => {
      setIsOpen(false);
      form.reset();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onCloseClick={() => setIsOpen(false)}
        className="p-8 max-h-[540px] overflow-y-scroll"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Reply
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Select onValueChange={setSelectValue}>
                <FormControl className="max-w-[526px] w-full text-white font-bold h-[50px] bg-primaryOrange border-none rounded-[8px] px-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="incorrect-fields">
                    Incorrect fields
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectValue && (
              <>
                {selectValue === 'incorrect-fields' && (
                  <div className="grid grid-cols-2 gap-1 mb-2">
                    {Object.entries(order).map(([key, value]) => {
                      if (['id'].includes(key)) return null;
                      const val = dateValues.includes(key as string)
                        ? format(value, 'MM/dd/yyyy')
                        : value;
                      return (
                        <FormItem key={key} className="flex space-x-3">
                          <Checkbox
                            onCheckedChange={(isChecked) =>
                              onChangeReason(isChecked as boolean, key)
                            }
                            id={key}
                            className="mt-2"
                          />
                          <FormLabel
                            htmlFor={key}
                            className="text-sm font-medium whitespace-normal max-w-full"
                          >
                            <strong>{toNormalText(key)}</strong> (
                            {val.toString()})
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mb-4">
                      <FormControl>
                        <Textarea
                          className="bg-gray-2 border-0 min-h-[120px]"
                          placeholder="Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              disabled={!selectValue}
              type="submit"
              className="bg-primaryOrange w-full max-w-[521px] mx-auto rounded-[16px] text-center pt-[30px] pb-[30px] text-white text-[16px] font-medium"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} title="Reply">
          <Reply />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ReplyDialog;
