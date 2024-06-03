import Link from "next/link";
import Image from "next/image";

export default function Socials() {
  return (
    <div className="flex py-14">
      <Link
        href="https://www.instagram.com/goods2load/"
        className="mr-3 hover:opacity-80"
      >
        <Image
          src="/instagramicon.svg"
          alt="Instagram"
          className="dark:invert"
          width={40}
          height={40}
          priority
        />
      </Link>
      <Link
        href="https://www.linkedin.com/company/goods2load/"
        className="mr-3 hover:opacity-80"
      >
        <Image
          src="/linkedinicon.svg"
          alt="Linkedin"
          className="dark:invert"
          width={40}
          height={40}
          priority
        />
      </Link>
      <Link
        href="https://www.facebook.com/GOODS2LOAD?ref=xav_pl_fb_external_guaranteed_control_ios&_rdr"
        className="hover:opacity-80"
      >
        <Image
          src="/facebookicon.svg"
          alt="facebook"
          className="dark:invert"
          width={40}
          height={40}
          priority
        />
      </Link>
    </div>
  );
}
