import LegacyBG from './LegacyBG';
import LegacyData from './LegacyData';
import LegacyTitle from './LegacyTitle';
import { ILegacyPage } from './types';

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
