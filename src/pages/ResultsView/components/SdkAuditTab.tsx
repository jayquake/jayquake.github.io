import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';

const SEVERITY_COLORS: Record<string, string> = {
  extreme: '#d32f2f',
  high: '#f57c00',
  medium: '#1976d2',
  low: '#388e3c',
};

const SDK_COLORS: Record<string, 'info' | 'success' | 'warning'> = {
  node: 'info',
  python: 'success',
  java: 'warning',
};

type SdkAuditReport = {
  environment: string;
  extremeCount: number;
  highCount: number;
  lowCount: number;
  mediumCount: number;
  sdkType: string;
  summaryData: {
    pages?: Record<string, {
      numberOfIssuesFound?: Record<string, number>;
      ruleViolations?: Record<string, {
        WCAGLink?: string;
        description?: string;
        name?: string;
        numberOfOccurrences?: number;
        selectorData?: Array<{ HTML?: string; selector?: string; suggestionLabel?: string }>;
        severity?: string;
      }>;
    }>;
  };
  thresholdPassed: boolean;
  totalIssues: number;
  totalPages: number;
};

interface SdkAuditTabProps {
  report: SdkAuditReport;
}

function SeverityChip({ count, severity }: { count: number; severity: string }) {
  return (
    <Chip
      label={`${severity}: ${count}`}
      size="small"
      sx={{
        bgcolor: `${SEVERITY_COLORS[severity] || '#888'}18`,
        color: SEVERITY_COLORS[severity] || '#888',
        fontWeight: 700,
        fontSize: '0.7rem',
        textTransform: 'capitalize',
      }}
    />
  );
}

export function SdkAuditTab({ report }: SdkAuditTabProps) {
  const [expandedPage, setExpandedPage] = useState<string | false>(false);

  const pages = report.summaryData?.pages || {};
  const pageEntries = Object.entries(pages);

  return (
    <Stack spacing={2.5}>
      {/* Header */}
      <Paper sx={{ p: 2 }} variant="outlined">
        <Stack
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack alignItems="center" direction="row" spacing={1.5}>
            <Chip
              color={SDK_COLORS[report.sdkType] || 'default'}
              label={report.sdkType.toUpperCase()}
              size="small"
              sx={{ fontWeight: 700 }}
            />
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography color="text.secondary" variant="body2">
                {report.environment}
              </Typography>
            </Stack>
            <Chip
              color={report.thresholdPassed ? 'success' : 'error'}
              icon={report.thresholdPassed ? <CheckCircleIcon /> : <ErrorIcon />}
              label={report.thresholdPassed ? 'Threshold Passed' : 'Threshold Failed'}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Typography color="text.secondary" variant="body2">
            {report.totalPages} page{report.totalPages !== 1 ? 's' : ''} audited
          </Typography>
        </Stack>
      </Paper>

      {/* Severity Summary Bar */}
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {([
          ['extreme', report.extremeCount],
          ['high', report.highCount],
          ['medium', report.mediumCount],
          ['low', report.lowCount],
        ] as [string, number][]).map(([severity, count]) => (
          <SeverityChip count={count} key={severity} severity={severity} />
        ))}
        <Chip
          label={`Total: ${report.totalIssues}`}
          size="small"
          sx={{ fontWeight: 700, fontSize: '0.7rem' }}
          variant="outlined"
        />
      </Stack>

      {/* Per-page accordions */}
      {pageEntries.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }} variant="outlined">
          <Typography color="text.secondary">No SDK audit data available for this run</Typography>
        </Paper>
      ) : (
        pageEntries.map(([pageUrl, pageData]) => {
          const counts = pageData.numberOfIssuesFound || {};
          const violations = pageData.ruleViolations || {};
          const violationEntries = Object.entries(violations);

          return (
            <Accordion
              expanded={expandedPage === pageUrl}
              key={pageUrl}
              onChange={(_, expanded) => setExpandedPage(expanded ? pageUrl : false)}
              variant="outlined"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                  sx={{ width: '100%', pr: 1 }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {pageUrl}
                  </Typography>
                  <Stack direction="row" gap={0.5} sx={{ flexShrink: 0 }}>
                    {counts.extreme ? <SeverityChip count={counts.extreme} severity="extreme" /> : null}
                    {counts.high ? <SeverityChip count={counts.high} severity="high" /> : null}
                    {counts.medium ? <SeverityChip count={counts.medium} severity="medium" /> : null}
                    {counts.low ? <SeverityChip count={counts.low} severity="low" /> : null}
                  </Stack>
                </Stack>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Rule</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Severity</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">Occurrences</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>WCAG</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {violationEntries.map(([ruleId, rule]) => (
                        <RuleRow key={ruleId} rule={rule} />
                      ))}
                      {violationEntries.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Typography color="text.secondary" variant="caption">
                              No rule violations found on this page
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Stack>
  );
}

function RuleRow({ rule }: { rule: any }) {
  const [expanded, setExpanded] = useState(false);
  const severity = rule.severity || 'medium';
  const selectorData = rule.selectorData || [];

  return (
    <>
      <TableRow
        hover
        onClick={() => selectorData.length > 0 && setExpanded(!expanded)}
        sx={{ cursor: selectorData.length > 0 ? 'pointer' : 'default' }}
      >
        <TableCell>
          <Box>
            <Typography fontWeight={600} variant="body2">
              {rule.name || 'Unknown Rule'}
            </Typography>
            {rule.description && (
              <Typography color="text.secondary" sx={{ fontSize: '0.7rem', mt: 0.25 }}>
                {rule.description}
              </Typography>
            )}
          </Box>
        </TableCell>
        <TableCell>
          <Chip
            label={severity}
            size="small"
            sx={{
              bgcolor: `${SEVERITY_COLORS[severity] || '#888'}18`,
              color: SEVERITY_COLORS[severity] || '#888',
              fontWeight: 700,
              fontSize: '0.65rem',
              textTransform: 'capitalize',
              height: 20,
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Typography fontWeight={700} variant="body2">
            {rule.numberOfOccurrences ?? 0}
          </Typography>
        </TableCell>
        <TableCell>
          {rule.WCAGLink && rule.WCAGLink !== '-' ? (
            <Link
              href={rule.WCAGLink}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              sx={{ fontSize: '0.75rem' }}
              target="_blank"
            >
              WCAG Link
            </Link>
          ) : (
            <Typography color="text.disabled" variant="caption">—</Typography>
          )}
        </TableCell>
      </TableRow>

      {expanded && selectorData.length > 0 && (
        <TableRow>
          <TableCell colSpan={4} sx={{ bgcolor: 'action.hover', py: 1.5 }}>
            <Typography fontWeight={600} sx={{ mb: 1, fontSize: '0.75rem' }}>
              Affected Elements ({selectorData.length})
            </Typography>
            <Stack spacing={1}>
              {selectorData.slice(0, 5).map((item: any, idx: number) => (
                <Paper key={idx} sx={{ p: 1.5 }} variant="outlined">
                  {item.HTML && (
                    <Box
                      component="pre"
                      sx={{
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        m: 0,
                        overflow: 'auto',
                        p: 1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {item.HTML}
                    </Box>
                  )}
                  {item.suggestionLabel && (
                    <Typography color="primary" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                      Suggestion: {item.suggestionLabel}
                    </Typography>
                  )}
                </Paper>
              ))}
              {selectorData.length > 5 && (
                <Typography color="text.secondary" variant="caption">
                  …and {selectorData.length - 5} more
                </Typography>
              )}
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
