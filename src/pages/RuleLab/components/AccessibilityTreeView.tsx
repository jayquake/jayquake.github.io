import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface AccessibilityTreeViewProps {
  treeData: string | Record<string, any> | null;
  title?: string;
}

const ROLE_COLORS: Record<string, string> = {
  button: '#1976d2',
  link: '#7b1fa2',
  heading: '#e65100',
  img: '#2e7d32',
  textbox: '#0097a7',
  checkbox: '#f57c00',
  radio: '#f57c00',
  list: '#5d4037',
  listitem: '#795548',
  navigation: '#455a64',
  banner: '#455a64',
  main: '#455a64',
  complementary: '#455a64',
  contentinfo: '#455a64',
  form: '#6a1b9a',
  table: '#283593',
  row: '#3949ab',
  cell: '#5c6bc0',
  generic: '#757575',
};

function getRoleColor(role: string): string {
  return ROLE_COLORS[role.toLowerCase()] ?? '#616161';
}

function parseTreeText(text: string): string[] {
  return text.split('\n').filter((line) => line.trim().length > 0);
}

function TreeLine({ line }: { line: string }) {
  const indent = line.search(/\S/);
  const trimmed = line.trim();

  const roleMatch = trimmed.match(/^\[?(\w+)\]?\s*"?([^"]*)"?\s*(.*)/);
  if (!roleMatch) {
    return (
      <Box sx={{ pl: indent * 0.5, fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.6 }}>
        {trimmed}
      </Box>
    );
  }

  const [, role, name, rest] = roleMatch;

  return (
    <Box sx={{ pl: indent * 0.5, fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.6, display: 'flex', gap: 0.5 }}>
      <Box component="span" sx={{ color: getRoleColor(role), fontWeight: 600 }}>
        [{role}]
      </Box>
      {name && (
        <Box component="span" sx={{ color: 'text.primary' }}>
          "{name}"
        </Box>
      )}
      {rest && (
        <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          {rest}
        </Box>
      )}
    </Box>
  );
}

function renderObjectTree(node: Record<string, any>, depth = 0): React.ReactNode[] {
  const lines: React.ReactNode[] = [];
  const role = node.role ?? 'generic';
  const name = node.name ?? '';
  const states = Object.entries(node)
    .filter(([k]) => !['role', 'name', 'children'].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  lines.push(
    <Box
      key={`${depth}-${role}-${name}-${lines.length}`}
      sx={{ pl: depth * 2, fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.6, display: 'flex', gap: 0.5 }}
    >
      <Box component="span" sx={{ color: getRoleColor(role), fontWeight: 600 }}>
        [{role}]
      </Box>
      {name && (
        <Box component="span" sx={{ color: 'text.primary' }}>
          "{name}"
        </Box>
      )}
      {states && (
        <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          {`{${states}}`}
        </Box>
      )}
    </Box>
  );

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      lines.push(...renderObjectTree(child, depth + 1));
    }
  }

  return lines;
}

export function AccessibilityTreeView({ treeData, title = 'Accessibility Tree' }: AccessibilityTreeViewProps) {
  const content = useMemo(() => {
    if (!treeData) return null;

    if (typeof treeData === 'string') {
      const lines = parseTreeText(treeData);
      return lines.map((line, i) => <TreeLine key={i} line={line} />);
    }

    if (typeof treeData === 'object') {
      return renderObjectTree(treeData);
    }

    return null;
  }, [treeData]);

  if (!treeData) {
    return (
      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No accessibility tree data available. Run an analysis to generate it.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: 'grey.50',
          maxHeight: 400,
          overflow: 'auto',
        }}
      >
        {content}
      </Paper>
    </Box>
  );
}
