'use client';

import GoogleIcon from '@/assets/AuthProviderLogos/GoogleIcon';
import { useUserStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';

import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { getCookie } from 'react-use-cookie';
import { z } from 'zod';

import Divider from '@/components/Divider';
import InputPassword from '@/components/common/InputPassword';
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

export default function SignIn() {
  const [cookies] = useCookies(['accessToken']);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { user, postLoginData, authenticateUser } = useUserStore(
    (state: any) => state,
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('login');
    postLoginData({ ...values, recaptchaToken: token });
  }

  const signInWithGoogle = () => {
    signIn('google', {
      callbackUrl: callbackUrl || process.env.NEXT_PUBLIC_BASE_URL,
      redirect: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cookies.accessToken) {
        const token = getCookie('accessToken');
        const decodedToken = await getSession({
          req: { headers: { cookie: `accessToken=${token}` } },
        });
        if (decodedToken) {
          const { idToken }: any = decodedToken;
          authenticateUser(idToken);
        }
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  useEffect(() => {
    if (!!user?.id) redirect('/account');
  }, [user?.id]);

  return (
    <>
      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="flex gap-2 justify-center w-full border-orangePrimary text-[16px]/[24px] font-semibold p-[18px] h-[60px]"
      >
        <GoogleIcon />
        <span>Sign in with Google </span>
      </Button>

      <Divider />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full mb-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    className="bg-gray-2 border-0"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/forgot-password" className="text-[12px]/[16px]">
            Forgot your password?
          </Link>
          <Button
            type="submit"
            className="bg-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-full my-5"
          >
            Sign in
          </Button>
          <p className="text-[12px]/[16px] text-center">
            Don&apos;t have an account?{' '}
            <Link href="/registration" className="text-orangePrimary">
              Sign up for free
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
}
