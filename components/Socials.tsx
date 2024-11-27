import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';

export default function Socials({ container }: { container?: string }) {
  return (
    <div className={cn('flex', container)}>
      <Link
        href="https://www.instagram.com/goods2load/"
        className="mr-3 hover:opacity-80"
        target="_blank"
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
        target="_blank"
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
        target="_blank"
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
