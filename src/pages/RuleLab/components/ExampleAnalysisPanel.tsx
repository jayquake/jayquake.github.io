import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import AddIcon from '@mui/icons-material/Add';

import { api } from '../../../api/client';
import { useRuleLabSocket, type RuleLabEvent } from '../../../hooks/useRuleLabSocket';
import { AccessibilityTreeView } from './AccessibilityTreeView';

interface ExampleAnalysisPanelProps {
  ruleId: string;
  ruleType: 'engine' | 'legacy';
  initialHtml?: string;
  initialExampleType?: string;
}

interface RuleExample {
  id?: string;
  htmlSnippet: string;
  exampleType: string;
  explanation?: string;
  accessibilityTree?: any;
  computedRoles?: string[];
  screenReaderNarration?: string;
}

interface AnalysisResult {
  accessibilityTree?: any;
  computedRoles?: string[];
  screenReaderNarration?: string;
  explanation?: string;
  screenshot?: string;
  error?: string;
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

  const loadExamples = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.ruleLab.getRuleExamples(ruleId);
      const parsed: RuleExample[] = [];

      // existing = DB records (RuleExample rows)
      for (const ex of data?.existing ?? []) {
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

      // discovered = parsed from JSX source: { success: [{filename,content}], failure: [{filename,content}] }
      const disc = data?.discovered ?? {};
      for (const [type, items] of Object.entries(disc)) {
        for (const item of items as any[]) {
          parsed.push({
            id: `${type}-${item.filename ?? parsed.length}`,
            htmlSnippet: item.content ?? item.htmlSnippet ?? '',
            exampleType: type,
            explanation: item.filename,
          });
        }
      }

      setExamples(parsed);
    } catch (err: any) {
      setError(err.message || 'Failed to load examples');
    } finally {
      setLoading(false);
    }
  }, [ruleId]);

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

  const analyzeExample = useCallback(
    async (index: number, htmlSnippet: string, exampleType: string) => {
      setAnalyzing((prev) => ({ ...prev, [index]: true }));
      try {
        const result = await api.ruleLab.analyzeExample(ruleId, ruleType, htmlSnippet, exampleType);
        setAnalysisResults((prev) => ({ ...prev, [index]: result }));
      } catch (err: any) {
        setAnalysisResults((prev) => ({
          ...prev,
          [index]: { error: err.message || 'Analysis failed' },
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
      const result = await api.ruleLab.analyzeExample(ruleId, ruleType, customHtml, 'custom');
      setCustomResult(result);
    } catch (err: any) {
      setCustomResult({ error: err.message || 'Analysis failed' });
    } finally {
      setAnalyzingCustom(false);
    }
  }, [ruleId, ruleType, customHtml]);

  if (loading) {
    return <LinearProgress sx={{ mt: 2 }} />;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      {analysisProgress.active && (
        <Alert severity="info" icon={false} sx={{ mb: 2, py: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {analysisProgress.phase === 'navigating'
                ? 'Loading page in browser...'
                : analysisProgress.phase === 'extracting'
                  ? 'Extracting accessibility tree...'
                  : 'Analyzing...'}
            </Typography>
          </Box>
          <LinearProgress sx={{ mt: 1 }} />
        </Alert>
      )}

      {examples.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No existing examples found for this rule. Add a custom HTML snippet below to analyze.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Paper id="custom-html-section" variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AddIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Analyze Custom HTML
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={4}
          maxRows={12}
          placeholder={'<button aria-label="Submit">Submit</button>'}
          value={customHtml}
          onChange={(e) => setCustomHtml(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.85rem' },
          }}
        />
        <Button
          variant="contained"
          disableElevation
          startIcon={<PlayArrowIcon />}
          onClick={analyzeCustom}
          disabled={analyzingCustom || !customHtml.trim()}
        >
          Analyze
        </Button>
        {analyzingCustom && <LinearProgress sx={{ mt: 2 }} />}
        {customResult && (
          <Box sx={{ mt: 2 }}>
            <AnalysisResultView result={customResult} />
          </Box>
        )}
      </Paper>
    </Box>
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
  const typeColor =
    example.exampleType === 'success' || example.exampleType === 'pass'
      ? 'success'
      : example.exampleType === 'failure' || example.exampleType === 'fail'
        ? 'error'
        : 'default';

  return (
    <Accordion
      variant="outlined"
      disableGutters
      defaultExpanded={index === 0}
      sx={{ '&:before': { display: 'none' } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, mr: 1 }}>
          <CodeIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Example {index + 1}
          </Typography>
          <Chip label={example.exampleType} size="small" color={typeColor as any} sx={{ height: 20, fontSize: '0.7rem' }} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Paper
          sx={{
            p: 1.5,
            mb: 2,
            bgcolor: 'grey.50',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflow: 'auto',
            maxHeight: 200,
          }}
          variant="outlined"
        >
          {example.htmlSnippet}
        </Paper>

        {example.explanation && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {example.explanation}
          </Typography>
        )}

        <Button
          variant="outlined"
          size="small"
          disableElevation
          startIcon={<PlayArrowIcon />}
          onClick={onAnalyze}
          disabled={analyzing}
        >
          {analyzing ? 'Analyzing...' : result ? 'Re-analyze' : 'Analyze'}
        </Button>

        {analyzing && <LinearProgress sx={{ mt: 2 }} />}

        {result && (
          <Box sx={{ mt: 2 }}>
            <AnalysisResultView result={result} />
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function AnalysisResultView({ result }: { result: AnalysisResult }) {
  if (result.error) {
    return <Alert severity="error">{result.error}</Alert>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {result.accessibilityTree && (
        <AccessibilityTreeView treeData={result.accessibilityTree} />
      )}

      {result.computedRoles && result.computedRoles.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Computed Roles
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {result.computedRoles.map((role, i) => (
              <Chip key={i} label={role} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} />
            ))}
          </Box>
        </Box>
      )}

      {result.screenReaderNarration && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Screen Reader Narration
          </Typography>
          <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              "{result.screenReaderNarration}"
            </Typography>
          </Paper>
        </Box>
      )}

      {result.explanation && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
            Explanation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result.explanation}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
