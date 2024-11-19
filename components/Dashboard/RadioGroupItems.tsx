import { useAnalyticsStore } from '@/lib/analyticsStore';
import { DeliveryBy } from '@/lib/filterStore';

import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export interface RadioGroupItemsProps {
  onChangeValue?: (value: DeliveryBy) => void;
}

export default function RadioGroupItems({
  onChangeValue,
}: RadioGroupItemsProps) {
  const { deliveryBy } = useAnalyticsStore();

  return (
    <form className="my-2 mb-4 lg:mb-10">
      <div className="flex items-center gap-3 test-radio justify-center md:justify-start">
        <RadioGroup
          onValueChange={onChangeValue}
          defaultValue={deliveryBy}
          className={`flex custom-radio catalogue`}
        >
          <CustomRadioGroupItem value={DeliveryBy.plane} imageNumber={1} />
          <CustomRadioGroupItem value={DeliveryBy.ferry} imageNumber={2} />
          <CustomRadioGroupItem value={DeliveryBy.truck} imageNumber={3} />
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
          className={'cursor-pointer text-black'}
        />
      </Label>
    </>
  );
};
