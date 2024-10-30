'use client';

import { Partner } from './types';
import { toNormalText } from '@/lib/utils';

import { ViewIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const linkFields = [
  'insuranceStatement',
  'issuingAuthority',
  'tradeLicenseNumber',
  'companyPhoto',
];

const ViewPartnerDialog = ({
  isOpen,
  setIsOpen,
  partner,
}: {
  isOpen: boolean;
  setIsOpen: (a: any) => void;
  partner: Partner;
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen({
          isOpen,
          id: isOpen ? partner.id : '',
        });
      }}
    >
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            {partner.companyPhoto && (
              <Image
                width={50}
                height={50}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.companyPhoto}`}
                alt="logo"
              />
            )}{' '}
            Partner data
          </DialogTitle>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll">
            <div className="flex flex-col gap-2">
              {Object.entries(partner).map(([key, value]) => {
                if (
                  value === null ||
                  value === '' ||
                  key === 'id' ||
                  key === 'partnerId' ||
                  key === 'hasPage' ||
                  key === 'industries'
                )
                  return null;
                if (linkFields.includes(key))
                  return (
                    <p key={key}>
                      <strong>{toNormalText(key as string)}: </strong>

                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
                        target="_blank"
                        key={key}
                      >
                        {value}
                      </Link>
                    </p>
                  );
                return (
                  <p key={key}>
                    <strong>{toNormalText(key as string)}: </strong>
                    {value?.toString() || '-'}
                  </p>
                );
              })}

              <hr></hr>
              <strong className="text-center text-[18px]">
                Services Offered
              </strong>
              {partner.industries.map(({ label, items }) => {
                return (
                  <div key={label} className="mt-3">
                    <strong>{label}</strong>

                    <div>
                      {items.map((item: string) => {
                        return <div key={item}>{item}</div>;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
      <DialogTrigger asChild>
        <button title="View">
          <ViewIcon />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ViewPartnerDialog;
