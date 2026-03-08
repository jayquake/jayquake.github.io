import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

import { api } from '../../api/client';
import { isStaticDeployment } from '../../utils/environment';
import engineRulesData from '../../data/engine-rules-metadata.json';
import { RulePicker } from './components/RulePicker';
import { ExampleAnalysisPanel } from './components/ExampleAnalysisPanel';
import { DiscoveryPanel } from './components/DiscoveryPanel';

export interface RuleInfo {
  id: string;
  name: string;
  description?: string;
  impact?: string;
  tags?: string[];
}

function loadStaticRules(): { engineRules: RuleInfo[]; legacyRules: RuleInfo[] } {
  const normalize = (rule: any): RuleInfo => ({
    id: rule.id ?? rule.kebabId ?? rule.route ?? '',
    name: rule.name ?? rule.title ?? rule.id ?? '',
    description: rule.description ?? rule.shortDescription ?? '',
    impact: rule.impact ?? rule.severity ?? '',
    tags: rule.tags ?? [],
  });
  const engine = (engineRulesData as any[]).map(normalize);
  return { engineRules: engine, legacyRules: [] };
}

export default function RuleLab() {
  const [searchParams] = useSearchParams();
  const initialRuleId = searchParams.get('ruleId') || searchParams.get('rule');
  const initialRuleType = searchParams.get('type') as 'engine' | 'legacy' | null;
  const initialHtmlParam = searchParams.get('html');
  const initialExampleType = searchParams.get('exampleType') || undefined;
  const staticMode = isStaticDeployment();

  const initialHtml = React.useMemo(() => {
    if (!initialHtmlParam) return undefined;
    try {
      return decodeURIComponent(escape(atob(initialHtmlParam)));
    } catch {
      return initialHtmlParam;
    }
  }, [initialHtmlParam]);

  const [rules, setRules] = useState<{ engineRules: RuleInfo[]; legacyRules: RuleInfo[] }>({
    engineRules: [],
    legacyRules: [],
  });
  const [selectedRule, setSelectedRule] = useState<RuleInfo | null>(null);
  const [selectedRuleType, setSelectedRuleType] = useState<'engine' | 'legacy' | ''>('');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mcpHealthy, setMcpHealthy] = useState<boolean | null>(null);
  const [legacyRulesLoaded, setLegacyRulesLoaded] = useState(false);

  const loadRules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (staticMode) {
        const staticRules = loadStaticRules();

        // Also try to load legacy rules from the static data.json
        if (!legacyRulesLoaded) {
          try {
            const resp = await fetch(`${process.env.PUBLIC_URL || ''}/data.json`);
            if (resp.ok) {
              const legacyData = await resp.json();
              const normalize = (rule: any): RuleInfo => ({
                id: rule.route ?? rule.name ?? '',
                name: rule.name ?? '',
                description: rule.shortDescription ?? '',
                impact: rule.severity ?? '',
                tags: [],
              });
              const legacy = Array.isArray(legacyData)
                ? legacyData.map(normalize)
                : [];
              staticRules.legacyRules = legacy;
              setLegacyRulesLoaded(true);
            }
          } catch {
            // Legacy data.json not available in static mode
          }
        }

        setRules(staticRules);
      } else {
        const data = await api.ruleLab.listRules();
        const normalize = (rule: any): RuleInfo => ({
          id: rule.id ?? rule.kebabId ?? rule.route ?? '',
          name: rule.name ?? rule.title ?? rule.id ?? '',
          description: rule.description ?? rule.shortDescription ?? '',
          impact: rule.impact ?? rule.severity ?? '',
          tags: rule.tags ?? [],
        });
        const engine = (data.engineRules ?? []).map(normalize);
        const legacy = (data.legacyRules ?? []).map(normalize);
        setRules({ engineRules: engine, legacyRules: legacy });
      }
    } catch (err: any) {
      if (staticMode) {
        setRules(loadStaticRules());
      } else {
        setError(err.message || 'Failed to load rules');
      }
    } finally {
      setLoading(false);
    }
  }, [staticMode, legacyRulesLoaded]);

  const checkHealth = useCallback(async () => {
    if (staticMode) {
      setMcpHealthy(null);
      return;
    }
    try {
      const result = await api.ruleLab.checkHealth();
      setMcpHealthy(result?.healthy ?? result?.available ?? false);
    } catch {
      setMcpHealthy(false);
    }
  }, [staticMode]);

  useEffect(() => {
    loadRules();
    checkHealth();
  }, [loadRules, checkHealth]);

  useEffect(() => {
    if (!initialRuleId || loading) return;
    if (selectedRule) return;

    const matchId = (r: RuleInfo) =>
      r.id === initialRuleId || r.id.toLowerCase() === initialRuleId.toLowerCase();

    if (initialRuleType === 'engine') {
      const engineMatch = rules.engineRules.find(matchId);
      if (engineMatch) {
        setSelectedRule(engineMatch);
        setSelectedRuleType('engine');
        return;
      }
    }

    if (initialRuleType === 'legacy') {
      const legacyMatch = rules.legacyRules.find(matchId);
      if (legacyMatch) {
        setSelectedRule(legacyMatch);
        setSelectedRuleType('legacy');
        return;
      }
    }

    const engineMatch = rules.engineRules.find(matchId);
    if (engineMatch) {
      setSelectedRule(engineMatch);
      setSelectedRuleType('engine');
      return;
    }

    const legacyMatch = rules.legacyRules.find(matchId);
    if (legacyMatch) {
      setSelectedRule(legacyMatch);
      setSelectedRuleType('legacy');
    }
  }, [initialRuleId, initialRuleType, rules, loading, selectedRule]);

  const handleSelectRule = useCallback((rule: RuleInfo, type: 'engine' | 'legacy') => {
    setSelectedRule(rule);
    setSelectedRuleType(type);
    setActiveTab(0);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Box
        sx={{
          width: 300,
          minWidth: 300,
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'auto',
        }}
      >
        <RulePicker
          engineRules={rules.engineRules}
          legacyRules={rules.legacyRules}
          selectedRule={selectedRule}
          onSelect={handleSelectRule}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {staticMode && (
          <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
            <AlertTitle>Static Mode</AlertTitle>
            Analysis uses the client-side engine. Live site discovery requires the local backend.
          </Alert>
        )}
        {!selectedRule ? (
          <EmptyState ruleCount={rules.engineRules.length + rules.legacyRules.length} />
        ) : (
          <>
            <RuleHeader rule={selectedRule} ruleType={selectedRuleType} mcpHealthy={mcpHealthy} staticMode={staticMode} />
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Example Analysis" />
              <Tab label="Discovery" disabled={staticMode} />
            </Tabs>
            {activeTab === 0 && (
              <ExampleAnalysisPanel
                ruleId={selectedRule.id}
                ruleType={selectedRuleType as 'engine' | 'legacy'}
                initialHtml={initialHtml}
                initialExampleType={initialExampleType}
              />
            )}
            {activeTab === 1 && !staticMode && (
              <DiscoveryPanel ruleId={selectedRule.id} ruleType={selectedRuleType as 'engine' | 'legacy'} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

function EmptyState({ ruleCount }: { ruleCount: number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'text.secondary',
        gap: 2,
      }}
    >
      <ScienceIcon sx={{ fontSize: 64, opacity: 0.3 }} />
      <Typography variant="h5" color="text.secondary">
        Rule Lab
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={400}>
        Select a rule from the sidebar to analyze its examples, explore accessibility tree data, and discover
        real-world instances across curated sites.
      </Typography>
      {ruleCount > 0 && (
        <Chip label={`${ruleCount} rules available`} size="small" variant="outlined" />
      )}
    </Box>
  );
}

function RuleHeader({
  rule,
  ruleType,
  mcpHealthy,
  staticMode,
}: {
  rule: RuleInfo;
  ruleType: string;
  mcpHealthy: boolean | null;
  staticMode?: boolean;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {rule.name}
        </Typography>
        <Chip label={rule.id} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }} />
        <Chip
          label={ruleType}
          size="small"
          color={ruleType === 'engine' ? 'primary' : 'secondary'}
        />
        {rule.impact && (
          <Chip
            label={rule.impact}
            size="small"
            color={
              rule.impact === 'critical' ? 'error' :
              rule.impact === 'serious' ? 'warning' :
              rule.impact === 'moderate' ? 'info' : 'default'
            }
          />
        )}
        <Box sx={{ flex: 1 }} />
        {staticMode ? (
          <Chip
            icon={<ScienceIcon />}
            label="Client-Side Engine"
            size="small"
            color="default"
            variant="outlined"
          />
        ) : mcpHealthy !== null ? (
          <Chip
            icon={mcpHealthy ? <CheckCircleIcon /> : <ErrorIcon />}
            label={mcpHealthy ? 'MCP Connected' : 'MCP Offline'}
            size="small"
            color={mcpHealthy ? 'success' : 'error'}
            variant="outlined"
          />
        ) : null}
      </Box>
      {rule.description && (
        <Typography variant="body2" color="text.secondary">
          {rule.description}
        </Typography>
      )}
    </Box>
  );
}
