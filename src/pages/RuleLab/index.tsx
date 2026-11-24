import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, FlaskConical, Info, List, XCircle } from 'lucide-react';

import { api } from '../../api/client';
import { Alert, AlertTitle } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Chip, type ChipTone } from '../../components/ui/chip';
import { Dialog, DialogContent, DialogTitle } from '../../components/ui/dialog';
import { Spinner } from '../../components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { cn } from '../../lib/utils';
import { isStaticDeployment } from '../../utils/environment';
import { fetchEngineRulesFull } from '../../utils/engineRulesDataService';
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

/** Loose shape of engine/legacy rule rows from the API or static data. */
interface RawRuleRow {
  kebabId?: string;
  id?: string;
  route?: string;
  title?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  populated?: boolean;
  impact?: string;
  severity?: string;
  tags?: string[];
}

/** Matches MUI theme.breakpoints.down('md'). */
const MOBILE_QUERY = '(max-width: 899.95px)';

function normalizeEngineRule(rule: RawRuleRow): RuleInfo {
  const id = rule.kebabId ?? rule.id ?? '';
  const description =
    rule.description ||
    (rule.populated === false ? 'No description yet' : '') ||
    rule.shortDescription ||
    '';
  return {
    id,
    name: rule.title || rule.name || id,
    description,
    impact: rule.impact ?? rule.severity ?? '',
    tags: rule.tags ?? [],
  };
}

async function loadStaticRules(): Promise<{ engineRules: RuleInfo[]; legacyRules: RuleInfo[] }> {
  const engineRows = await fetchEngineRulesFull();
  return { engineRules: (engineRows as RawRuleRow[]).map(normalizeEngineRule), legacyRules: [] };
}

