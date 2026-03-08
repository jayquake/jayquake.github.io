import type React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FolderIcon from '@mui/icons-material/Folder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from 'react';

import { useToast } from './ToastContainer';

type QaseStep = {
  action: string;
  data?: string;
  expected_result?: string;
  position?: number;
};

type QaseTestCaseCardProps = {
  compact?: boolean;
  testCase: QaseTestCaseEnhanced;
  testResult?: {
    duration?: number;
    error?: string;
    status: 'failed' | 'passed' | 'skipped';
  };
};

type QaseTestCaseEnhanced = {
  attachments?: { filename: string; id: string; url: string }[];
  automation?: number;
  created_at?: string;
  custom_fields?: any[];
  description?: string;
  id: number;
  postconditions?: string;
  preconditions?: string;
  priority?: number;
  qaseUrl?: string;
  severity?: number;
  status?: number;
  steps?: QaseStep[];
  suite?: { id: number; title: string };
  tags?: string[];
  title: string;
  type?: number;
  updated_at?: string;
};

const SEVERITY_MAP: Record<number, { color: 'default' | 'error' | 'info' | 'success' | 'warning'; label: string }> = {
  1: { color: 'error',   label: 'Blocker' },
  2: { color: 'error',   label: 'Critical' },
  3: { color: 'warning', label: 'Major' },
  4: { color: 'info',    label: 'Normal' },
  5: { color: 'success', label: 'Minor' },
  6: { color: 'success', label: 'Trivial' },
};

const PRIORITY_MAP: Record<number, { color: 'default' | 'error' | 'info' | 'success' | 'warning'; label: string }> = {
  1: { color: 'error',   label: 'High' },
  2: { color: 'warning', label: 'Medium' },
  3: { color: 'info',    label: 'Low' },
};

const AUTOMATION_LABEL: Record<number, string> = {
  0: 'Manual',
  1: 'To be automated',
  2: 'Automated',
};

const resultColor = (status: string): 'default' | 'error' | 'success' | 'warning' =>
  status === 'passed' ? 'success' : status === 'failed' ? 'error' : 'warning';

