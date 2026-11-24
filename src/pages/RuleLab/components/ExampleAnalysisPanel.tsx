import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Code2, Play, Plus, RotateCcw } from 'lucide-react';

import { api } from '../../../api/client';
import { isStaticDeployment } from '../../../utils/environment';
import { analyzeHtmlClientSide, type ClientAnalysisResult } from '../../../utils/clientAccessibilityTree';
import { analyzeExample as runExampleAudit } from '../../../utils/exampleAuditor';
import AuditResultsPanel from '../../../components/layout/AuditResultsPanel';
import { useRuleLabSocket, type RuleLabEvent } from '../../../hooks/useRuleLabSocket';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Chip, type ChipTone } from '../../../components/ui/chip';
import { Separator } from '../../../components/ui/separator';
import { Textarea } from '../../../components/ui/textarea';
import { cn } from '../../../lib/utils';
import { AccessibilityTreeView } from './AccessibilityTreeView';

interface ExampleAnalysisPanelProps {
  ruleId: string;
  ruleType: 'engine' | 'legacy';
  initialHtml?: string;
  initialExampleType?: string;
}

type TreeData = string | Record<string, unknown> | null;

interface RuleExample {
  id?: string;
  htmlSnippet: string;
  exampleType: string;
  explanation?: string;
  accessibilityTree?: TreeData;
  computedRoles?: string[];
  screenReaderNarration?: string;
}

interface AnalysisResult {
  accessibilityTree?: TreeData;
  computedRoles?: string[];
  screenReaderNarration?: string;
  explanation?: string;
  screenshot?: string;
  error?: string;
  audit?: ClientAnalysisResult['audit'];
  source?: 'client' | 'mcp';
}

interface ExistingExampleRow {
  id?: string;
  htmlSnippet?: string;
  exampleType?: string;
  explanation?: string;
  accessibilityTree?: TreeData;
  computedRoles?: string[];
  screenReaderNarration?: string;
}

interface DiscoveredExampleRow {
  filename?: string;
  content?: string;
  htmlSnippet?: string;
}

function errorMessage(err: unknown): string | undefined {
  return err instanceof Error ? err.message : undefined;
}

/** Indeterminate linear progress (replaces MUI LinearProgress). */
function IndeterminateBar({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <div role="progressbar" aria-label={label} className={cn('relative h-1 w-full overflow-hidden bg-primary/20', className)}>
      <div className="h-full w-2/5 animate-progress-indeterminate bg-primary" />
    </div>
  );
}

