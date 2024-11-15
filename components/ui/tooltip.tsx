'use client';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import * as React from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

function ToolTipComponent({
  text = null,
  children,
  asChild,
  className,
}: {
  text: string | React.ReactNode;
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger type="button" asChild={asChild} className={className}>
          {children ? (
            children
          ) : (
            <div className="flex items-center">
              <p className="rounded-full border-[1px] w-[20px] h-[20px] border-[#FFC1A2] text-[#FFC1A2] mr-[10px] text-center text-[12px]">
                i
              </p>
            </div>
          )}
        </TooltipTrigger>
        {text && (
          <TooltipContent
            side={!!children ? 'top' : 'right'}
            className="text-[14px]/[18px] font-normal bg-[#FEF1DF] rounded-[16px] p-[16px_24px] overflow-visible relative"
          >
            {!children && (
              <div
                className="absolute top-[50%] right-[100%] mt-[-10px]"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderRight: '10px solid #FEF1DF  ',
                }}
              />
            )}
            {text}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  ToolTipComponent,
};
