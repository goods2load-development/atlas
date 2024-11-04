'use client';

import { Partner } from './types';
import { toNormalText } from '@/lib/utils';

import { FileCode, ViewIcon } from 'lucide-react';
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
                  key === 'industries' ||
                  key === 'filters' ||
                  key === 'partnerLocation' ||
                  key === 'businessProfile' ||
                  key === 'industryRecognitions' ||
                  key === 'SustainabilityProof' ||
                  key == 'sustainability' ||
                  key === 'plane' ||
                  key === 'ferry' ||
                  key === 'truck' ||
                  key === 'isConfirmed'
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

              {partner.businessProfile && (
                <>
                  <hr></hr>
                  <strong className="text-center text-[18px]">
                    Business Profile
                  </strong>
                  <Link href={partner.businessProfile.text}>
                    {partner.businessProfile.text}
                  </Link>
                </>
              )}

              {partner.industryRecognitions &&
                partner.industryRecognitions.length > 0 && (
                  <>
                    <hr></hr>
                    <strong className="text-center text-[18px]">
                      Industry Recognitions
                    </strong>
                    <div className="flex flex-col gap-1">
                      {partner.industryRecognitions.map((item: any) => {
                        return (
                          !item.isSecondary && (
                            <div key={item.name} className="">
                              - {item.name}
                            </div>
                          )
                        );
                      })}

                      <strong className="mt-2 mb-1">
                        Additional validations
                      </strong>
                      {partner.industryRecognitions.map((item: any) => {
                        return (
                          item.isSecondary && (
                            <div key={item.name} className="">
                              - {item.name}
                            </div>
                          )
                        );
                      })}

                      <strong className="mt-2 mb-1">Proofs</strong>
                      <div className="flex gap-1">
                        {partner.industryRecognitions.map((item: any) => {
                          return (
                            item.proofs.length > 0 &&
                            item.proofs.map((item: any) => {
                              return (
                                <div key={item.name}>
                                  <Link
                                    target="_blank"
                                    href={`${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`}
                                  >
                                    <FileCode className="hover:scale-110 transition-all" />
                                  </Link>
                                </div>
                              );
                            })
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

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

              <hr></hr>
              <strong className="text-center text-[18px]">
                Airports locations
              </strong>
              <div>
                {partner.airports && partner.airports.length > 0 ? (
                  partner.airports.map((item: string) => {
                    return <div key={item} className="mt-3"></div>;
                  })
                ) : (
                  <span>Not provides</span>
                )}
              </div>
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
