'use client';

import { dateValues } from './constants';
import { OrderRoute, UserRoute } from './types';
import { countVolume, toNormalText } from '@/lib/utils';

import { useMemo } from 'react';

import { format } from 'date-fns';
import { ViewIcon } from 'lucide-react';

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
  setIsOpen: (a: any) => void;
  item: any;
  id: string;
}) => {
  const volume = useMemo(
    () => countVolume(item.width, item.length, item.height),
    [item],
  );

  const {
    email,
    phoneNumber,
    fromRoute,
    toRoute,
    price,
    typeOfGoods,
    totalKg,
    goodsValue,
    quantity,
    placementOfGoods,
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
            {email && (
              <div>
                <span className="font-semibold">Customer email:</span> {email}
              </div>
            )}
            {phoneNumber && (
              <div>
                <span className="font-semibold">Customer phone:</span>{' '}
                {phoneNumber}
              </div>
            )}
            <div>
              <span className="font-semibold">Desire price:</span> {price}$
            </div>
            <div>
              <span className="font-semibold">From:</span> {fromRoute}
            </div>
            <div>
              <span className="font-semibold">To:</span> {toRoute}
            </div>
          </div>
          <hr />

          <div className="font-semibold mx-auto text-[22px]/[28px]">Info</div>

          <div>
            <span className="font-semibold">Type of Goods</span> {typeOfGoods}
          </div>
          <div>
            <span className="font-semibold">Placement of Goods</span>{' '}
            {placementOfGoods}
          </div>

          <div>
            <span className="font-semibold">Total Kg</span> {totalKg}
          </div>

          <div>
            <span className="font-semibold">Volume</span> {volume}&nbsp;m3
          </div>

          <div>
            <span className="font-semibold">Goods value</span> {goodsValue}$
          </div>

          <div>
            <span className="font-semibold">Quantity</span> {quantity}
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
