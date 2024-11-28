'use client';

import DefaultLogoImg from '@/assets/images/defaultlogo.png';
import { useUserStore } from '@/lib/store';

import Image from 'next/image';

import { Input } from '@/components/ui/input';

export default function UploadCompanyLogo() {
  const { user, uploadLogo } = useUserStore((state: any) => state);
  return (
    <label className="cursor-pointer rounded-full">
      <Input
        className="hidden"
        name="companyLogo"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => {
          if (e.target?.files?.length) uploadLogo(e.target.files[0]);
        }}
      />
      {user?.companyPhoto ? (
        <div
          className="w-[68px] h-[68px] rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${user.companyPhoto})`,
          }}
        />
      ) : (
        <Image src={DefaultLogoImg} width={68} height={68} alt="default" />
      )}
    </label>
  );
}
