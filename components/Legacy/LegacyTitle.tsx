export default function LegacyTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div>
      <h1 className="text-[34px]/[38px] sm:text-[48px] text-center font-poppins italic">
        {title}
      </h1>
      {subTitle && (
        <p className="text-[20px] sm:text-[32px] pt-[16px] font-light text-center font-poppins">
          {subTitle}
        </p>
      )}
    </div>
  );
}
