'use client';

import ReferralFormDialog from './ReferralFormDialog';
import { ReferralItemType } from './types';

import { useState } from 'react';

import { Pencil } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const EditReferralDialog = ({
  referralItem,
  editReferral,
}: {
  referralItem: ReferralItemType;
  editReferral: (oldData: any, data: any, id: string) => void;
}) => {
  const { title, url, bigBanner, smallBanner, id } = referralItem;

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: any) => {
    editReferral(referralItem, data, id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Edit referral {title}
          </DialogTitle>
        </DialogHeader>
        <ReferralFormDialog
          defaultValues={{
            title,
            url,
            bigBanner,
            smallBanner,
          }}
          onSubmitCallback={onSubmit}
        />
      </DialogContent>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} title="Edit">
          <Pencil />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default EditReferralDialog;
