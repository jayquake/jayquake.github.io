import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Slide, { type SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

export type ToastType = 'error' | 'info' | 'success' | 'warning';

type ToastProps = {
  duration?: number;
  message: string;
  onClose: () => void;
  type: ToastType;
};

function SlideUp(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function Toast({ duration = 5000, message, onClose, type }: ToastProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      TransitionComponent={SlideUp}
      TransitionProps={{ onExited: onClose }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={null}
      onClose={handleClose}
      open={open}
      sx={{ position: 'static', transform: 'none' }}
    >
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" onClick={() => setOpen(false)} size="small">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        onClose={() => setOpen(false)}
        severity={type}
        sx={{ width: '100%', boxShadow: 3 }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
