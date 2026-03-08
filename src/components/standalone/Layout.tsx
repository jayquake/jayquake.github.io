import Box from '@mui/material/Box';
import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useCommonShortcuts } from '../../hooks/useKeyboardShortcuts';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useCommonShortcuts();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        width: '100%',
        maxWidth: 1280,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      {children}
    </Box>
  );
}
