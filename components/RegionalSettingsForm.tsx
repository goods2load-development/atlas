"use client";
import React, { useEffect } from "react";
import CurrencyList from 'currency-list';
import { useCountriesStore } from "@/lib/store";
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
import UIButton from "@/components/common/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountriesProps {
  value: string;
  label: string;
}

interface AddressFormProps {
  onCancel: () => void;
  language: string;
  currency: string;
  country: string;
}

const localization = [
  {
    code: "en",
    name: "English",
    icon: "./",
    data: {
      header: {},
      hello: "Hallo",
      goodbye: "Auf Wiedersehen",
      thank_you: "Danke schön",
    },
  },
  {
    code: "de",
    name: "Deutsche",
    icon: "./",
    data: {
      header: {},
      hello: "Hallo",
      goodbye: "Auf Wiedersehen",
      thank_you: "Danke schön",
    },
  },
];

export default function RegionalSettingsForm(props: AddressFormProps) {
  const currencies = CurrencyList.getAll('en_US');
  const formSchema = z.object({
    language: z.string(),
    currency: z.string(),
    country: z.string(),
  });

  const { countriesList, getCountriesList } = useCountriesStore(
    (state: any) => state
  );

  const { user, updateUser } = useUserStore((state: any) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: props.language,
      currency: props.currency,
      country: props.country,
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
        <div className="flex flex-row items-stretch mb-5">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="mr-3 w-full">
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.language}
                  >
                    <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {localization.map((item: any) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
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
            name="currency"
            render={({ field }) => (
              <FormItem className="mr-3 w-full">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.country}
                  >
                    <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(currencies).map((key: any) => (
                          <SelectItem key={`code_${currencies[key].code}`} value={(currencies[key].code as string)}>
                            {(currencies[key].name as string)} {(currencies[key].symbol as string)}
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
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
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
                      {countriesList.map((item: string) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <UIButton
            type="submit"
            className="mr-3"
          >
            Save
          </UIButton>
          <UIButton
            onClick={props.onCancel}
            secondary
          >
            Cancel
          </UIButton>
        </div>
      </form>
    </Form>
  );
}
