import { cn } from '@/lib/utils';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  dividerText?: string;
}

export default function Divider({ dividerText = 'or', ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'relative w-full h-[18px] opacity-50 my-8',
        props.className,
      )}
    >
      <i className="absolute top-1/2 -translate-y-1/2 h-[1px] bg-orangePrimary w-full" />
      {dividerText && (
        <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[12px]/[18px] font-normal bg-white px-6">
          {dividerText}
        </p>
      )}
    </div>
  );
}
