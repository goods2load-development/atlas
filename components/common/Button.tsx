'use client';

import React, { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset';
  onClick?: (e: any) => void;
  secondary?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function UIButton(props: ButtonProps) {
  const primary =
    'bg-orangePrimary text-white hover:bg-white hover:text-orangePrimary';
  const secondary =
    'bg-white text-orangePrimary hover:bg-orangePrimary hover:text-white';

  return (
    <Button
      type={props.type || 'button'}
      className={`text-[16px]/[22px] font-medium border border-orangePrimary ${props.secondary ? secondary : primary} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.isLoading ? <Spinner /> : props.children}
    </Button>
  );
}
