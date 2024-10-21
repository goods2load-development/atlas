'use client';

import React, { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset';
  onClick?: () => void;
  secondary?: boolean;
}

export default function Loader() {
  return (
    <div className="p-2">
      <Skeleton className="h-3 w-full bg-gray-300" />
      <Skeleton className="h-3 w-[85%] bg-gray-300 my-1" />
      <Skeleton className="h-3 w-[95%] bg-gray-300" />
    </div>
  );
}
