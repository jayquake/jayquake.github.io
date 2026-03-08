import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import BiotechIcon from '@mui/icons-material/Biotech';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import engineRulesMetadata from '../../data/engine-rules-metadata.json';

interface EngineRule {
  id: string;
  title: string;
  description: string;
  impact: string;
  metadata?: { category?: string };
  passCount?: number;
  failCount?: number;
}

const IMPACT_ORDER: Record<string, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
};

function impactColor(impact: string) {
  switch (impact?.toLowerCase()) {
    case 'critical': return { bg: 'rgba(211,47,47,0.12)', color: '#c62828', border: '#c62828' };
    case 'serious':  return { bg: 'rgba(245,124,0,0.12)', color: '#e65100', border: '#e65100' };
    case 'moderate': return { bg: 'rgba(25,118,210,0.12)', color: '#1565c0', border: '#1565c0' };
    case 'minor':    return { bg: 'rgba(56,142,60,0.12)', color: '#2e7d32', border: '#2e7d32' };
    default:         return { bg: 'rgba(100,116,139,0.12)', color: '#475569', border: '#475569' };
  }
}

export default function AtomicTestLibrary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRuleId = searchParams.get('ruleId') || '';

  const [search, setSearch] = useState(initialRuleId);
  const [impactFilter, setImpactFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<EngineRule[]>([]);

  useEffect(() => {
    // Engine rules metadata is static — just load it
    const loaded = (engineRulesMetadata as any[]).map((r: any) => ({
      id: r.id,
      title: r.title || r.id.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: r.description || '',
      impact: r.impact || 'moderate',
      metadata: r.metadata,
    }));
    setRules(loaded);
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    return rules
      .filter((r) => {
        if (impactFilter !== 'all' && r.impact?.toLowerCase() !== impactFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return r.id.includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => (IMPACT_ORDER[a.impact?.toLowerCase()] ?? 4) - (IMPACT_ORDER[b.impact?.toLowerCase()] ?? 4));
  }, [rules, search, impactFilter]);

  return (
    <Box>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography fontWeight={700} variant="h4">
          Engine Rule{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Atomic Tests
          </Box>
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Browse and run atomic test fixtures (pass/fail HTML snippets) for each engine rule.
          Each rule has dedicated test fixtures verifying its <code>validate()</code> logic.
        </Typography>
      </Stack>

      {/* Filter bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by rule ID or title…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { background: 'rgba(255,255,255,0.8)' } }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Impact</InputLabel>
          <Select label="Impact" value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} sx={{ background: 'rgba(255,255,255,0.8)' }}>
            <MenuItem value="all">All Impacts</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="serious">Serious</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="minor">Minor</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {loading ? 'Loading…' : `${filtered.length} of ${rules.length} rules`}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Alert severity="info">No rules match the current filters.</Alert>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((rule) => {
            const ic = impactColor(rule.impact);
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rule.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' },
                  }}
                >
                  <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip
                        label={rule.impact.charAt(0).toUpperCase() + rule.impact.slice(1)}
                        size="small"
                        sx={{ fontWeight: 700, background: ic.bg, color: ic.color, border: `1px solid ${ic.border}40` }}
                      />
                      {rule.metadata?.category && (
                        <Chip label={rule.metadata.category} size="small" variant="outlined" />
                      )}
                    </Stack>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#1e293b', lineHeight: 1.3, mb: 0.5 }}>
                        {rule.title}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748b' }}>
                        {rule.id}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}
                    >
                      {rule.description}
                    </Typography>

                    <Divider />

                    <Stack direction="row" spacing={1}>
                      <Chip icon={<CheckCircleIcon />} label="Pass" size="small" sx={{ background: 'rgba(56,142,60,0.1)', color: '#2e7d32' }} />
                      <Chip icon={<CancelIcon />} label="Fail" size="small" sx={{ background: 'rgba(211,47,47,0.1)', color: '#c62828' }} />
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PlayArrowIcon />}
                        fullWidth
                        onClick={() => navigate(`/engine/${rule.id}`)}
                        sx={{ textTransform: 'none' }}
                      >
                        View Rule
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<BiotechIcon />}
                        onClick={() => navigate(`/rule-lab?ruleId=${rule.id}`)}
                        sx={{ textTransform: 'none', minWidth: 40, px: 1, color: '#5c6bc0', borderColor: '#5c6bc0' }}
                        title="Open in Rule Lab"
                      >
                        Lab
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
