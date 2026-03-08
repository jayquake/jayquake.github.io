import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

import type { Project } from '../../../shared/types';

interface ProjectBreadcrumbItemProps {
  onProjectChange: (projectId: string) => void;
  projectId: string;
  projectName: string;
  projects: Project[];
}

export default function ProjectBreadcrumbItem({
  onProjectChange,
  projectId,
  projectName,
  projects,
}: ProjectBreadcrumbItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const hasMultiple = projects.length > 1;

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    if (hasMultiple) setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (id: string) => {
    handleClose();
    if (id !== projectId) onProjectChange(id);
  };

  return (
    <>
      <Box
        component="button"
        onClick={handleOpen}
        aria-haspopup={hasMultiple ? 'listbox' : undefined}
        aria-expanded={menuOpen}
        aria-label="Switch project"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.25,
          background: 'none',
          border: 'none',
          p: 0,
          cursor: hasMultiple ? 'pointer' : 'default',
          color: 'inherit',
          fontFamily: 'inherit',
          borderRadius: 1,
          '&:hover': hasMultiple ? { color: 'primary.main' } : undefined,
        }}
      >
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {projectName}
        </Typography>
        {hasMultiple && <ExpandMoreIcon sx={{ fontSize: 16, flexShrink: 0 }} />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { minWidth: 200, mt: 0.5 } } }}
      >
        {projects.map((p) => (
          <MenuItem
            key={p.id}
            selected={p.id === projectId}
            onClick={() => handleSelect(p.id)}
            sx={{ fontWeight: p.id === projectId ? 600 : 400 }}
          >
            {p.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