export default function RuleLab() {
  const [searchParams] = useSearchParams();
  const isMobile: boolean = useMatchMedia(MOBILE_QUERY);
  const initialRuleId = searchParams.get('ruleId') || searchParams.get('rule');
  const initialRuleType = searchParams.get('type') as 'engine' | 'legacy' | null;
  const initialHtmlParam = searchParams.get('html');
  const initialExampleType = searchParams.get('exampleType') || undefined;
  const staticMode = isStaticDeployment();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        const staticRules = await loadStaticRules();

        // Also try to load legacy rules from the static data.json
        if (!legacyRulesLoaded) {
          try {
            const resp = await fetch(`${process.env.PUBLIC_URL || ''}/data.json`);
            if (resp.ok) {
              const legacyData = await resp.json();
              const normalize = (rule: RawRuleRow): RuleInfo => ({
                id: rule.route ?? rule.name ?? '',
                name: rule.name ?? '',
                description: rule.shortDescription ?? '',
                impact: rule.severity ?? '',
                tags: [],
              });
              const legacy = Array.isArray(legacyData)
                ? (legacyData as RawRuleRow[]).map(normalize)
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
        const engine = ((data.engineRules ?? []) as RawRuleRow[]).map(normalizeEngineRule);
        const legacy = ((data.legacyRules ?? []) as RawRuleRow[]).map((rule) => ({
          id: rule.route ?? rule.id ?? rule.kebabId ?? '',
          name: rule.name ?? rule.title ?? rule.id ?? '',
          description: rule.shortDescription ?? rule.description ?? '',
          impact: rule.impact ?? rule.severity ?? '',
          tags: rule.tags ?? [],
        }));
        setRules({ engineRules: engine, legacyRules: legacy });
      }
    } catch (err: unknown) {
      if (staticMode) {
        setRules(await loadStaticRules());
      } else {
        setError((err instanceof Error && err.message) || 'Failed to load rules');
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
    if (isMobile) setDrawerOpen(false);
  }, [isMobile]);

  const viewportHeight = isMobile ? 'h-[calc(100vh-128px)]' : 'h-[calc(100vh-64px)]';

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center', viewportHeight)}>
        <Spinner className="size-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Alert variant="error">{error}</Alert>
      </div>
    );
  }

  const rulePickerContent = (
    <RulePicker
      engineRules={rules.engineRules}
      legacyRules={rules.legacyRules}
      selectedRule={selectedRule}
      onSelect={handleSelectRule}
    />
  );

  return (
    <div className={cn('flex overflow-hidden', viewportHeight)}>
      {/* Desktop: fixed sidebar */}
      {!isMobile && (
        <div className="w-[300px] min-w-[300px] overflow-auto border-r border-border">
          {rulePickerContent}
        </div>
      )}

      {/* Mobile: side-anchored drawer */}
      {isMobile && (
        <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DialogContent
            aria-describedby={undefined}
            className="left-0 top-0 h-full max-h-none w-[300px] max-w-[85vw] translate-x-0 translate-y-0 gap-0 overflow-hidden border-y-0 border-l-0 p-0"
          >
            <DialogTitle className="sr-only">Rule picker</DialogTitle>
            {rulePickerContent}
          </DialogContent>
        </Dialog>
      )}

      <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
        {staticMode && (
          <Alert variant="info" icon={<Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-status-info" />} className="mb-4">
            <AlertTitle>Static Mode</AlertTitle>
            Analysis uses the client-side engine. Live site discovery requires the local backend.
          </Alert>
        )}
        {!selectedRule ? (
          <EmptyState ruleCount={rules.engineRules.length + rules.legacyRules.length} isMobile={isMobile} onOpenPicker={() => setDrawerOpen(true)} />
        ) : (
          <>
            <RuleHeader rule={selectedRule} ruleType={selectedRuleType} mcpHealthy={mcpHealthy} staticMode={staticMode} isMobile={isMobile} />
            <Tabs value={String(activeTab)} onValueChange={(v) => setActiveTab(Number(v))}>
              <TabsList className="mb-4">
                <TabsTrigger value="0" className={cn(isMobile && 'flex-1 justify-center')}>
                  Example Analysis
                </TabsTrigger>
                <TabsTrigger value="1" disabled={staticMode} className={cn(isMobile && 'flex-1 justify-center')}>
                  Discovery
                </TabsTrigger>
              </TabsList>
              <TabsContent value="0">
                <ExampleAnalysisPanel
                  ruleId={selectedRule.id}
                  ruleType={selectedRuleType as 'engine' | 'legacy'}
                  initialHtml={initialHtml}
                  initialExampleType={initialExampleType}
                />
              </TabsContent>
              <TabsContent value="1">
                {!staticMode && (
                  <DiscoveryPanel ruleId={selectedRule.id} ruleType={selectedRuleType as 'engine' | 'legacy'} />
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      {/* Mobile FAB to open rule picker */}
      {isMobile && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-20 right-4 z-[69] size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary-bright"
          aria-label="Open rule picker"
        >
          <List aria-hidden="true" className="size-6" />
        </Button>
      )}
    </div>
  );
}

function EmptyState({ ruleCount, isMobile, onOpenPicker }: { ruleCount: number; isMobile?: boolean; onOpenPicker?: () => void }) {
  const Heading = isMobile ? 'h6' : 'h5';
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-foreground-secondary">
      <FlaskConical aria-hidden="true" className="size-12 opacity-30 md:size-16" />
      <Heading className={cn('m-0 font-normal text-foreground-secondary', isMobile ? 'text-xl' : 'text-2xl')}>
        Rule Lab
      </Heading>
      <p className="m-0 max-w-[400px] text-center text-sm text-foreground-secondary">
        {isMobile
          ? 'Tap the button below to pick a rule and start analyzing.'
          : 'Select a rule from the sidebar to analyze its examples, explore accessibility tree data, and discover real-world instances across curated sites.'}
      </p>
      {ruleCount > 0 && (
        <Chip>{`${ruleCount} rules available`}</Chip>
      )}
      {isMobile && onOpenPicker && (
        <Button
          variant="default"
          onClick={onOpenPicker}
          className="mt-2 h-12 rounded-full bg-primary px-5 text-primary-foreground shadow-lg hover:bg-primary-bright"
        >
          <List aria-hidden="true" className="size-5" />
          Pick a Rule
        </Button>
      )}
    </div>
  );
}

const IMPACT_TONES: Record<string, ChipTone> = {
  critical: 'fail',
  serious: 'warn',
  moderate: 'info',
};

function RuleHeader({
  rule,
  ruleType,
  mcpHealthy,
  staticMode,
  isMobile,
}: {
  rule: RuleInfo;
  ruleType: string;
  mcpHealthy: boolean | null;
  staticMode?: boolean;
  isMobile?: boolean;
}) {
  const Heading = isMobile ? 'h6' : 'h5';
  return (
    <div className="mb-4">
      <div className={cn('mb-2 flex flex-wrap gap-2', isMobile ? 'items-start' : 'items-center')}>
        <Heading className={cn('m-0 font-semibold text-foreground', isMobile ? 'w-full text-xl' : 'w-auto text-2xl')}>
          {rule.name}
        </Heading>
        <Chip>{rule.id}</Chip>
        <Chip tone={ruleType === 'engine' ? 'primary' : 'info'}>{ruleType}</Chip>
        {rule.impact && (
          <Chip tone={IMPACT_TONES[rule.impact] ?? 'default'}>{rule.impact}</Chip>
        )}
        {!isMobile && <div className="flex-1" />}
        {staticMode ? (
          <Chip icon={<FlaskConical aria-hidden="true" className="size-3.5" />}>Client-Side Engine</Chip>
        ) : mcpHealthy !== null ? (
          <Chip
            tone={mcpHealthy ? 'pass' : 'fail'}
            icon={mcpHealthy
              ? <CheckCircle2 aria-hidden="true" className="size-3.5" />
              : <XCircle aria-hidden="true" className="size-3.5" />}
          >
            {mcpHealthy ? 'MCP Connected' : 'MCP Offline'}
          </Chip>
        ) : null}
      </div>
      {rule.description && (
        <p className="m-0 text-[0.8rem] text-foreground-secondary md:text-sm">
          {rule.description}
        </p>
      )}
    </div>
  );
}
