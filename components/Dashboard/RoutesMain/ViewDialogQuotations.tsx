'use client';

import { Quotation } from '@/lib/store';
import { toNormalText } from '@/lib/utils';

import { useMemo } from 'react';

import { format } from 'date-fns';
import { FileCode, ViewIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const includesList = ['id', 'partnerId'];

export const ViewDialogQuotation = ({
  isOpen,
  setIsOpen,
  item,
  id,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      id: string;
      isOpen: boolean;
    }>
  >;
  item: Quotation;
  id: string;
}) => {
  const partnerInfo = useMemo(() => {
    return {
      partnerName: item.partner?.user.companyName,
      partnerEmail: item.partner?.user.email,
      partnerPhoneNumber: item.partner?.user.phoneNumber,
    };
  }, [item]);

  const companyInfo = useMemo(() => {
    return {
      companyName: item.companyName,
      email: item.email,
      phone: item.phone,
      message: item.message,
      createdAt: format(item.createdAt, 'MM/dd/yyyy, HH:mm'),
    };
  }, [item]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen({
          isOpen,
          id: isOpen ? id : '',
        });
      }}
    >
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            User data
          </DialogTitle>
          <hr />

          <div className="flex flex-col gap-2">
            {Object.entries(companyInfo).map(([key, value]) => {
              if (!value || includesList.includes(key)) return null;
              return (
                <div key={key}>
                  <span className="font-semibold">{toNormalText(key)}:</span>{' '}
                  {value}
                </div>
              );
            })}
          </div>

          <hr />

          {partnerInfo && (
            <div className="flex flex-col gap-2">
              {Object.entries(partnerInfo).map(([key, value]) => {
                if (!value || includesList.includes(key)) return null;
                return (
                  <div key={key}>
                    <span className="font-semibold">{toNormalText(key)}:</span>{' '}
                    {value}
                  </div>
                );
              })}
            </div>
          )}

          <hr />

          <div className="font-semibold mx-auto text-[22px]/[28px]">
            Attachments
          </div>
          <div className={'flex flex-row gap-2'}>
            {item?.attachments && item.attachments.length > 0 ? (
              item.attachments.map((i: string) => (
                <div key={i}>
                  <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}${i}`}
                  >
                    <FileCode className="hover:scale-110 transition-all" />
                  </Link>
                </div>
              ))
            ) : (
              <span className="font-semibold">No attachments</span>
            )}
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

export default ViewDialogQuotation;
