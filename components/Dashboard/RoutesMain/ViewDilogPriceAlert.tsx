'use client';

import { countVolume } from '@/lib/utils';

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

const ViewDialogPriceAlert = ({
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
  item: any;
  id: string;
}) => {
  const volume = useMemo(
    () => countVolume(item.width, item.length, item.height),
    [item],
  );

  const {
    userEmail,
    companyName,
    phoneNumber,
    fromRoute,
    toRoute,
    departure,
    arrival,
    typeOfGoods,
    totalKg,
    goodsValue,
    quantity,
    placementOfGoods,
    message,
    attachments,
    createdAt,
  } = item;

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
            Desire route
          </DialogTitle>
          <hr />

          <div className="flex flex-col gap-2">
            {companyName && (
              <div>
                <span className="font-semibold">Company name:</span>{' '}
                {companyName}
              </div>
            )}
            {userEmail && (
              <div>
                <span className="font-semibold">Customer email:</span>{' '}
                {userEmail}
              </div>
            )}
            {phoneNumber && (
              <div>
                <span className="font-semibold">Customer phone:</span>{' '}
                {phoneNumber}
              </div>
            )}

            <div>
              <span className="font-semibold">From:</span> {fromRoute}
            </div>
            <div>
              <span className="font-semibold">To:</span> {toRoute}
            </div>

            {message && (
              <div>
                <span className="font-semibold">Message:</span> {message}
              </div>
            )}
          </div>
          <hr />

          <div className="font-semibold mx-auto text-[22px]/[28px]">Info</div>

          <div>
            <span className="font-semibold">Departure:</span>{' '}
            {format(departure, 'MM/dd/yyyy')}
          </div>
          <div>
            <span className="font-semibold">Arrival:</span>{' '}
            {format(arrival, 'MM/dd/yyyy')}
          </div>
          <div>
            <span className="font-semibold">Type of Goods:</span> {typeOfGoods}
          </div>
          <div>
            <span className="font-semibold">Placement of Goods:</span>{' '}
            {placementOfGoods}
          </div>
          <div>
            <span className="font-semibold">Total Kg:</span> {totalKg}
          </div>
          <div>
            <span className="font-semibold">Volume:</span> {volume}&nbsp;m3
          </div>
          <div>
            <span className="font-semibold">Goods value:</span> {goodsValue}$
          </div>
          <div>
            <span className="font-semibold">Quantity:</span> {quantity}
          </div>
          <div>
            <span className="font-semibold">Created at:</span>{' '}
            {format(createdAt, 'MM/dd/yyyy, HH:mm')}
          </div>

          <hr />

          <div className="font-semibold mx-auto text-[22px]/[28px]">
            Attachments
          </div>
          <div className={'flex flex-row gap-2'}>
            {attachments && attachments.length > 0 ? (
              attachments.map((i: string) => (
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

export default ViewDialogPriceAlert;
