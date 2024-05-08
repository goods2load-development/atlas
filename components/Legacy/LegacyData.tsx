import { ILegacyDataBlock } from "./types";
import LegacyBlock from "./LegacyBlock";

export default function LegacyData({ data }: { data: ILegacyDataBlock[] }) {
  return (
    <div className="grid gap-8">
      {data.map(({ id, title, body }) => (
        <div key={id} className="grid gap-4">
          {title && (
            <h2 className="text-[28px] font-medium font-poppins">{title}</h2>
          )}
          <LegacyBlock content={body} />
        </div>
      ))}
    </div>
  );
}
