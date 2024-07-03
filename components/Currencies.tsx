"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/lib/store";
import { useCurrenciesStore } from "@/lib/filterStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Currencies() {
  const { user, updateUser } = useUserStore((state: any) => state);

  const { selectedCurrency, currencies, getCurrencies, setCurrency } =
    useCurrenciesStore((state: any) => state);

  function onChange(value: string) {
    setCurrency(currencies.find((item: any) => item.code === value));
    if (user?.id) updateUser({ currency: value });
  }
  useEffect(() => {
    if (!currencies.length) getCurrencies();
  }, []);
  return (
    <Select
      value={user?.id ? user.currency : selectedCurrency.code}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-[26px] px-[15px] border-none bg-white bg-opacity-10 rounded-[10px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <span className="text-[12px] text-gray-500">Popular</span>
          {currencies?.map((item: any, index: number) => (
            <>
              <SelectItem key={item.code} value={item.code}>
                {item.code} - {item.symbol}
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
  );
}
