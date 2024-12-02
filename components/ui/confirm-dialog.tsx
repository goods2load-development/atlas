'use client';

import clsx from 'clsx';

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

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  isOverlay?: boolean;
  isCloseBtn?: boolean;
  confirmButtonStyle?: string;
  cancelButtonStyle?: string;
  className?: string;
}

const ConfirmDialog = ({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isOverlay = true,
  isCloseBtn = true,
  confirmButtonStyle = '',
  cancelButtonStyle = '',
  className = '',
}: ConfirmDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        isOverlay={isOverlay}
        isCloseBtn={isCloseBtn}
        className={clsx(className, 'p-10 max-w-[632px]')}
      >
        <DialogHeader>
          <DialogTitle className="text-center mb-4 font-light text-4xl">
            {title}
          </DialogTitle>
          <DialogDescription className="!mb-10 text-black text-center text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full max-w-[442px] mx-auto grid sm:grid-cols-2 gap-2">
          <DialogClose asChild>
            <UIButton
              className={`w-full ${confirmButtonStyle}`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </UIButton>
          </DialogClose>{' '}
          <DialogClose asChild>
            <UIButton
              secondary
              className={`w-full ${cancelButtonStyle}`}
              onClick={onCancel}
            >
              {cancelLabel}
            </UIButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
