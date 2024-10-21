'use client';

import React, { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ButtonProps {
  value: string;
  items: any[];
  onSelect: () => void;

  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset';
  onClick?: () => void;
  secondary?: boolean;
}

export default function ComboBox(props: ButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="rounded-l-xl rounded-r-none border-none font-normal text-black w-full"
          >
            {props.value || 'Select country'}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {props.items.map((item: any, index: number) => (
              <CommandItem
                value={`${item.value}`}
                key={index}
                onSelect={props.onSelect}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
