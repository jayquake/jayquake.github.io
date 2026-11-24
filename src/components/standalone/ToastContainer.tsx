import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';

import Toast, { type ToastType } from './Toast';

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

type ToastData = {
  id: string;
  message: string;
  type: ToastType;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/*
        Stack toasts in the top-right corner. The region is always mounted so screen
        readers pick up each toast (role="status", or role="alert" for errors) as it is added.
      */}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed right-4 top-4 z-[1401] flex w-full max-w-[400px] flex-col gap-2 [&>*]:pointer-events-auto"
      >
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            type={toast.type}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
