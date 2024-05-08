export default function LegacyTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div>
      <h1 className="text-[48px] text-center font-poppins italic">{title}</h1>
      {subTitle && (
        <p className="text-[32px] text-center font-poppins">{subTitle}</p>
      )}
    </div>
  );
}
