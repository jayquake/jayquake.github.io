import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Shortcut = {
  action: () => void;
  alt?: boolean;
  ctrl?: boolean;
  description?: string;
  key: string;
  shift?: boolean;
}

// Common shortcuts helper
export function useCommonShortcuts() {
  const navigate = useNavigate();

  useKeyboardShortcuts([
    {
      action: () => navigate('/'),
      ctrl: true,
      description: 'Go to Home',
      key: 'h',
    },
    {
      action: () => navigate('/run'),
      ctrl: true,
      description: 'Go to Run Tests',
      key: 'r',
    },
    {
      action: () => navigate('/history'),
      ctrl: true,
      description: 'Go to History',
      key: 't',
    },
    {
      action: () => navigate(-1),
      alt: true,
      description: 'Go Back',
      key: 'ArrowLeft',
    },
    {
      action: () => navigate(1),
      alt: true,
      description: 'Go Forward',
      key: 'ArrowRight',
    },
  ]);
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl
          ? event.ctrlKey || event.metaKey
          : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, navigate]);
}