export function ExampleAnalysisPanel({ ruleId, ruleType, initialHtml, initialExampleType }: ExampleAnalysisPanelProps) {
  const [examples, setExamples] = useState<RuleExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<Record<number, boolean>>({});
  const [analysisResults, setAnalysisResults] = useState<Record<number, AnalysisResult>>({});
  const [customHtml, setCustomHtml] = useState(initialHtml ?? '');
  const [analyzingCustom, setAnalyzingCustom] = useState(false);
  const [customResult, setCustomResult] = useState<AnalysisResult | null>(null);
  const [initialHtmlConsumed, setInitialHtmlConsumed] = useState(false);

  const { analysisProgress } = useRuleLabSocket({
    ruleId,
    onEvent: useCallback((event: RuleLabEvent) => {
      if (event.type === 'analysis:complete' && event.result) {
        const result: AnalysisResult = {
          accessibilityTree: event.result.accessibilityTree,
          computedRoles: event.result.computedRoles,
          screenReaderNarration: event.result.screenReaderNarration,
          explanation: event.result.explanation,
          screenshot: event.result.screenshotPath,
        };
        setCustomResult((prev) => prev !== null ? result : prev);
      }
    }, []),
  });

  const staticMode = isStaticDeployment();

  const loadExamples = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (staticMode) {
        setExamples([]);
        setLoading(false);
        return;
      }

      const data = await api.ruleLab.getRuleExamples(ruleId);
      const parsed: RuleExample[] = [];

      for (const ex of (data?.existing ?? []) as ExistingExampleRow[]) {
        parsed.push({
          id: ex.id,
          htmlSnippet: ex.htmlSnippet ?? '',
          exampleType: ex.exampleType ?? 'unknown',
          explanation: ex.explanation,
          accessibilityTree: ex.accessibilityTree,
          computedRoles: ex.computedRoles,
          screenReaderNarration: ex.screenReaderNarration,
        });
      }

      const disc = data?.discovered ?? {};
      for (const [type, items] of Object.entries(disc)) {
        for (const item of items as DiscoveredExampleRow[]) {
          parsed.push({
            id: `${type}-${item.filename ?? parsed.length}`,
            htmlSnippet: item.content ?? item.htmlSnippet ?? '',
            exampleType: type,
            explanation: item.filename,
          });
        }
      }

      setExamples(parsed);
    } catch (err: unknown) {
      if (staticMode) {
        setExamples([]);
      } else {
        setError(errorMessage(err) || 'Failed to load examples');
      }
    } finally {
      setLoading(false);
    }
  }, [ruleId, staticMode]);

  useEffect(() => {
    loadExamples();
    setAnalysisResults({});
    setCustomResult(null);
  }, [ruleId, loadExamples]);

  useEffect(() => {
    if (initialHtml && !initialHtmlConsumed && !loading) {
      setCustomHtml(initialHtml);
      setInitialHtmlConsumed(true);
      setTimeout(() => {
        const el = document.getElementById('custom-html-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [initialHtml, initialHtmlConsumed, loading]);

  const doClientSideAnalysis = useCallback(async (htmlSnippet: string): Promise<AnalysisResult> => {
    const result = await analyzeHtmlClientSide(htmlSnippet);
    return {
      accessibilityTree: result.accessibilityTree,
      computedRoles: result.computedRoles,
      screenReaderNarration: result.screenReaderNarration,
      audit: result.audit,
      source: 'client',
    };
  }, []);

  const analyzeExample = useCallback(
    async (index: number, htmlSnippet: string, exampleType: string) => {
      setAnalyzing((prev) => ({ ...prev, [index]: true }));
      try {
        const result = await runExampleAudit({ ruleId, ruleType, variant: exampleType, html: htmlSnippet, index });
        setAnalysisResults((prev) => ({ ...prev, [index]: result }));
      } catch (err: unknown) {
        setAnalysisResults((prev) => ({
          ...prev,
          [index]: { error: errorMessage(err) || 'Analysis failed' },
        }));
      } finally {
        setAnalyzing((prev) => ({ ...prev, [index]: false }));
      }
    },
    [ruleId, ruleType]
  );

  const analyzeCustom = useCallback(async () => {
    if (!customHtml.trim()) return;
    setAnalyzingCustom(true);
    setCustomResult(null);
    try {
      // No index: ad-hoc HTML is never cached.
      setCustomResult(await runExampleAudit({ ruleId, ruleType, variant: 'custom', html: customHtml }));
    } catch (err: unknown) {
      setCustomResult({ error: errorMessage(err) || 'Analysis failed' });
    } finally {
      setAnalyzingCustom(false);
    }
  }, [ruleId, ruleType, customHtml]);

  // Live editor: debounced real-time analysis
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [liveResult, setLiveResult] = useState<AnalysisResult | null>(null);
  const [liveAnalyzing, setLiveAnalyzing] = useState(false);
  const originalHtmlRef = useRef(initialHtml ?? '');

  useEffect(() => {
    if (!customHtml.trim()) {
      setLiveResult(null);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLiveAnalyzing(true);
      try {
        const result = await doClientSideAnalysis(customHtml);
        setLiveResult(result);
      } catch {
        setLiveResult(null);
      } finally {
        setLiveAnalyzing(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [customHtml, doClientSideAnalysis]);

  if (loading) {
    return <IndeterminateBar className="mt-4" />;
  }

  if (error) {
    return (
      <Alert variant="error" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="mt-2">
      {analysisProgress.active && (
        <Alert variant="info" icon={false} className="mb-4 py-1">
          <div className="flex items-center gap-3">
            <p className="m-0 text-sm font-medium">
              {analysisProgress.phase === 'navigating'
                ? 'Loading page in browser...'
                : analysisProgress.phase === 'extracting'
                  ? 'Extracting accessibility tree...'
                  : 'Analyzing...'}
            </p>
          </div>
          <IndeterminateBar className="mt-2" />
        </Alert>
      )}

      {examples.length === 0 ? (
        <div className="border border-border bg-shell-panel p-6 text-center">
          <p className="m-0 text-sm text-foreground-secondary">
            No existing examples found for this rule. Add a custom HTML snippet below to analyze.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {examples.map((example, index) => (
            <ExampleCard
              key={example.id ?? index}
              example={example}
              index={index}
              analyzing={analyzing[index] ?? false}
              result={analysisResults[index]}
              onAnalyze={() => analyzeExample(index, example.htmlSnippet, example.exampleType)}
            />
          ))}
        </div>
      )}

      <Separator className="my-6" />

      <div id="custom-html-section" className="border border-border bg-shell-panel p-3 sm:p-4">
        <div className="mb-4 flex items-center gap-2">
          <Plus aria-hidden="true" className="size-4 text-primary" />
          <h6 className="m-0 text-sm font-semibold text-foreground">Analyze Custom HTML</h6>
          {liveAnalyzing && <Chip className="h-5">Analyzing...</Chip>}
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Textarea
              aria-label="Custom HTML"
              rows={3}
              placeholder={'<button aria-label="Submit">Submit</button>'}
              value={customHtml}
              onChange={(e) => setCustomHtml(e.target.value)}
              className="mb-2 max-h-[18rem] min-h-[5rem] resize-y text-[0.8rem] md:text-[0.85rem]"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={analyzeCustom}
                disabled={analyzingCustom || !customHtml.trim()}
              >
                <Play aria-hidden="true" className="size-4" />
                {staticMode ? 'Analyze (Client)' : 'Analyze'}
              </Button>
              {originalHtmlRef.current && customHtml !== originalHtmlRef.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomHtml(originalHtmlRef.current)}
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Live results pane */}
          {liveResult && (
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-1">
                <h6 className="m-0 text-[0.8rem] font-semibold text-foreground">Live Preview</h6>
                <Chip className="h-[18px]">Client-Side</Chip>
              </div>
              <AnalysisResultView result={liveResult} />
            </div>
          )}
        </div>
        {analyzingCustom && <IndeterminateBar className="mt-4" />}
        {customResult && !liveResult && (
          <div className="mt-4">
            <AnalysisResultView result={customResult} />
          </div>
        )}
      </div>
    </div>
  );
}

function ExampleCard({
  example,
  index,
  analyzing,
  result,
  onAnalyze,
}: {
  example: RuleExample;
  index: number;
  analyzing: boolean;
  result?: AnalysisResult;
  onAnalyze: () => void;
}) {
  const typeTone: ChipTone =
    example.exampleType === 'success' || example.exampleType === 'pass'
      ? 'pass'
      : example.exampleType === 'failure' || example.exampleType === 'fail'
        ? 'fail'
        : 'default';

  return (
    <Accordion type="single" collapsible defaultValue={index === 0 ? 'example' : undefined}>
      <AccordionItem value="example">
        <AccordionTrigger className="py-3">
          <span className="mr-2 flex flex-1 items-center gap-2">
            <Code2 aria-hidden="true" className="size-4 text-foreground-muted" />
            <span className="text-sm font-medium">Example {index + 1}</span>
            <Chip tone={typeTone} className="h-5">{example.exampleType}</Chip>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-4">
          <pre className="m-0 mb-4 max-h-[200px] overflow-auto whitespace-pre-wrap break-words border border-border bg-shell-input p-3 font-mono text-[0.8rem] text-foreground">
            {example.htmlSnippet}
          </pre>

          {example.explanation && (
            <p className="m-0 mb-4 text-sm text-foreground-secondary">{example.explanation}</p>
          )}

          <Button variant="outline" size="sm" onClick={onAnalyze} disabled={analyzing}>
            <Play aria-hidden="true" className="size-4" />
            {analyzing ? 'Analyzing...' : result ? 'Re-analyze' : 'Analyze'}
          </Button>

          {analyzing && <IndeterminateBar className="mt-4" />}

          {result && (
            <div className="mt-4">
              <AnalysisResultView result={result} />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AnalysisResultView({ result }: { result: AnalysisResult }) {
  if (result.error) {
    return <Alert variant="error">{result.error}</Alert>;
  }

  return (
    <div className="flex flex-col gap-4">
      {result.source && (
        <Chip tone={result.source === 'client' ? 'default' : 'primary'} className="h-5 self-start">
          {result.source === 'client' ? 'Client-Side Analysis' : 'MCP Analysis'}
        </Chip>
      )}

      {result.accessibilityTree && (
        <AccessibilityTreeView treeData={result.accessibilityTree} />
      )}

      {result.computedRoles && result.computedRoles.length > 0 && (
        <div>
          <h6 className="m-0 mb-1 text-sm font-semibold text-foreground">Computed Roles</h6>
          <div className="flex flex-wrap gap-1">
            {result.computedRoles.map((role, i) => (
              <Chip key={i}>{role}</Chip>
            ))}
          </div>
        </div>
      )}

      {result.screenReaderNarration && (
        <div>
          <h6 className="m-0 mb-1 text-sm font-semibold text-foreground">Screen Reader Narration</h6>
          <div className="border border-border bg-shell-input p-3">
            <p className="m-0 text-sm italic text-foreground">"{result.screenReaderNarration}"</p>
          </div>
        </div>
      )}

      {result.explanation && (
        <div>
          <h6 className="m-0 mb-1 text-sm font-semibold text-foreground">Explanation</h6>
          <p className="m-0 text-sm text-foreground-secondary">{result.explanation}</p>
        </div>
      )}

      {result.audit && (
        <AuditResultsPanel audit={result.audit} />
      )}
    </div>
  );
}
