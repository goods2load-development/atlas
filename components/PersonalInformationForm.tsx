'use client';

import { useUserStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import UIButton from '@/components/common/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function PersonalInformationForm(props: any) {
  // TODO finalize validation schema
  const formSchema = z.object({
    phoneNumber: z.string(),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: props.email,
      phoneNumber: props.phoneNumber,
    },
  });
  const { user, updateUser } = useUserStore((state: any) => state);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(values);
    props.onCancel();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="sm:flex flex-row items-stretch mb-5">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input className="bg-gray-2 border-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="bg-gray-2 border-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <UIButton type="submit" className="mr-3">
            Save
          </UIButton>
          <UIButton onClick={props.onCancel} secondary>
            Cancel
          </UIButton>
        </div>
      </form>
    </Form>
  );
}
