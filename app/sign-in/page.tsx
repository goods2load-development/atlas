"use client";
import React, { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginWrapper from "@/components/LoginWrapper";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleIcon from "@/assets/AuthProviderLogos/GoogleIcon";
import Divider from "@/components/Divider";

interface Props {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}

export default function Login({ searchParams: { callbackUrl, error } }: Props) {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { user, postLoginData } = useUserStore((state: any) => state);
  function onSubmit(values: z.infer<typeof formSchema>) {
    postLoginData(values);
  }

  const signInWithGoogle = () => {
    signIn("google", { callbackUrl, redirect: true });
  };

  useEffect(() => {
    if (!!user?.id) redirect("/account");
  }, [user?.id]);
  return (
    <LoginWrapper>
      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="flex gap-2 justify-center w-full border-orangePrimary text-[16px]/[24px] font-semibold p-[18px] h-[60px]"
      >
        <GoogleIcon />
        <span>Sign in with Google </span>
      </Button>
      {error ? (
        <p className="my-2 text-sm text-center font-medium text-destructive">
          Something went wrong, please try again
        </p>
      ) : (
        <></>
      )}
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
                  <Input
                    className="bg-gray-2 border-0"
                    placeholder=""
                    type="password"
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
            Don&apos;t have an account?{" "}
            <Link href="/registration" className="text-orangePrimary">
              Sign up for free
            </Link>
          </p>
        </form>
      </Form>
    </LoginWrapper>
  );
}
