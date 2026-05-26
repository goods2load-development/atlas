'use client';

import { cn } from '@/lib/utils';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

// ── Web Speech API types ──────────────────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

// ── Attachment model ──────────────────────────────────────────────────────────
interface Attachment {
  id: string;
  name: string;
  kind: 'image' | 'doc';
  preview: string | null; // data URL for images, null for docs
  text: string | null; // extracted text for readable files
}

const ACCEPT = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/plain',
].join(',');

// ── Helpers ───────────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2);
}

function readAsText(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (!['text/csv', 'text/plain'].includes(file.type)) return resolve(null);
    const r = new FileReader();
    r.onload = () =>
      resolve(typeof r.result === 'string' ? r.result.slice(0, 3000) : null);
    r.onerror = () => resolve(null);
    r.readAsText(file);
  });
}

function readAsDataURL(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(typeof r.result === 'string' ? r.result : null);
    r.onerror = () => resolve(null);
    r.readAsDataURL(file);
  });
}

/** Build the final message string that goes to Atlas, including attachments. */
function buildMessage(text: string, files: Attachment[]): string {
  const base = text.trim();
  if (!files.length) return base;

  const sections = files.map((f) => {
    if (f.kind === 'image') {
      return `🖼️ Attached image: ${f.name}\n(Please consider this cargo image when recommending forwarders.)`;
    }
    if (f.text) {
      return `📎 Attached document: ${f.name}\n\`\`\`\n${f.text}\n\`\`\``;
    }
    return `📎 Attached document: ${f.name}\n(Binary file — please acknowledge and ask for details if needed.)`;
  });

  const prompt =
    base ||
    `Please analyse the attached ${files.length === 1 ? 'file' : 'files'} and extract any shipment or cargo details.`;

  return `${prompt}\n\n---\n${sections.join('\n\n')}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [recording, setRecording] = useState(false);
  const [interim, setInterim] = useState(''); // live transcript preview
  const [voiceSupported, setVoiceSupported] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Detect voice support once on mount
  useEffect(() => {
    setVoiceSupported(
      typeof window !== 'undefined' &&
        !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    );
  }, []);

  // ── Auto-grow textarea ──────────────────────────────────────────────────────
  function autoGrow() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  function submit() {
    const final = buildMessage(value, attachments);
    if (!final || disabled) return;
    onSend(final);
    setValue('');
    setAttachments([]);
    setInterim('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  // ── Voice dictation ─────────────────────────────────────────────────────────
  function toggleRecording() {
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'auto' in rec ? 'auto' : ''; // let browser decide

    rec.onresult = (e) => {
      let final = '';
      let inter = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else inter += r[0].transcript;
      }
      if (final) {
        setValue((v) => (v ? `${v} ${final}` : final).trim());
        autoGrow();
      }
      setInterim(inter);
    };

    rec.onerror = () => {
      setRecording(false);
      setInterim('');
    };
    rec.onend = () => {
      setRecording(false);
      setInterim('');
    };

    rec.start();
    recognitionRef.current = rec;
    setRecording(true);
  }

  // ── File handling ───────────────────────────────────────────────────────────
  async function handleFiles(list: FileList) {
    const incoming: Attachment[] = [];

    for (const file of Array.from(list)) {
      const isImage = file.type.startsWith('image/');
      const [preview, text] = await Promise.all([
        isImage ? readAsDataURL(file) : Promise.resolve(null),
        readAsText(file),
      ]);
      incoming.push({
        id: uid(),
        name: file.name,
        kind: isImage ? 'image' : 'doc',
        preview,
        text,
      });
    }

    setAttachments((prev) => [...prev, ...incoming]);
    // Reset so the same file can be re-added if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  const canSend = (!!value.trim() || attachments.length > 0) && !disabled;

  return (
    <div className="rounded-xl border border-border bg-gray-2 overflow-hidden">
      {/* ── Attachment pills ──────────────────────────────────────────────── */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 px-3 pt-2.5">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-1.5 rounded-full border border-primaryOrange/30 bg-lightOrange px-2.5 py-1 text-xs text-black max-w-[180px]"
            >
              {a.kind === 'image' && a.preview ? (
                <img
                  src={a.preview}
                  alt={a.name}
                  className="h-4 w-4 rounded-sm object-cover shrink-0"
                />
              ) : (
                <DocIcon />
              )}
              <span className="truncate">{a.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(a.id)}
                className="ml-0.5 shrink-0 text-muted-foreground hover:text-black"
                aria-label={`Remove ${a.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Textarea + buttons ────────────────────────────────────────────── */}
      <div className="flex items-end gap-1 px-2 py-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={
            recording && interim
              ? `${value}${value ? ' ' : ''}${interim}`
              : value
          }
          disabled={disabled}
          placeholder={
            recording
              ? 'Listening…'
              : 'Describe your shipment — e.g. 2x40ft reefer, Jebel Ali to Mumbai, dangerous goods…'
          }
          onChange={(e) => {
            if (recording) return; // don't allow typing while recording
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
            'placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50',
            recording && 'text-muted-foreground italic',
          )}
        />

        {/* Microphone */}
        {voiceSupported && (
          <button
            type="button"
            onClick={toggleRecording}
            disabled={disabled}
            aria-label={recording ? 'Stop recording' : 'Start voice input'}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
              recording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-muted-foreground hover:text-primaryOrange hover:bg-lightOrange',
            )}
          >
            <MicIcon />
          </button>
        )}

        {/* Paperclip */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          aria-label="Attach file or image"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-primaryOrange hover:bg-lightOrange transition-colors"
        >
          <PaperclipIcon />
        </button>

        {/* Send */}
        <Button
          type="button"
          size="icon"
          onClick={submit}
          disabled={!canSend}
          aria-label="Send message"
          className="h-8 w-8 rounded-full bg-primaryOrange hover:bg-primaryOrange/90 shrink-0"
        >
          <SendIcon />
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT}
        multiple
        hidden
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function MicIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
