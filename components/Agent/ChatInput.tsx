'use client';

import { cn } from '@/lib/utils';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

// Auto-growing message composer. Enter sends, Shift+Enter inserts a newline.
// Borderless soft-grey field + brand-orange round send button.

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  function autoGrow() {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
    if (ref.current) ref.current.style.height = 'auto';
  }

  return (
    <div className="flex items-end gap-2 rounded-md bg-gray-2 p-2">
      <textarea
        ref={ref}
        rows={1}
        value={value}
        disabled={disabled}
        placeholder="Describe your shipment — e.g. 2x40ft reefer, Jebel Ali to Mumbai, dangerous goods…"
        onChange={(e) => {
          setValue(e.target.value);
          autoGrow();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        className={cn(
          'flex-1 resize-none bg-transparent px-2 py-2 text-sm text-black',
          'placeholder:text-muted-foreground focus-visible:outline-none',
          'disabled:opacity-50',
        )}
      />
      <Button
        type="button"
        size="icon"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="rounded-full bg-primaryOrange hover:bg-primaryOrange/90 shrink-0"
      >
        <SendIcon />
      </Button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.4 20.4L21 12 3.4 3.6 3.4 10.2 15 12 3.4 13.8z"
        fill="currentColor"
      />
    </svg>
  );
}
