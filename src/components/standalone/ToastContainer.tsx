import Box from '@mui/material/Box';
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
      {/* Stack toasts in the top-right corner */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: t => t.zIndex.snackbar + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 400,
          width: '100%',
          pointerEvents: 'none',
          '& > *': { pointerEvents: 'auto' },
        }}
      >
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            type={toast.type}
          />
        ))}
      </Box>
    </ToastContext.Provider>
  );
};
