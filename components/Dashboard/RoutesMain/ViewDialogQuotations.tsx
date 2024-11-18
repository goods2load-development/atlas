'use client';

import { Quotation } from '@/lib/store';
import { toNormalText } from '@/lib/utils';

import { ViewIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const includesList = ['id'];

const ViewDialogQuotation = ({
  isOpen,
  setIsOpen,
  item,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: Quotation;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            User data
          </DialogTitle>
          <hr />

          <div className="flex flex-col gap-2">
            {Object.entries(item).map(([key, value]) => {
              if (!value || includesList.includes(key)) return null;
              return (
                <div key={key}>
                  <span className="font-semibold">{toNormalText(key)}:</span>{' '}
                  {value}
                </div>
              );
            })}
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
