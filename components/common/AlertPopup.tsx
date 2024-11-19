'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import UIButton from '@/components/common/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  text?: string;
  buttonText?: string;
  open: boolean;
}

export default function AlertPopup({
  open,
  title,
  text,
  buttonText,
}: ButtonProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  useEffect(() => {
    setIsOpened(open);
  }, [open]);
  return (
    <Dialog open={isOpened}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{text}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <UIButton onClick={() => setIsOpened(false)} className="mx-auto">
            {buttonText}
          </UIButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
