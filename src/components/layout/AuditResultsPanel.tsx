import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as FailIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import type {
  AuditIssue,
  ClientAnalysisResult,
  ContrastResult,
  TouchTargetResult,
} from '../../utils/clientAccessibilityTree';

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: '#d32f2f', bg: 'rgba(211,47,47,0.08)', label: 'Critical' },
  serious: { color: '#f57c00', bg: 'rgba(245,124,0,0.08)', label: 'Serious' },
  moderate: { color: '#1976d2', bg: 'rgba(25,118,210,0.08)', label: 'Moderate' },
  minor: { color: '#388e3c', bg: 'rgba(56,142,60,0.08)', label: 'Minor' },
};

interface AuditResultsPanelProps {
  audit: ClientAnalysisResult['audit'];
  compact?: boolean;
  onFlagFalsePositive?: (issue: AuditIssue, flagged: boolean) => void;
  falsePositives?: Set<string>;
}

function issueKey(issue: AuditIssue): string {
  return `${issue.rule}:${issue.element}:${issue.message}`;
}

function IssueRow({
  issue,
  isFP,
  onToggleFP,
}: {
  issue: AuditIssue;
  isFP?: boolean;
  onToggleFP?: (issue: AuditIssue, flagged: boolean) => void;
}) {
  const cfg = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.minor;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        py: 0.75,
        px: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        opacity: isFP ? 0.5 : 1,
        textDecoration: isFP ? 'line-through' : 'none',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Chip
        label={cfg.label}
        size="small"
        sx={{
          height: 20,
          fontSize: '0.65rem',
          fontWeight: 700,
          bgcolor: cfg.bg,
          color: cfg.color,
          flexShrink: 0,
          mt: 0.25,
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
          {issue.message}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.7rem', wordBreak: 'break-all' }}
        >
          {issue.element}
        </Typography>
        {issue.impact && (
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem', mt: 0.25 }}>
            {issue.impact}
          </Typography>
        )}
      </Box>
      {onToggleFP && (
        <Tooltip title={isFP ? 'Unmark as false positive' : 'Flag as false positive'}>
          <Chip
            label="FP"
            size="small"
            variant={isFP ? 'filled' : 'outlined'}
            color={isFP ? 'warning' : 'default'}
            onClick={() => onToggleFP(issue, !isFP)}
            sx={{ height: 20, fontSize: '0.6rem', cursor: 'pointer', flexShrink: 0 }}
          />
        </Tooltip>
      )}
    </Box>
  );
}

export function AuditIssuesList({
  issues,
  compact,
  onFlagFalsePositive,
  falsePositives,
}: {
  issues: AuditIssue[];
  compact?: boolean;
  onFlagFalsePositive?: (issue: AuditIssue, flagged: boolean) => void;
  falsePositives?: Set<string>;
}) {
  if (!issues.length) {
    return (
      <Box sx={{ py: 1, px: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
          No accessibility issues found
        </Typography>
      </Box>
    );
  }

  const grouped: Record<string, AuditIssue[]> = {};
  for (const issue of issues) {
    if (!grouped[issue.severity]) grouped[issue.severity] = [];
    grouped[issue.severity].push(issue);
  }

  const order = ['critical', 'serious', 'moderate', 'minor'];

  if (compact) {
    return (
      <Box>
        {issues.slice(0, 5).map((issue, i) => (
          <IssueRow
            key={i}
            issue={issue}
            isFP={falsePositives?.has(issueKey(issue))}
            onToggleFP={onFlagFalsePositive}
          />
        ))}
        {issues.length > 5 && (
          <Typography variant="caption" sx={{ px: 1, py: 0.5, color: 'text.secondary' }}>
            +{issues.length - 5} more issues
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {order.map((severity) => {
        const group = grouped[severity];
        if (!group?.length) return null;
        const cfg = SEVERITY_CONFIG[severity];
        return (
          <Accordion key={severity} defaultExpanded={severity === 'critical' || severity === 'serious'} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 36, '& .MuiAccordionSummary-content': { my: 0.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={`${group.length} ${cfg.label}`}
                  size="small"
                  sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, bgcolor: cfg.bg, color: cfg.color }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {group.map((issue, i) => (
                <IssueRow
                  key={i}
                  issue={issue}
                  isFP={falsePositives?.has(issueKey(issue))}
                  onToggleFP={onFlagFalsePositive}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

function ContrastTable({ results }: { results: ContrastResult[] }) {
  if (!results.length) return null;

  const failures = results.filter(r => !r.passes);
  const passes = results.filter(r => r.passes);

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        Color Contrast
        <Chip label={`${passes.length} pass`} size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
        {failures.length > 0 && (
          <Chip label={`${failures.length} fail`} size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
        )}
      </Typography>
      {failures.length > 0 && (
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.7rem', py: 0.5 }}>Element</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', py: 0.5 }}>Colors</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', py: 0.5 }}>Ratio</TableCell>
                <TableCell sx={{ fontSize: '0.7rem', py: 0.5 }}>Required</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failures.map((r, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ fontSize: '0.7rem', py: 0.5, fontFamily: 'monospace', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.element}
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                      <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: r.foreground, border: '1px solid rgba(0,0,0,0.2)' }} />
                      <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: r.background, border: '1px solid rgba(0,0,0,0.2)' }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', py: 0.5, color: 'error.main', fontWeight: 600 }}>
                    {r.ratio}:1
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.7rem', py: 0.5 }}>
                    {r.requiredRatio}:1 ({r.isLargeText ? 'large' : 'normal'})
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

function TouchTargetsGrid({ targets }: { targets: TouchTargetResult[] }) {
  const failures = targets.filter(t => !t.meetsWCAG);
  if (!failures.length) return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
        Small Touch Targets ({failures.length})
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {failures.map((t, i) => (
          <Tooltip key={i} title={`${t.element} (${t.width}x${t.height}px)`}>
            <Chip
              label={`${t.role} ${t.width}x${t.height}`}
              size="small"
              color={t.meetsWCAG ? 'success' : 'warning'}
              variant="outlined"
              sx={{ height: 22, fontSize: '0.65rem' }}
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

function HeadingOutline({ headings }: { headings: Array<{ level: number; text: string }> }) {
  if (!headings.length) return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
        Heading Outline
      </Typography>
      <Box sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
        {headings.map((h, i) => {
          const prevLevel = i > 0 ? headings[i - 1].level : 0;
          const skipped = h.level > prevLevel + 1 && prevLevel > 0;
          return (
            <Box
              key={i}
              sx={{
                pl: (h.level - 1) * 2,
                py: 0.25,
                color: skipped ? 'warning.main' : 'text.primary',
              }}
            >
              {skipped && <WarningIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />}
              <Typography component="span" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.75rem' }}>
                H{h.level}
              </Typography>
              {' '}
              {h.text}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function FocusOrderList({ order }: { order: Array<{ element: string; tabIndex: number; role: string; name: string }> }) {
  if (!order.length) return null;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
        Focus Order ({order.length} focusable)
      </Typography>
      <Box sx={{ fontFamily: 'monospace', fontSize: '0.75rem', maxHeight: 150, overflow: 'auto' }}>
        {order.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1, py: 0.25 }}>
            <Typography component="span" sx={{ fontWeight: 700, color: 'primary.main', minWidth: 20, fontSize: '0.75rem' }}>
              {i + 1}.
            </Typography>
            <Chip label={item.role} size="small" sx={{ height: 18, fontSize: '0.6rem' }} />
            {item.name && (
              <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                "{item.name}"
              </Typography>
            )}
            {item.tabIndex > 0 && (
              <Chip label={`tabindex=${item.tabIndex}`} size="small" color="warning" sx={{ height: 18, fontSize: '0.6rem' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function AuditSummaryChips({ summary }: { summary: ClientAnalysisResult['audit']['summary'] }) {
  const total = summary.critical + summary.serious + summary.moderate + summary.minor;
  if (total === 0) {
    return <Chip icon={<CheckIcon />} label="No issues" size="small" color="success" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />;
  }

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {summary.critical > 0 && (
        <Chip label={`${summary.critical} critical`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: SEVERITY_CONFIG.critical.bg, color: SEVERITY_CONFIG.critical.color }} />
      )}
      {summary.serious > 0 && (
        <Chip label={`${summary.serious} serious`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: SEVERITY_CONFIG.serious.bg, color: SEVERITY_CONFIG.serious.color }} />
      )}
      {summary.moderate > 0 && (
        <Chip label={`${summary.moderate} moderate`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: SEVERITY_CONFIG.moderate.bg, color: SEVERITY_CONFIG.moderate.color }} />
      )}
      {summary.minor > 0 && (
        <Chip label={`${summary.minor} minor`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: SEVERITY_CONFIG.minor.bg, color: SEVERITY_CONFIG.minor.color }} />
      )}
    </Box>
  );
}

export default function AuditResultsPanel({
  audit,
  compact = false,
  onFlagFalsePositive,
  falsePositives,
}: AuditResultsPanelProps) {
  const [expanded, setExpanded] = useState(!compact);

  if (compact) {
    return (
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', mb: 0.5 }}
          onClick={() => setExpanded(!expanded)}
        >
          <AuditSummaryChips summary={audit.summary} />
          <ExpandMoreIcon
            sx={{
              fontSize: 18,
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </Box>
        {expanded && (
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
            <AuditIssuesList
              issues={audit.issues}
              compact
              onFlagFalsePositive={onFlagFalsePositive}
              falsePositives={falsePositives}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Accessibility Issues
        </Typography>
        <AuditIssuesList
          issues={audit.issues}
          onFlagFalsePositive={onFlagFalsePositive}
          falsePositives={falsePositives}
        />
      </Box>

      <ContrastTable results={audit.contrastResults} />
      <TouchTargetsGrid targets={audit.touchTargets} />
      <HeadingOutline headings={audit.headingOutline} />
      <FocusOrderList order={audit.focusOrder} />
    </Box>
  );
}

export { issueKey };
