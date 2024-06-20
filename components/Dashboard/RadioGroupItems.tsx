import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function RadioGroupItems() {
  function CustomRadioGroupItem({ value, imageNumber }: any) {
    return (
      <>
        <RadioGroupItem value={value} id={value} className="hidden" />
        <Label htmlFor={value}>
          <Image
            src={`/filtericon${imageNumber}.png`}
            alt="plane"
            width={58}
            height={58}
            className={"cursor-pointer text-black"}
          />
        </Label>
      </>
    );
  }
  return (
    <form className="my-2 mb-4 lg:mb-10">
      <div className="flex items-center gap-3 test-radio justify-center md:justify-start">
        <RadioGroup
          defaultValue={"plane"}
          className={`flex custom-radio catalogue`}
        >
          <CustomRadioGroupItem value="plane" imageNumber={1} />
          <CustomRadioGroupItem value="ship" imageNumber={2} />
          <CustomRadioGroupItem value="truck" imageNumber={3} />
        </RadioGroup>
      </div>
    </form>
  );
}