export const QaseTestCaseCard: React.FC<QaseTestCaseCardProps> = ({ compact = false, testCase, testResult }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const { showToast } = useToast();

  const severity = SEVERITY_MAP[testCase.severity ?? 0] ?? { color: 'default' as const, label: 'Unknown' };
  const priority = PRIORITY_MAP[testCase.priority ?? 0] ?? { color: 'default' as const, label: 'Not set' };
  const automationLabel = AUTOMATION_LABEL[testCase.automation ?? 0] ?? 'Unknown';

  const copyId = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const id = `ACCESSFLOW-${testCase.id}`;
    try {
      await navigator.clipboard.writeText(id);
      showToast(`Test case ID: ${id}`, 'success');
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const copySteps = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!testCase.steps?.length) {
      showToast('This test case has no steps to copy', 'warning');
      return;
    }
    let md = `# ${testCase.title}\n\n`;
    if (testCase.description) md += `**Description:** ${testCase.description}\n\n`;
    if (testCase.preconditions) md += `**Preconditions:**\n${testCase.preconditions}\n\n`;
    md += `## Steps:\n\n`;
    testCase.steps.forEach((s, i) => {
      md += `${i + 1}. **Action:** ${s.action}\n`;
      if (s.expected_result) md += `   **Expected:** ${s.expected_result}\n`;
      if (s.data) md += `   **Data:** ${s.data}\n`;
      md += `\n`;
    });
    if (testCase.postconditions) md += `**Postconditions:**\n${testCase.postconditions}\n`;
    try {
      await navigator.clipboard.writeText(md);
      showToast(`${testCase.steps.length} steps copied as Markdown`, 'success');
    } catch {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  /* ─── Compact collapsed view ─── */
  if (compact && !isExpanded) {
    return (
      <Card
        onClick={() => setIsExpanded(true)}
        sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
        variant="outlined"
      >
        <CardContent sx={{ pb: '12px !important' }}>
          <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
            <Box flex={1} minWidth={0}>
              <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }}>
                <Typography fontWeight={600} noWrap variant="body1">{testCase.title}</Typography>
                {testResult && <Chip color={resultColor(testResult.status)} label={testResult.status} size="small" />}
              </Stack>
              {testCase.description && (
                <Typography color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} variant="body2">
                  {testCase.description}
                </Typography>
              )}
              <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                <Chip color={severity.color} label={severity.label} size="small" variant="outlined" />
                <Chip color={priority.color} label={priority.label} size="small" variant="outlined" />
                {testCase.steps?.length ? <Typography color="text.secondary" sx={{ alignSelf: 'center' }} variant="caption">{testCase.steps.length} steps</Typography> : null}
              </Stack>
            </Box>
            <Button onClick={() => setIsExpanded(true)} size="small" sx={{ flexShrink: 0, ml: 1 }} variant="text">Expand</Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  /* ─── Full expanded view ─── */
  return (
    <Card variant="outlined">
      <CardContent>
        {/* Header */}
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box flex={1} minWidth={0}>
            <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={1} sx={{ mb: 1 }}>
              <Typography fontWeight={700} variant="h6">{testCase.title}</Typography>
              {testResult && <Chip color={resultColor(testResult.status)} label={testResult.status} size="small" />}
            </Stack>
            <Stack direction="row" flexWrap="wrap" spacing={0.75}>
              <Chip color={severity.color} label={severity.label} size="small" variant="outlined" />
              <Chip color={priority.color} label={priority.label} size="small" variant="outlined" />
              <Chip label={automationLabel} size="small" variant="outlined" />
              {testCase.tags?.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" />)}
              {(testCase.tags?.length ?? 0) > 3 && <Typography color="text.secondary" sx={{ alignSelf: 'center' }} variant="caption">+{(testCase.tags?.length ?? 0) - 3}</Typography>}
            </Stack>
          </Box>
          {compact && <Button onClick={() => setIsExpanded(false)} size="small" variant="text">Collapse</Button>}
        </Stack>

        {/* Suite */}
        {testCase.suite && (
          <Stack alignItems="center" direction="row" spacing={0.5} sx={{ mb: 2 }}>
            <FolderIcon color="action" sx={{ fontSize: 16 }} />
            <Typography color="text.secondary" variant="body2">Suite: {testCase.suite.title}</Typography>
          </Stack>
        )}

        {/* Description */}
        {testCase.description && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Description</Typography>
            <Typography color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }} variant="body2">{testCase.description}</Typography>
          </Box>
        )}

        {/* Preconditions */}
        {testCase.preconditions && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Preconditions</Typography>
            <Box sx={{ pl: 2, borderLeft: 4, borderColor: 'info.main', bgcolor: 'action.hover', py: 1, pr: 1, borderRadius: '0 4px 4px 0' }}>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }} variant="body2">{testCase.preconditions}</Typography>
            </Box>
          </Box>
        )}

        {/* Steps */}
        {testCase.steps && testCase.steps.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Test Steps ({testCase.steps.length})</Typography>
            <Stack spacing={1}>
              {testCase.steps.map((step, idx) => (
                <Box
                  key={idx}
                  sx={{ pl: 2, borderLeft: 4, borderColor: 'primary.main', bgcolor: 'action.hover', py: 1, pr: 1, borderRadius: '0 4px 4px 0' }}
                >
                  <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 0.5 }}>
                    <Box
                      sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}
                    >
                      {step.position ?? idx + 1}
                    </Box>
                    <Typography fontWeight={500} variant="body2">{step.action}</Typography>
                  </Stack>
                  {step.expected_result && (
                    <Typography color="text.secondary" sx={{ ml: 4 }} variant="caption">
                      <Box component="span" sx={{ color: 'success.main', mr: 0.5 }}>✓</Box>
                      <strong>Expected:</strong> {step.expected_result}
                    </Typography>
                  )}
                  {step.data && (
                    <Typography color="text.secondary" sx={{ ml: 4, display: 'block' }} variant="caption">
                      <strong>Data:</strong> {step.data}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Postconditions */}
        {testCase.postconditions && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Postconditions</Typography>
            <Box sx={{ pl: 2, borderLeft: 4, borderColor: 'success.main', bgcolor: 'action.hover', py: 1, pr: 1, borderRadius: '0 4px 4px 0' }}>
              <Typography color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }} variant="body2">{testCase.postconditions}</Typography>
            </Box>
          </Box>
        )}

        {/* Attachments */}
        {testCase.attachments && testCase.attachments.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Attachments ({testCase.attachments.length})</Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {testCase.attachments.map(a => (
                <Link href={a.url} key={a.id} rel="noopener noreferrer" target="_blank" underline="hover">
                  <Stack alignItems="center" direction="row" spacing={0.5} sx={{ px: 1.5, py: 0.75, bgcolor: 'action.hover', borderRadius: 1, fontSize: '0.8rem' }}>
                    <AttachFileIcon sx={{ fontSize: 14 }} />
                    <span>{a.filename}</span>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {/* Test result details */}
        {testResult && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography fontWeight={600} gutterBottom variant="subtitle2">Test Execution Result</Typography>
            <Stack spacing={0.75}>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Typography color="text.secondary" variant="body2">Status:</Typography>
                <Chip color={resultColor(testResult.status)} label={testResult.status} size="small" />
              </Stack>
              {testResult.duration != null && (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Typography color="text.secondary" variant="body2">Duration:</Typography>
                  <Typography fontFamily="monospace" variant="body2">{(testResult.duration / 1000).toFixed(2)}s</Typography>
                </Stack>
              )}
              {testResult.error && (
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">Error:</Typography>
                  <Box component="pre" sx={{ p: 1, bgcolor: 'error.50', color: 'error.main', fontSize: '0.72rem', borderRadius: 1, overflowX: 'auto', m: 0 }}>
                    {testResult.error}
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>
        )}

        <Divider sx={{ mb: 1.5 }} />

        {/* Footer */}
        <Stack alignItems="center" direction="row" justifyContent="space-between" flexWrap="wrap">
          <Stack direction="row" spacing={2}>
            <Typography color="text.disabled" variant="caption">QASE-{testCase.id}</Typography>
            {testCase.updated_at && (
              <Typography color="text.disabled" variant="caption">
                Updated: {new Date(testCase.updated_at).toLocaleDateString()}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <Button onClick={copyId} size="small" startIcon={<ContentCopyIcon />} variant="text">Copy ID</Button>
            {testCase.steps && testCase.steps.length > 0 && (
              <Button onClick={copySteps} size="small" startIcon={<ArticleIcon />} variant="text">Copy Steps</Button>
            )}
            {testCase.qaseUrl && (
              <Button component="a" href={testCase.qaseUrl} rel="noopener noreferrer" size="small" startIcon={<OpenInNewIcon />} target="_blank" variant="text">
                View in Qase
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
