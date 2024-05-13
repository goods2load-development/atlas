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

export default function Login() {
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
  useEffect(() => {
    if (!!user?.id) redirect("/account");
  }, [user?.id]);
  return (
    <LoginWrapper>
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
