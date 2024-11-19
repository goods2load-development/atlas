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

const listOfUserData = [
  'userCompany',
  'userPhone',
  'userEmail',
  // 'address',
  // 'country',
  // 'postalCode',
];

const ViewDialog = ({
  isOpen,
  setIsOpen,
  route,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (a: any) => void;
  route: OrderRoute;
  id: string;
}) => {
  const volume = useMemo(
    () => countVolume(route.width, route.length, route.height),
    [route],
  );

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
            View
          </DialogTitle>
          <hr />
          <div className="max-h-[300px] overflow-y-scroll">
            <h2 className="font-bold text-xl my-4">User data</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(route).map(([key, value]) => {
                if (!value || !listOfUserData.includes(key)) return null;
                return (
                  <p key={key}>
                    <strong>{toNormalText(key)}: </strong>
                    {value.toString()}
                  </p>
                );
              })}
            </div>
            <hr className="block mt-4" />
            <h2 className="font-bold text-xl my-4">Order data</h2>
            <div className="flex flex-col gap-2">
              {[...Object.entries(route)].map(([key, value]) => {
                if (
                  key === 'id' ||
                  (typeof key === 'string' && listOfUserData.includes(key))
                )
                  return null;
                const val = dateValues.includes(key as string)
                  ? format(value, 'MM/dd/yyyy')
                  : value;
                return (
                  <p key={key}>
                    <strong>{toNormalText(key as string)}: </strong>
                    {val?.toString() || '-'}
                  </p>
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

export default ViewDialog;
