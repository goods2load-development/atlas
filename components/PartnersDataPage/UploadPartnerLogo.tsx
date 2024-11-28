'use client';

import { useToast } from '../ui/use-toast';
import PartnerLogoDefault from '@/assets/Partners/partner-logo-default.jpg';
import { usePartnersStore } from '@/lib/store';

import React, { useState } from 'react';

import Image from 'next/image';
import { ReactSVG } from 'react-svg';

import { Input } from '@/components/ui/input';

export default function UploadPartnerLogo({
  partnerId,
  companyPhoto,
}: {
  partnerId: string;
  companyPhoto: string;
}) {
  const { uploadPartnerLogo } = usePartnersStore((state: any) => state);
  const [localPhoto, setLocalPhoto] = useState<string>(companyPhoto);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      uploadPartnerLogo(partnerId, file).then((data: any) => {
        if (data.companyPhoto) {
          reader.onload = () => {
            if (reader.result) {
              setLocalPhoto(reader.result as string);
            }
          };

          toast({
            description: 'Logo successfully changed',
            className: 'bg-green-500 text-white',
          });

          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <label className="cursor-pointer md:basis-1/2">
      <Input
        className="hidden"
        name="companyLogo"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        onChange={handleFileChange}
      />
      {localPhoto ? (
        <div
          className="w-full px-20 rounded-2xl border border-solid border-primaryOrange 
            bg-bgPartnerLogo bg-no-repeat md:[background-position:center_bottom] [background-position:bottom_bottom]
            rotate-180 md:rotate-0 shadow-[2px_2px_10px_0px_#FF672029] h-[250px] md:h-[487px]"
        >
          <div className="relative mx-auto w-2/3 sm:w-[40%] h-full rotate-180 md:rotate-0 flex items-center justify-center">
            {localPhoto.endsWith('.svg') ? (
              <ReactSVG
                src={
                  localPhoto.startsWith('data:')
                    ? localPhoto
                    : `${process.env.NEXT_PUBLIC_BASE_URL}${localPhoto}`
                }
                beforeInjection={(svg) => {
                  svg.setAttribute('style', 'width: 225px');
                }}
              />
            ) : (
              <Image
                alt="Company"
                src={
                  localPhoto.startsWith('data:')
                    ? localPhoto
                    : `${process.env.NEXT_PUBLIC_BASE_URL}${localPhoto}`
                }
                layout="fill"
                objectFit="contain"
                unoptimized
              />
            )}
          </div>
        </div>
      ) : (
        <img src="/defaultlogo.png" alt="Default Logo" />
      )}
    </label>
  );
}
