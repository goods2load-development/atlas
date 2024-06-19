"use client";
import React, { useEffect, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import UIButton from "@/components/common/Button";

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
