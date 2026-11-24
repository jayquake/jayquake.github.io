import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

type ToastProps = {
  duration?: number;
  message: string;
  onClose: () => void;
  type: ToastType;
};

/** Length of the slide/fade exit before the toast is removed (matches duration-200). */
const EXIT_MS = 200;

export default function Toast({ duration = 5000, message, onClose, type }: ToastProps) {
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState(false);

  // Slide in on the frame after mount.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  // Escape dismisses, as the MUI Snackbar did (click-away never did).
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Once closed, let the exit transition finish, then unmount via onClose.
  useEffect(() => {
    if (open) return undefined;
    const timer = setTimeout(onClose, EXIT_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shown = open && entered;

  return (
    <div
      className={cn(
        'bg-shell-elevated shadow-lg transition-all duration-200 ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      )}
    >
      <Alert
        action={
          <Button
            aria-label="close"
            className="size-6 text-inherit"
            onClick={() => setOpen(false)}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" className="size-4" />
          </Button>
        }
        className="w-full"
        variant={type}
      >
        {message}
      </Alert>
    </div>
  );
}
