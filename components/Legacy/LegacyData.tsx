import LegacyBlock from "./LegacyBlock";
import { ILegacyDataBlock } from "./types";
import { generateBlockId } from "@/lib/utils";

export default function LegacyData({ data }: { data: ILegacyDataBlock[] }) {
  return (
    <div className="grid gap-8">
      {data.map(({ title, body }, index) => (
        <div key={index} id={generateBlockId(title)} className="grid gap-4">
          {title && (
            <h2 className="text-[28px] font-medium font-poppins">{title}</h2>
          )}
          <LegacyBlock content={body} />
        </div>
      ))}
    </div>
  );
}
