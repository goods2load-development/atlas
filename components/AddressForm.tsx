'use client';

import { useCountriesStore } from '@/lib/store';
import { useUserStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect } from 'react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CountriesProps {
  value: string;
  label: string;
}

interface AddressFormProps {
  onCancel: () => void;
  country: string;
  city: string;
  companyName: string;
  postalCode: string;
  address: string;
}

export default function AddressForm(props: AddressFormProps) {
  // TODO finalize validation schema
  const formSchema = z.object({
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
    companyName: z.string(),
  });
  const { countriesList, getCountriesList } = useCountriesStore(
    (state: any) => state,
  );
  const { user, updateUser } = useUserStore((state: any) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: props.country,
      city: props.city,
      companyName: props.companyName,
      postalCode: props.postalCode,
      address: props.address,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(values);
    props.onCancel();
  }
  useEffect(() => {
    if (!countriesList.length) getCountriesList();
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="sm:flex flex-row items-stretch mb-5">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.country}
                  >
                    <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesList.map((item: any) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input className="bg-gray-2 border-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input className="bg-gray-2 border-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>Postal / ZIP code</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-2 border-0"
                    placeholder="XXX XXX"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
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
