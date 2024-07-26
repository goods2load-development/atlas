import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Transportation } from "@/app/interface/dashboard";

export interface RadioGroupItemsProps {
  onChangeValue?: (value: Transportation) => void;
}

export default function RadioGroupItems({
  onChangeValue,
}: RadioGroupItemsProps) {
  return (
    <form className="my-2 mb-4 lg:mb-10">
      <div className="flex items-center gap-3 test-radio justify-center md:justify-start">
        <RadioGroup
          onValueChange={onChangeValue}
          defaultValue={Transportation.PLANE}
          className={`flex custom-radio catalogue`}
        >
          <CustomRadioGroupItem value={Transportation.PLANE} imageNumber={1} />
          <CustomRadioGroupItem value={Transportation.FERRY} imageNumber={2} />
          <CustomRadioGroupItem value={Transportation.TRUCK} imageNumber={3} />
        </RadioGroup>
      </div>
    </form>
  );
}

const CustomRadioGroupItem = ({ value, imageNumber }: any) => {
  return (
    <>
      <RadioGroupItem value={value} id={value} className="hidden" />
      <Label htmlFor={value}>
        <Image
          src={`/filtericon${imageNumber}.svg`}
          alt={value}
          width={58}
          height={58}
          className={"cursor-pointer text-black"}
        />
      </Label>
    </>
  );
};
