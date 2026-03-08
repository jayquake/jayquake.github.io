import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import type { TestCaseInfo, TestFileInfo, TestSuiteGroup } from './types';

/** Strip leading "Qase NNN: " or "Qase NNN - " prefix from a test title.
 *  The Qase ID is already shown as a chip, so the prefix is redundant. */
function stripQasePrefix(title: string): string {
  return title.replace(/^Qase\s+\d+\s*[:\-–]\s*/i, '').trim();
}

interface TestFileTreeProps {
  expandedSuites: Set<string>;
  expandedTestFiles: Set<string>;
  loadingTestCases: Set<string>;
  onClearAll: () => void;
  onRunSuite: (suite: TestSuiteGroup) => void;
  onSelectAll: () => void;
  onSelectSuite: (suite: TestSuiteGroup, path: string) => void;
  onToggleTest: (path: string) => void;
  onToggleTestCase: (filePath: string, title: string) => void;
  onToggleTestFile: (path: string) => void;
  onToggleSuite: (path: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  selectedTestCases: Map<string, Set<string>>;
  selectedTests: Set<string>;
  suiteGroup: null | TestSuiteGroup;
  testCasesCache: Map<string, TestCaseInfo[]>;
  totalAvailable: number;
}

export default function TestFileTree({
  expandedSuites,
  expandedTestFiles,
  loadingTestCases,
  onClearAll,
  onRunSuite,
  onSelectAll,
  onSelectSuite,
  onToggleTest,
  onToggleTestCase,
  onToggleTestFile,
  onToggleSuite,
  search,
  onSearchChange,
  selectedTestCases,
  selectedTests,
  suiteGroup,
  testCasesCache,
  totalAvailable,
}: TestFileTreeProps) {
  const [hoveredSuite, setHoveredSuite] = useState<null | string>(null);

  const selectedFileCount = selectedTests.size;
  const selectedCaseCount = Array.from(selectedTestCases.values()).reduce(
    (sum, s) => sum + s.size,
    0
  );
  const totalSelected = selectedFileCount + selectedCaseCount;
  const selectionRatio = totalAvailable > 0 ? Math.min(totalSelected / totalAvailable, 1) : 0;

  const renderTestFile = (file: TestFileInfo, suitePath: string) => {
    const isSelected = selectedTests.has(file.relativePath);
    const isExpanded = expandedTestFiles.has(file.relativePath);
    const isLoading = loadingTestCases.has(file.relativePath);
    const testCases = testCasesCache.get(file.relativePath) || [];
    const fileCaseSelections = selectedTestCases.get(file.relativePath) || new Set<string>();

    return (
      <Box key={file.relativePath}>
        <ListItem
          disablePadding
          secondaryAction={
            isLoading ? (
              <CircularProgress size={14} />
            ) : testCases.length > 0 ? (
              <IconButton
                edge="end"
                size="small"
                onClick={() => onToggleTestFile(file.relativePath)}
              >
                {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
              </IconButton>
            ) : null
          }
          sx={{ pl: `${(suitePath.split('/').length) * 16 + 32}px` }}
        >
          <ListItemButton
            dense
            onClick={() => onToggleTest(file.relativePath)}
            sx={{ borderRadius: 1, py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Checkbox
                size="small"
                checked={isSelected}
                onChange={() => onToggleTest(file.relativePath)}
                onClick={(e) => e.stopPropagation()}
                sx={{ p: 0 }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="body2" component="span" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {file.name}
                  </Typography>
                  {file.qaseId && (
                    <Chip label={`Q-${file.qaseId}`} size="small" color="info" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
                  )}
                  {testCases.length > 0 && (
                    <Chip label={testCases.length} size="small" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
                  )}
                </Box>
              }
            />
          </ListItemButton>
        </ListItem>

        {/* Expanded test cases */}
        <Collapse in={isExpanded && testCases.length > 0}>
          <List dense disablePadding>
            {testCases.map((tc: TestCaseInfo) => {
              const isCaseSelected = fileCaseSelections.has(tc.title);
              return (
                <ListItem
                  key={tc.title}
                  disablePadding
                  sx={{ pl: `${(suitePath.split('/').length) * 16 + 48}px` }}
                >
                  <ListItemButton
                    dense
                    onClick={() => onToggleTestCase(file.relativePath, tc.title)}
                    sx={{ borderRadius: 1, py: 0.25 }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Checkbox
                        size="small"
                        checked={isCaseSelected}
                        onChange={() => onToggleTestCase(file.relativePath, tc.title)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{ p: 0 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {tc.qaseId && (
                            <Chip label={`Q-${tc.qaseId}`} size="small" color="info" variant="outlined" sx={{ height: 16, fontSize: 9, flexShrink: 0 }} />
                          )}
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {stripQasePrefix(tc.title)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </Box>
    );
  };

  const renderSuite = (suite: TestSuiteGroup, path: string, depth = 0) => {
    const isExpanded = expandedSuites.has(path) || suite.name === 'root';
    const allTests = getAllTests(suite);
    const allSelected = allTests.length > 0 && allTests.every(t => selectedTests.has(t.relativePath));
    const someSelected = !allSelected && allTests.some(t => selectedTests.has(t.relativePath));

    if (suite.name === 'root') {
      return (
        <Box key="root">
          {Object.entries(suite.suites).map(([key, sub]) =>
            renderSuite(sub, key, 0)
          )}
          {suite.tests.map(f => renderTestFile(f, ''))}
        </Box>
      );
    }

    return (
      <Box key={path}>
        <ListItem
          disablePadding
          onMouseEnter={() => setHoveredSuite(path)}
          onMouseLeave={() => setHoveredSuite(null)}
          secondaryAction={
            hoveredSuite === path ? (
              <Tooltip title={`Run all in ${suite.name}`}>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onRunSuite(suite); }}
                >
                  <PlayArrowIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Chip label={allTests.length} size="small" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
            )
          }
          sx={{ pl: `${depth * 16}px` }}
        >
          <ListItemButton dense onClick={() => onToggleSuite(path)} sx={{ borderRadius: 1, py: 0.75 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Checkbox
                size="small"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => { e.stopPropagation(); onSelectSuite(suite, path); }}
                onClick={(e) => e.stopPropagation()}
                sx={{ p: 0 }}
              />
            </ListItemIcon>
            <ListItemIcon sx={{ minWidth: 28 }}>
              {isExpanded ? (
                <FolderOpenIcon fontSize="small" color="primary" />
              ) : (
                <FolderIcon fontSize="small" color="action" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={500}>
                  {suite.name}
                </Typography>
              }
            />
            {isExpanded ? (
              <ExpandMoreIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            ) : (
              <ChevronRightIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={isExpanded}>
          <List dense disablePadding>
            {Object.entries(suite.suites).map(([key, sub]) =>
              renderSuite(sub, `${path}/${key}`, depth + 1)
            )}
            {suite.tests.map(f => renderTestFile(f, path))}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Search + Select All / Clear */}
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          placeholder="Search tests…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={onSelectAll}>All</Button>
          <Button onClick={onClearAll}>Clear</Button>
        </ButtonGroup>
      </Box>

      {/* Tree */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {!suiteGroup ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <List dense disablePadding>
            {renderSuite(suiteGroup, 'root')}
          </List>
        )}
      </Box>

      {/* Selection footer */}
      <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {selectedFileCount > 0 || selectedCaseCount > 0
            ? `${selectedFileCount} file${selectedFileCount !== 1 ? 's' : ''} · ${selectedCaseCount > 0 ? `${selectedCaseCount} case${selectedCaseCount !== 1 ? 's' : ''} selected` : 'all cases'}`
            : 'No tests selected'}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={selectionRatio * 100}
          sx={{ borderRadius: 1, height: 4 }}
        />
      </Box>
    </Paper>
  );
}

function getAllTests(suite: TestSuiteGroup): TestFileInfo[] {
  const tests: TestFileInfo[] = [...suite.tests];
  for (const sub of Object.values(suite.suites)) {
    tests.push(...getAllTests(sub));
  }
  return tests;
}
