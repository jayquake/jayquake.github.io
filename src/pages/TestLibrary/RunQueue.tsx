import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from 'react';

import type { TestCaseInfo, TestFileInfo } from './types';

function stripQasePrefix(title: string): string {
  return title.replace(/^Qase\s+\d+\s*[:\-–]\s*/i, '').trim();
}

interface RunQueueProps {
  isSubmitting: boolean;
  onRun: () => void;
  selectedTestCases: Map<string, Set<string>>;
  selectedTests: Set<string>;
  testCasesCache: Map<string, TestCaseInfo[]>;
  testFiles: TestFileInfo[];
  validUrl: boolean;
}

export default function RunQueue({
  isSubmitting,
  onRun,
  selectedTestCases,
  selectedTests,
  testCasesCache,
  testFiles,
  validUrl,
}: RunQueueProps) {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  // Include files selected whole-file OR files with individually-selected cases
  const selectedFiles = testFiles.filter(f =>
    selectedTests.has(f.relativePath) ||
    ((selectedTestCases.get(f.relativePath)?.size ?? 0) > 0)
  );
  const totalCaseCount = Array.from(selectedTestCases.values()).reduce((s, v) => s + v.size, 0);
  // Don't double-count files that have individual case selections — count those by case
  const pureFileCount = selectedFiles.filter(
    f => selectedTests.has(f.relativePath) && !(selectedTestCases.get(f.relativePath)?.size)
  ).length;
  const totalSelected = pureFileCount + totalCaseCount;
  const canRun = totalSelected > 0 && validUrl && !isSubmitting;

  const toggleFile = (path: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Run Queue
          {selectedFiles.length > 0 && (
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''})
            </Typography>
          )}
        </Typography>
      </Box>

      <Divider />

      {selectedFiles.length === 0 ? (
        <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No tests selected — choose from the tree
          </Typography>
        </Box>
      ) : (
        <List dense disablePadding sx={{ maxHeight: 240, overflow: 'auto' }}>
          {selectedFiles.map((file) => {
            const cases = testCasesCache.get(file.relativePath) || [];
            const selectedCases = selectedTestCases.get(file.relativePath);
            const isExpanded = expandedFiles.has(file.relativePath);
            const activeCases = selectedCases
              ? cases.filter((c: TestCaseInfo) => selectedCases.has(c.title))
              : cases;

            return (
              <Box key={file.relativePath}>
                <ListItem
                  disablePadding
                  sx={{ px: 2 }}
                  secondaryAction={
                    activeCases.length > 0 ? (
                      <IconButton size="small" edge="end" onClick={() => toggleFile(file.relativePath)}>
                        {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                      </IconButton>
                    ) : null
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', py: 0.5 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                          {file.name}
                        </Typography>
                        {file.qaseId && (
                          <Chip label={`Q-${file.qaseId}`} size="small" color="info" variant="outlined" sx={{ height: 16, fontSize: 10 }} />
                        )}
                        <Chip
                          label={`${activeCases.length} case${activeCases.length !== 1 ? 's' : ''}`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 16, fontSize: 10 }}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {file.relativePath.replace(file.name, '').replace(/\/$/, '')}
                      </Typography>
                    }
                  />
                </ListItem>

                <Collapse in={isExpanded}>
                  <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ px: 3, pb: 1 }}>
                    {activeCases.map((tc: TestCaseInfo) => (
                      <Chip
                        key={tc.title}
                        label={tc.qaseId ? `Q-${tc.qaseId}: ${stripQasePrefix(tc.title).slice(0, 40)}` : stripQasePrefix(tc.title).slice(0, 40)}
                        size="small"
                        variant="outlined"
                        color={tc.qaseId ? 'info' : 'default'}
                        title={stripQasePrefix(tc.title)}
                        sx={{ height: 20, fontSize: 10 }}
                      />
                    ))}
                  </Stack>
                </Collapse>
                <Divider />
              </Box>
            );
          })}
        </List>
      )}

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!canRun}
          onClick={onRun}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <PlayArrowIcon />
            )
          }
          sx={{ fontWeight: 700 }}
        >
          {isSubmitting
            ? 'Starting…'
            : totalSelected > 0
            ? `Run ${totalSelected} Test${totalSelected !== 1 ? 's' : ''}`
            : 'Run Tests'}
        </Button>
      </Box>
    </Paper>
  );
}
