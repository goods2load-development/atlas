"use client";
import React, { useEffect } from "react";
import { useCurrenciesStore } from "@/lib/filterStore";
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
  SelectGroup,
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
  const { selectedCurrency, currencies, setCurrency } = useCurrenciesStore(
    (state: any) => state
  );
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
      currency: selectedCurrency.code,
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
        <div className="sm:flex flex-row items-stretch mb-5">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="mr-3 w-full mb-5">
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
              <FormItem className="mr-3 w-full mb-5">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.currency}
                  >
                    <SelectTrigger className="bg-gray-2 border-transparent outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <span className="text-[12px] text-gray-500">
                          Popular
                        </span>
                        {currencies?.map((item: any, index: number) => (
                          <>
                            <SelectItem key={item.code} value={item.code}>
                              <span>
                                {item.code} - {item.symbol}
                              </span>
                            </SelectItem>
                            {index === 2 && (
                              <span className="block w-full border-t-2 text-[12px] text-gray-500">
                                Others
                              </span>
                            )}
                          </>
                        ))}
                      </SelectGroup>
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
