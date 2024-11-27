'use client';

import { useForgotPasswordStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter, useSearchParams } from 'next/navigation';
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

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');
  const formSchema = z
    .object({
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const { postResetPasswordData } = useForgotPasswordStore(
    (state: any) => state,
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      password: values.password,
      userId: id,
      token,
    };
    postResetPasswordData(data).then(() => {
      router.push('/sign-in');
      toast({
        description: 'Password changed successfully',
        variant: 'default',
        className: 'bg-green-500 text-white',
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full mb-1">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-2 border-0"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full mb-1">
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-2 border-0"
                  type="password"
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
          Reset
        </Button>
      </form>
    </Form>
  );
}
