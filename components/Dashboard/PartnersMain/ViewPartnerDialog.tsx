'use client';

import { Partner } from './types';
import { toNormalText } from '@/lib/utils';

import { Dispatch, SetStateAction } from 'react';

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

const excludedKeys = [
  'id',
  'partnerId',
  'hasPage',
  'industries',
  'filters',
  'partnerLocation',
  'businessProfile',
  'industryRecognitions',
  'SustainabilityProof',
  'sustainability',
  'plane',
  'ferry',
  'truck',
  'isConfirmed',
];

const ViewPartnerDialog = ({
  isOpen,
  setIsOpen,
  partner,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<{ isOpen: boolean; id: string }>>;
  partner: Partner;
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen({ isOpen, id: isOpen ? partner.id : '' });
      }}
    >
      <DialogContent className="p-8 max-w-[80vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            {partner.companyPhoto && (
              <Image
                width={50}
                height={50}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${partner.companyPhoto}`}
                alt="logo"
              />
            )}
            Partner data
          </DialogTitle>
          <hr />
          <div className="max-h-[700px] overflow-y-scroll">
            <div className="flex flex-col gap-2">
              {Object.entries(partner).map(([key, value]) => {
                if (
                  value === null ||
                  value === '' ||
                  excludedKeys.includes(key)
                )
                  return null;

                if (linkFields.includes(key)) {
                  return (
                    <p key={key}>
                      <strong>{toNormalText(key)}: </strong>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${value}`}
                        target="_blank"
                      >
                        {value}
                      </Link>
                    </p>
                  );
                }

                return (
                  <p key={key}>
                    <strong>{toNormalText(key)}: </strong>
                    {value?.toString() || '-'}
                  </p>
                );
              })}

              {partner.businessProfile && (
                <>
                  <hr />
                  <strong className="text-center text-[18px]">
                    Business Profile
                  </strong>
                  <Link href={partner.businessProfile.text}>
                    {partner.businessProfile.text}
                  </Link>
                </>
              )}

              {partner.industryRecognitions?.length > 0 && (
                <>
                  <hr />
                  <strong className="text-center text-[18px]">
                    Industry Recognitions
                  </strong>
                  <div className="flex flex-col gap-1">
                    {partner.industryRecognitions.map((item) =>
                      !item.isSecondary ? (
                        <div key={item.name}>- {item.name}</div>
                      ) : null,
                    )}
                    <strong className="mt-2 mb-1">
                      Additional validations
                    </strong>
                    {partner.industryRecognitions.map((item) =>
                      item.isSecondary ? (
                        <div key={item.name}>- {item.name}</div>
                      ) : null,
                    )}
                    <strong className="mt-2 mb-1">Proofs</strong>
                    <div className="flex gap-1">
                      {partner.industryRecognitions.flatMap((item) =>
                        item.proofs.map((proof) => (
                          <div key={proof.name}>
                            <Link
                              target="_blank"
                              href={`${process.env.NEXT_PUBLIC_BASE_URL}${proof.path}`}
                            >
                              <FileCode className="hover:scale-110 transition-all" />
                            </Link>
                          </div>
                        )),
                      )}
                    </div>
                  </div>
                </>
              )}

              <hr />

              <strong className="text-center text-[18px]">
                Services Offered
              </strong>
              {partner.industries.map(({ label, items }) => (
                <div key={label} className="mt-3">
                  <strong>{label}</strong>
                  <div>
                    {items.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}

              <hr />
              {Object.values(partner.partnerLocation).some(
                (item) => item.length,
              ) && (
                <div>
                  <strong className="block text-center text-[18px]">
                    Partner Locations
                  </strong>
                  <div>
                    {!!partner.partnerLocation.airports?.length && (
                      <>
                        <strong>Airports</strong>
                        {partner.partnerLocation.airports.map((item) => (
                          <div key={item} className="mt-3">
                            {item}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div>
                    {!!partner.partnerLocation.cities?.length && (
                      <>
                        <strong>Cities</strong>
                        {partner.partnerLocation.cities.map((item) => (
                          <div key={item} className="mt-3">
                            {item}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div>
                    {!!partner.partnerLocation.ports?.length && (
                      <>
                        <strong>Ports</strong>
                        {partner.partnerLocation.airports.map((item) => (
                          <div key={item} className="mt-3">
                            {item}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
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
