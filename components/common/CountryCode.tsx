'use client';

import React, { useState } from 'react';

import CountryList from 'country-list-with-dial-code-and-flag';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CountryCode(props: any) {
  const phoneCodes = CountryList.getAll();
  function filter(value: string, search: string) {
    if (value.includes(search.toLocaleLowerCase())) return 1;
    else return 0;
  }
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={props.className + ' w-full px-1'}
          onClick={() => setOpen(true)}
        >
          {selected ? (
            <span className="block w-full truncate">
              {selected.flag}
              {selected.countryCode}
            </span>
          ) : (
            <span className="text-gray-500">Select</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-full p-0">
        <Command filter={filter}>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <ScrollArea className="h-72 w-full">
            <CommandGroup>
              {phoneCodes.map((item: any, index: number) => (
                <CommandItem
                  value={`${item.countryCode}`}
                  key={index}
                  onSelect={() => {
                    props.onChange(item.countryCode);
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item.flag}
                  {item.countryCode}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
