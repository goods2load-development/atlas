import LegacyBG from "./LegacyBG";
import { ILegacyPage } from "./types";
import LegacyTitle from "./LegacyTitle";
import LegacyData from "./LegacyData";

export default function LegacyPage({ title, subTitle, bg, data }: ILegacyPage) {
  return (
    <>
      <LegacyBG {...bg} />
      <div className="grid gap-[48px] py-[40px] sm:py-[72px] px-[16px] max-w-[1328px] mx-auto">
        <LegacyTitle title={title} subTitle={subTitle} />
        <LegacyData data={data} />
      </div>
    </>
  );
}
