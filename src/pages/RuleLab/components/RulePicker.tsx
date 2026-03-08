import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';

import type { RuleInfo } from '../index';

interface RulePickerProps {
  engineRules: RuleInfo[];
  legacyRules: RuleInfo[];
  selectedRule: RuleInfo | null;
  onSelect: (rule: RuleInfo, type: 'engine' | 'legacy') => void;
}

const IMPACT_COLORS: Record<string, 'error' | 'warning' | 'info' | 'default'> = {
  critical: 'error',
  serious: 'warning',
  moderate: 'info',
  minor: 'default',
};

export function RulePicker({ engineRules, legacyRules, selectedRule, onSelect }: RulePickerProps) {
  const [filter, setFilter] = useState('');

  const filteredEngine = useMemo(() => {
    if (!filter) return engineRules;
    const q = filter.toLowerCase();
    return engineRules.filter(
      (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    );
  }, [engineRules, filter]);

  const filteredLegacy = useMemo(() => {
    if (!filter) return legacyRules;
    const q = filter.toLowerCase();
    return legacyRules.filter(
      (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    );
  }, [legacyRules, filter]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Rules
        </Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Filter rules..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredEngine.length > 0 && (
          <RuleSection
            title="Engine Rules"
            icon={<SettingsIcon fontSize="small" />}
            rules={filteredEngine}
            ruleType="engine"
            selectedRule={selectedRule}
            onSelect={onSelect}
            count={engineRules.length}
            filteredCount={filteredEngine.length}
            isFiltered={!!filter}
          />
        )}

        {filteredEngine.length > 0 && filteredLegacy.length > 0 && <Divider />}

        {filteredLegacy.length > 0 && (
          <RuleSection
            title="Legacy Rules"
            icon={<HistoryIcon fontSize="small" />}
            rules={filteredLegacy}
            ruleType="legacy"
            selectedRule={selectedRule}
            onSelect={onSelect}
            count={legacyRules.length}
            filteredCount={filteredLegacy.length}
            isFiltered={!!filter}
          />
        )}

        {filteredEngine.length === 0 && filteredLegacy.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No rules match "{filter}"
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function RuleSection({
  title,
  icon,
  rules,
  ruleType,
  selectedRule,
  onSelect,
  count,
  filteredCount,
  isFiltered,
}: {
  title: string;
  icon: React.ReactNode;
  rules: RuleInfo[];
  ruleType: 'engine' | 'legacy';
  selectedRule: RuleInfo | null;
  onSelect: (rule: RuleInfo, type: 'engine' | 'legacy') => void;
  count: number;
  filteredCount: number;
  isFiltered: boolean;
}) {
  return (
    <>
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'action.hover' }}>
        {icon}
        <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {title}
        </Typography>
        <Chip
          label={isFiltered ? `${filteredCount}/${count}` : count}
          size="small"
          sx={{ height: 18, fontSize: '0.7rem' }}
        />
      </Box>
      <List dense disablePadding>
        {rules.map((rule) => (
          <ListItemButton
            key={rule.id}
            selected={selectedRule?.id === rule.id}
            onClick={() => onSelect(rule, ruleType)}
            sx={{ py: 0.75, px: 2 }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="body2" noWrap sx={{ flex: 1, fontSize: '0.825rem' }}>
                    {rule.name}
                  </Typography>
                  {rule.impact && (
                    <Chip
                      label={rule.impact}
                      size="small"
                      color={IMPACT_COLORS[rule.impact] ?? 'default'}
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.disabled" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  {rule.id}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
