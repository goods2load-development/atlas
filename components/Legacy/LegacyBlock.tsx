import { OrderedList, Paragraph, UnorderedList } from "./blocks";
import LegacyTable from "./blocks/LegacyTable";
import { ILegacyDataBlockBody, ILegacyDataBlockBodyType } from "./types";

export default function LegacyBlock({
  content,
}: {
  content: ILegacyDataBlockBody[];
}) {
  return (
    <div className="grid gap-[26px] [&_b]:font-medium [&_b]:italic [&_a]:font-medium [&_a]:italic [&_a]:underline">
      {content.map((bodyItem) => {
        switch (bodyItem.type) {
          case ILegacyDataBlockBodyType.PARAGRAPH:
            return <Paragraph key={bodyItem.id} {...bodyItem} />;
          case ILegacyDataBlockBodyType.OLIST:
            return <OrderedList key={bodyItem.id} {...bodyItem} />;
          case ILegacyDataBlockBodyType.ULIST:
            return <UnorderedList key={bodyItem.id} {...bodyItem} />;
          case ILegacyDataBlockBodyType.TABLE:
            return <LegacyTable key={bodyItem.id} {...bodyItem} />;
          default:
            return <></>;
        }
      })}
    </div>
  );
}
