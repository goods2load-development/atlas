'use client';

import { useForgotPasswordStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function ForgotPassword() {
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const { postForgotPasswordData } = useForgotPasswordStore(
    (state: any) => state,
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    postForgotPasswordData(values).then(() =>
      toast({
        title: 'Reset password',
        description:
          "We've sent you an email. Please check your Inbox to reset your password",
        variant: 'default',
        className: 'bg-green-500 text-white',
      }),
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full mb-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-2 border-0"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-full my-5"
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
