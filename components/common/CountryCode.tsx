"use client";
import CountryList from "country-list-with-dial-code-and-flag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CountryCode(props: any) {
  const phoneCodes = CountryList.getAll();
  // TODO codes sorting
  // .sort((a, b) => {
  //   if (a.countryCode < b.countryCode) {
  //     return -1;
  //   } else if (a.countryCode >   b.countryCode) {
  //     return 1;
  //   }
  //   return 0;
  // });

  // TODO change for combobox
  return (
    <Select
      onValueChange={props.onChange}
      defaultValue={phoneCodes[0].countryCode}
    >
      <SelectTrigger className={props.className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {phoneCodes.map((item: any, index: number) => (
          <SelectItem
            key={`${item.countryCode}-${index}`}
            value={item.countryCode}
          >
            {item.flag}
            {item.countryCode}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
