import FacebookIcon from '@/assets/icons/facebookicon.svg';
import InstagramIcon from '@/assets/icons/instagramicon.svg';
import LinkedInIcon from '@/assets/icons/linkedinicon.svg';
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
          src={InstagramIcon}
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
          src={LinkedInIcon}
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
          src={FacebookIcon}
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
