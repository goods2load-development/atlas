'use client';

import ReferralFormDialog from './ReferralFormDialog';

import { useState } from 'react';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AddNewReferralDialog = ({
  addNewReferral,
}: {
  addNewReferral: (data: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: any) => {
    addNewReferral(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseClick={() => setIsOpen(false)} className="p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Add new referral
          </DialogTitle>
        </DialogHeader>
        <ReferralFormDialog onSubmitCallback={onSubmit} />
      </DialogContent>
      <DialogTrigger asChild>
        <UIButton onClick={() => setIsOpen(true)}>Add new referral</UIButton>
      </DialogTrigger>
    </Dialog>
  );
};

export default AddNewReferralDialog;
