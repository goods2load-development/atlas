import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Input } from "./input";
import { PopoverContent, PopoverTrigger } from "./popover";
import clsx from "clsx";

const Autocomplete = ({
  className,
  data,
  setOuterPick,
  defaultValue,
  ...props
}: {
  data: string[];
  className?: string;
  setOuterPick?: (pick: string | null) => void;
  defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const [pick, setPick] = useState<string | null>(defaultValue || null);
  const [value, setValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!value) return setSuggestions(data);

    setFilteredData(value);
  }, [value]);

  useEffect(() => {
    if (setOuterPick) setOuterPick(pick);
  }, [pick]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setValue(inputValue);

    setFilteredData(inputValue);
  };

  const setFilteredData = (inputValue: string) => {
    const filteredSuggestions = data.filter((item) =>
      item.toLowerCase().includes(inputValue)
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="relative w-full">
      <Popover.Root open>
        <PopoverTrigger asChild>
          <Input
            className={clsx("bg-gray-2 border-0", className)}
            ref={inputRef}
            type="text"
            placeholder="Type to search..."
            {...props}
            value={value}
            onFocus={(e) => {
              setIsOpen(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setTimeout(() => setIsOpen(false), 200);
              if (props.onBlur) props.onBlur(e);
            }}
            onChange={(e) => {
              handleChange(e);
              if (props.onChange) props.onChange(e);
            }}
          />
        </PopoverTrigger>

        <PopoverContent
          className={clsx("p-1 max-h-[170px] !overflow-y-scroll", {
            hidden: !isOpen,
          })}
          style={{
            width: `${inputRef.current?.offsetWidth}px`,
          }}
        >
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setValue(item);
                setPick(item);
                setIsOpen(false);
              }}
              className="text-sm px-2 py-1 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </div>
          ))}
          {!suggestions.length && (
            <div className="text-sm px-2 py-1 cursor-pointer hover:bg-gray-100">
              Not found.
            </div>
          )}
        </PopoverContent>
      </Popover.Root>
    </div>
  );
};

export default Autocomplete;
