import LegacyBG from "./LegacyBG";
import { ILegacyPage } from "./types";
import LegacyTitle from "./LegacyTitle";
import LegacyData from "./LegacyData";

export default function LegacyPage({ title, subTitle, bg, data }: ILegacyPage) {
  return (
    <>
      <LegacyBG {...bg} />
      <div className="grid gap-[48px] px-5 py-[40px] sm:p-[72px_80px]">
        <LegacyTitle title={title} subTitle={subTitle} />
        <LegacyData data={data} />
      </div>
    </>
  );
}
