import Logo from "@/components/Logo";
import Socials from "@/components/Socials";

const MobileFooter = () => {
  return (
    <div className="bg-primaryOrange flex flex-col items-center gap-4 py-6 sm:hidden">
      <Logo width={175.35} height={24.7} />
      <Socials container="py-0 mt-[16px] mb-0" />
    </div>
  );
};

export default MobileFooter;
