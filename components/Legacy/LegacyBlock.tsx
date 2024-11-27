import { OrderedList, Paragraph, UnorderedList } from './blocks';
import LegacyTable from './blocks/LegacyTable';
import { ILegacyDataBlockBody, ILegacyDataBlockBodyType } from './types';

export default function LegacyBlock({
  content,
}: {
  content: ILegacyDataBlockBody[];
}) {
  return (
    <div className="grid gap-[26px] [&_b]:font-medium [&_b]:italic [&_a]:font-medium [&_a]:italic [&_a]:underline">
      {content.map((bodyItem, index) => {
        switch (bodyItem.type) {
          case ILegacyDataBlockBodyType.PARAGRAPH:
            return <Paragraph key={index} {...bodyItem} />;
          case ILegacyDataBlockBodyType.OLIST:
            return <OrderedList key={index} {...bodyItem} />;
          case ILegacyDataBlockBodyType.ULIST:
            return <UnorderedList key={index} {...bodyItem} />;
          case ILegacyDataBlockBodyType.TABLE:
            return <LegacyTable key={index} {...bodyItem} />;
          default:
            return <></>;
        }
      })}
    </div>
  );
}
