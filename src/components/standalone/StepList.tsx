import type { TestStep } from '../../../shared/types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import AlertCircleIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import XCircleIcon from '@mui/icons-material/Cancel';
import { useMemo, useState } from 'react';

type FilterType = 'all' | 'failed' | 'passed';

type StepListProps = {
  enableFilter?: boolean;
  maxSteps?: number;
  steps: TestStep[];
};

export const StepList = ({ enableFilter = false, maxSteps, steps }: StepListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredSteps = useMemo(() => {
    if (filter === 'all') return steps;
    return steps.filter(step => step.status === filter);
  }, [steps, filter]);

  const displayedSteps = useMemo(() => {
    if (!maxSteps || isExpanded) return filteredSteps;
    return filteredSteps.slice(0, maxSteps);
  }, [filteredSteps, maxSteps, isExpanded]);

  const remainingCount = maxSteps ? filteredSteps.length - maxSteps : 0;

  if (steps.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 3 }} variant="body2">
        No steps available
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {/* Header */}
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Stack alignItems="center" direction="row" spacing={1}>
          <Chip color="info" label={`${filteredSteps.length} steps`} size="small" variant="outlined" />
          {filter !== 'all' && (
            <Typography color="text.secondary" variant="caption">
              (filtered from {steps.length} total)
            </Typography>
          )}
        </Stack>

        {enableFilter && (
          <ToggleButtonGroup
            exclusive
            onChange={(_, v) => { if (v) setFilter(v); }}
            size="small"
            value={filter}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="passed" sx={{ color: 'success.main' }}>Passed</ToggleButton>
            <ToggleButton value="failed" sx={{ color: 'error.main' }}>Failed</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Stack>

      {/* Steps */}
      <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {displayedSteps.map((step, index) => {
          const isPassed = step.status === 'passed';
          const isFailed = step.status === 'failed';

          return (
            <Box
              component="li"
              key={index}
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: 1,
                borderColor: isFailed ? 'error.main' : 'divider',
                bgcolor: isFailed ? 'error.50' : 'background.paper',
              }}
            >
              <Stack alignItems="flex-start" direction="row" spacing={1.5}>
                {isPassed ? (
                  <CheckCircleIcon color="success" sx={{ fontSize: 18, flexShrink: 0, mt: 0.25 }} />
                ) : (
                  <XCircleIcon color="error" sx={{ fontSize: 18, flexShrink: 0, mt: 0.25 }} />
                )}

                <Box flex={1} minWidth={0}>
                  <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
                    <Typography
                      color={isFailed ? 'error.main' : 'text.primary'}
                      fontWeight={500}
                      variant="body2"
                    >
                      {step.title}
                    </Typography>
                    {step.duration !== undefined && step.duration > 0 && (
                      <Typography color="text.secondary" noWrap variant="caption">
                        {(step.duration / 1000).toFixed(2)}s
                      </Typography>
                    )}
                  </Stack>

                  {isFailed && step.error && (
                    <Stack
                      alignItems="flex-start"
                      direction="row"
                      spacing={0.5}
                      sx={{ mt: 1, p: 1, bgcolor: 'error.50', border: 1, borderColor: 'error.light', borderRadius: 1 }}
                    >
                      <AlertCircleIcon color="error" sx={{ fontSize: 14, flexShrink: 0, mt: 0.15 }} />
                      <Typography color="error.main" fontFamily="monospace" variant="caption">
                        {step.error}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {/* Expand / collapse */}
      {maxSteps && filteredSteps.length > maxSteps && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="small"
            startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            variant="text"
          >
            {isExpanded ? 'Show Less' : `Show All (${remainingCount} more steps)`}
          </Button>
        </Box>
      )}
    </Stack>
  );
};
