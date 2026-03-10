import { TestRunSummary } from '../../../shared/domain/valueObjects/TestRunSummary';
import { type TestNavResult, type Project } from '../../../shared/types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../api/client';
import { useToast } from '../../components/standalone/ToastContainer';
import { useCommonShortcuts, useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { ConsoleOutputTab } from './components/ConsoleOutputTab';
import { MCPDebugTab } from './components/MCPDebugTab';
import { SdkAuditTab } from './components/SdkAuditTab';
import { SummaryTab } from './components/SummaryTab';
import { ConsoleOutput } from './models/ConsoleOutput';
import { MCPAnalysis } from './models/MCPAnalysis';
import { type TestResult, TestRunData } from './models/TestRunData';
import ResultsAppBar from './ResultsAppBar';
import ResultsTabs from './ResultsTabs';
import RunStatsBar from './RunStatsBar';

type TabType = 'details' | 'mcp' | 'output' | 'summary';

export default function ResultsView() {
  const { runId } = useParams<{ runId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [run, setRun] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [sdkAuditReport, setSdkAuditReport] = useState<any>(null);
  const [mcpAnalyses, setMcpAnalyses] = useState<any[]>([]);
  const [mcpLoading, setMcpLoading] = useState(false);
  const [mcpInteracting, setMcpInteracting] = useState(false);
  const [selectedLocator, setSelectedLocator] = useState<string>('');
  const [selectedAnalysis, setSelectedAnalysis] = useState<null | number>(null);
  const [error, setError] = useState<null | string>(null);
  const [_mcpStats, setMcpStats] = useState<{ fresh: number; stored: number; total: number }>({
    fresh: 0,
    stored: 0,
    total: 0,
  });
  const [mcpStatus, setMcpStatus] = useState<{
    available: boolean;
    cliMode?: boolean;
    message: string;
    tools: string[];
  }>({ available: false, message: '', tools: [] });
  const [_postProcessingStatus, setPostProcessingStatus] = useState<null | {
    completed: boolean;
    inProgress: boolean;
  }>(null);
  const [slackConfig, setSlackConfig] = useState<{
    channelId: null | string;
    configured: boolean;
    enabled: boolean;
  } | null>(null);
  const [sendingToSlack, setSendingToSlack] = useState(false);
  const [mcpFailedTests, setMcpFailedTests] = useState<TestResult[]>([]);
  // Per-test navigation state: keyed by testResultId
  const [testNavResults, setTestNavResults] = useState<Map<string, TestNavResult>>(new Map());

  const loadResults = async () => {
    if (!runId) return;
    try {
      setError(null);
      const data = await api.runs.getById(runId);

      if (data.summary && !(data.summary instanceof TestRunSummary)) {
        data.summary = TestRunSummary.fromJSON(data.summary);
      }

      try {
        const testResultsData = await api.runs.getTestResults(runId);
        if (testResultsData.results && testResultsData.results.length > 0) {
          data.results = testResultsData.results;
          console.log(
            '[ResultsView] Loaded detailed test results with steps:',
            testResultsData.results.length
          );
        }
      } catch (err) {
        console.warn('[ResultsView] Could not load detailed test results:', err);
      }

      // Fetch SDK audit data
      try {
        const auditData = await api.runs.getSdkAudit(runId);
        if (auditData.exists && auditData.report) {
          setSdkAuditReport(auditData.report);
        } else {
          setSdkAuditReport(null);
        }
      } catch (err) {
        console.warn('[ResultsView] Could not load SDK audit data:', err);
        setSdkAuditReport(null);
      }

      setRun(data);
    } catch (err: any) {
      console.error('Error loading results:', err);
      setError(err.message || 'Failed to load test results. Please try again.');
      showToast('Failed to load test results', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Listen for real-time navigation progress from WebSocket
  useEffect(() => {
    api.projects.getAll().then(setAllProjects).catch(() => {});
  }, []);

  useEffect(() => {
    const WS_URL = (process.env.REACT_APP_API_URL || window.location.origin).replace(
      /^http/,
      'ws'
    );
    let ws: WebSocket | null = null;
    let closed = false;

    const connect = () => {
      if (closed) return;
      ws = new WebSocket(`${WS_URL}/ws`);
      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'nav-progress') {
            const testResultId: string | undefined = data.testResultId;
            const step = {
              detail: data.detail as string | undefined,
              status: data.status as string,
              step: data.step as string,
              timestamp: data.timestamp as string,
            };
            if (testResultId) {
              setTestNavResults(prev => {
                const next = new Map(prev);
                const existing = next.get(testResultId) ?? {
                  loading: true,
                  navigationOutcome: null,
                  steps: [],
                };
                next.set(testResultId, { ...existing, steps: [...existing.steps, step] });
                return next;
              });
            }
          }
          if (data.type === 'results-ready') {
            loadResults();
          }
        } catch {
          /* ignore parse errors */
        }
      };
      ws.onclose = () => {
        if (!closed) setTimeout(connect, 2000);
      };
      ws.onerror = () => ws?.close();
    };

    connect();
    return () => {
      closed = true;
      ws?.close();
    };
  }, []);

  useCommonShortcuts();

  useKeyboardShortcuts([
    {
      action: () => {
        loadResults();
        showToast('🔄 Reloading test results...', 'info');
      },
      ctrl: true,
      description: 'Refresh test results',
      key: 'r',
    },
  ]);

  useEffect(() => {
    if (runId) loadResults();

    api.mcp
      .getStatus()
      .then(setMcpStatus)
      .catch(() => setMcpStatus({ available: false, message: 'MCP server unavailable', tools: [] }));

    api.slack
      .getConfig()
      .then(setSlackConfig)
      .catch(() => setSlackConfig(null));
  }, [runId]);

  useEffect(() => {
    if (!runId || !run) return;

    const needsPolling = run.results && run.results.length === 0 && run.status === 'completed';
    if (!needsPolling) {
      setPostProcessingStatus({ completed: true, inProgress: false });
      return;
    }

    let pollCount = 0;
    const maxPolls = 15;

    const pollInterval = setInterval(async () => {
      try {
        const status = await api.runs.getPostProcessingStatus(runId);
        setPostProcessingStatus(status);
        if (status.completed || pollCount >= maxPolls) {
          clearInterval(pollInterval);
          if (status.completed) loadResults();
        }
        pollCount++;
      } catch (err) {
        console.error('[ResultsView] Error polling post-processing status:', err);
        clearInterval(pollInterval);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [runId, run?.status, run?.results?.length]);

  const summary = (() => {
    if (!run?.summary) return null;
    return run.summary instanceof TestRunSummary
      ? run.summary
      : TestRunSummary.fromJSON(run.summary);
  })();


  const testRunData = useMemo(() => {
    if (!run || !summary) return null;
    return new TestRunData(
      run.id,
      run.runId,
      run.projectId,
      run.status,
      run.startTime,
      run.endTime,
      run.duration,
      summary,
      run.results || [],
      run.reportPath,
      run.config
    );
  }, [run, summary]);

  const consoleOutput = useMemo(() => {
    if (!run) return null;
    return new ConsoleOutput(run.stdout, run.stderr);
  }, [run]);

  const mcpAnalysesData = useMemo(
    () =>
      mcpAnalyses.map((analysis: any) => {
        const suggestedSelectors =
          typeof analysis.suggestedSelectors === 'string'
            ? JSON.parse(analysis.suggestedSelectors)
            : analysis.suggestedSelectors || [];
        const elementInfo =
          typeof analysis.elementInfo === 'string'
            ? JSON.parse(analysis.elementInfo)
            : analysis.elementInfo;
        const navigationContext =
          typeof analysis.navigationContext === 'string'
            ? JSON.parse(analysis.navigationContext)
            : analysis.navigationContext;

        return new MCPAnalysis(
          analysis.id || `analysis-${Math.random()}`,
          analysis.testResultId,
          analysis.testName,
          analysis.testFile,
          analysis.selector,
          suggestedSelectors,
          analysis.confidence || 0,
          analysis.error,
          analysis.qaseId,
          navigationContext,
          elementInfo,
          analysis.screenshotPath,
          analysis.tracePath
        );
      }),
    [mcpAnalyses]
  );

  // Handlers
  const handleAnalyzeWithMCP = async () => {
    if (!runId) return;
    setMcpLoading(true);
    try {
      const result = await api.mcp.analyzeRun(runId);
      if (result.analyses && result.analyses.length > 0) {
        setMcpAnalyses(result.analyses);
        const freshCount = (result as any).fresh || 0;
        const storedCount = (result as any).stored || 0;
        setMcpStats({ fresh: freshCount, stored: storedCount, total: result.analyses.length });
        showToast(
          `MCP analysis complete: ${result.analyses.length} issue${result.analyses.length !== 1 ? 's' : ''} found (${freshCount} fresh, ${storedCount} from database)`,
          'success'
        );
      } else if (result.error) {
        showToast(`MCP Analysis Error: ${result.error}`, 'error');
        setMcpAnalyses([]);
      } else {
        showToast('No issues found in MCP analysis', 'info');
        setMcpAnalyses([]);
      }
    } catch (err: any) {
      showToast(`Error analyzing with MCP: ${err.message || 'Unknown error'}`, 'error');
      setMcpAnalyses([]);
    } finally {
      setMcpLoading(false);
    }
  };

  const handleTestSelector = async (selector: string) => {
    if (!run?.config?.baseUrl) return;
    setMcpInteracting(true);
    try {
      await api.mcp.navigate(run.config.baseUrl);
      const result = await api.mcp.interact({ selector, type: 'click' });
      if (result.result?.success) {
        showToast('Selector works! Element clicked successfully.', 'success');
      } else {
        showToast(`Selector failed: ${result.result?.error || 'Unknown error'}`, 'error');
      }
    } catch (err: any) {
      showToast(`Error testing selector: ${err.message}`, 'error');
    } finally {
      setMcpInteracting(false);
    }
  };

  /** Update the per-test navigation state for a specific testResultId. */
  const updateTestNavResult = (testResultId: string, patch: Partial<TestNavResult>) => {
    setTestNavResults(prev => {
      const next = new Map(prev);
      const existing = next.get(testResultId) ?? { loading: false, navigationOutcome: null, steps: [] };
      next.set(testResultId, { ...existing, ...patch });
      return next;
    });
  };

  /** Navigate to failure point from an MCP analysis card. */
  const handleNavigateToFailure = async (analysis: MCPAnalysis) => {
    const navUrl = analysis.getNavigationUrl() ?? run?.config?.baseUrl;
    if (!navUrl) {
      showToast('No navigation context available for this test', 'warning');
      return;
    }

    const testResultId = analysis.testResultId ?? undefined;
    if (testResultId) {
      updateTestNavResult(testResultId, { loading: true, navigationOutcome: null, screenshot: undefined, steps: [] });
    }
    setMcpInteracting(true);
    if (activeTab !== 'mcp') setActiveTab('mcp');

    try {
      const result = await api.mcp.navigateToFailure(
        navUrl,
        analysis.selector,
        true,
        testResultId,
        analysis.suggestedSelectors,
      );

      if (testResultId) {
        updateTestNavResult(testResultId, {
          currentUrl: result.currentUrl,
          error: result.error,
          expectedUrl: result.expectedUrl,
          loading: false,
          navigationOutcome: result.navigationOutcome ?? null,
          screenshot: result.reportScreenshotUrl ?? result.screenshot,
          steps: result.steps ?? [],
        });
      }

      if (result.success) {
        const analysisIndex = mcpAnalysesData.findIndex(a => a.id === analysis.id);
        setSelectedAnalysis(analysisIndex >= 0 ? analysisIndex : null);
        setSelectedLocator(analysis.selector);
        showToast('Navigated to failure point successfully', 'success');
      } else {
        showToast(`Failed to navigate: ${result.error || 'Unknown error'}`, 'error');
      }
    } catch (err: any) {
      if (testResultId) {
        updateTestNavResult(testResultId, {
          error: err.message,
          loading: false,
          navigationOutcome: null,
          steps: [{ detail: err.message, status: 'error', step: 'Request failed', timestamp: new Date().toISOString() }],
        });
      }
      showToast(`Error navigating to failure point: ${err.message}`, 'error');
    } finally {
      setMcpInteracting(false);
    }
  };

  /** Navigate to failure point directly from a failed test result card (no MCP analysis required). */
  const handleNavigateToFailureFromTest = async (test: TestResult, pageSnapshotContent?: string) => {
    const testResultId = test.id;
    const navUrl = (() => {
      // Find matching analysis for URL context
      const matchingAnalysis = mcpAnalysesData.find(a => a.testResultId === testResultId);
      return matchingAnalysis?.getNavigationUrl() ?? run?.config?.baseUrl;
    })();

    if (!navUrl) {
      showToast('No base URL available. Configure a base URL for the test run.', 'warning');
      return;
    }

    updateTestNavResult(testResultId, { loading: true, navigationOutcome: null, screenshot: undefined, steps: [] });
    setMcpInteracting(true);
    if (activeTab !== 'mcp') setActiveTab('mcp');

    try {
      const result = await api.mcp.navigateToFailure(
        navUrl,
        undefined, // No specific selector — navigate to the page
        false,
        testResultId,
        undefined,
        pageSnapshotContent,
      );

      updateTestNavResult(testResultId, {
        currentUrl: result.currentUrl,
        error: result.error,
        expectedUrl: result.expectedUrl,
        loading: false,
        navigationOutcome: result.navigationOutcome ?? null,
        screenshot: result.reportScreenshotUrl ?? result.screenshot,
        steps: result.steps ?? [],
      });

      if (result.success) {
        showToast('Navigated to failure point', 'success');
      } else {
        showToast(result.error ?? 'Navigation failed', 'error');
      }
    } catch (err: any) {
      updateTestNavResult(testResultId, {
        error: err.message,
        loading: false,
        navigationOutcome: null,
        steps: [{ detail: err.message, status: 'error', step: 'Request failed', timestamp: new Date().toISOString() }],
      });
      showToast(`Navigation error: ${err.message}`, 'error');
    } finally {
      setMcpInteracting(false);
    }
  };

  const handleSelectLocator = (locator: string, analysisIndex: number) => {
    setSelectedLocator(locator);
    setSelectedAnalysis(analysisIndex);
  };

  const handleDebugWithMCP = (failedTests: TestResult[]) => {
    setMcpFailedTests(failedTests);
    setActiveTab('mcp');
    if (mcpStatus.available && mcpAnalyses.length === 0 && !mcpLoading) {
      handleAnalyzeWithMCP();
    }
    showToast(
      `Switched to MCP Debug with ${failedTests.length} failed test${failedTests.length !== 1 ? 's' : ''}`,
      'info'
    );
  };

  const handleShareToSlack = async () => {
    if (!runId) return;
    if (!slackConfig?.configured || !slackConfig?.enabled) {
      showToast(
        'Slack integration is not configured. Please set SLACK_BOT_TOKEN, SLACK_CHANNEL_ID, and SLACK_ENABLED=true in .env',
        'error'
      );
      return;
    }
    setSendingToSlack(true);
    try {
      const resultsUrl = `${window.location.origin}/results/${runId}`;
      await api.slack.sendTestResults(runId, resultsUrl);
      showToast('✅ Test results sent to Slack successfully!', 'success');
    } catch (err: any) {
      showToast(`Failed to send to Slack: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setSendingToSlack(false);
    }
  };

  if (summary) {
    console.log('[ResultsView] Output data:', summary.getDebugInfo());
  }

  const mcpCount = mcpAnalysesData.length || mcpFailedTests.length;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}
    >
      <ResultsAppBar
        onNavigateBack={() => navigate('/test-runner')}
        onNavigateToHistory={() => navigate('/test-runner/history')}
        onProjectChange={(id) => navigate(`/test-runner/run?project=${id}`)}
        onShareToSlack={handleShareToSlack}
        projectId={run?.projectId}
        projectName={allProjects.find(p => p.id === run?.projectId)?.name}
        projects={allProjects}
        runId={runId || ''}
        runStatus={run?.status || ''}
        sendingToSlack={sendingToSlack}
        showSlack={Boolean(slackConfig?.configured && slackConfig?.enabled)}
      />

      <Box sx={{ flex: 1 }}>
        {loading ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}
          >
            <CircularProgress />
          </Box>
        ) : error || !run ? (
          <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Alert
              action={
                <Stack direction="row" spacing={1}>
                  <Button color="inherit" onClick={loadResults} size="small">
                    Retry
                  </Button>
                  <Button color="inherit" onClick={() => navigate(-1)} size="small">
                    Back
                  </Button>
                </Stack>
              }
              severity="error"
            >
              {error || 'Results not found'}
            </Alert>
          </Box>
        ) : (
          <>
            {summary && (
              <RunStatsBar
                failed={summary.failed}
                passed={summary.passed}
                passRate={testRunData ? testRunData.getPassRate() : 0}
                skipped={summary.skipped}
                total={summary.total}
              />
            )}

            <Box sx={{ px: 2 }}>
              <ResultsTabs
                activeTab={activeTab}
                mcpCount={mcpCount}
                onChange={setActiveTab}
                sdkAuditCount={sdkAuditReport?.totalIssues}
              />

              <Box sx={{ pt: 2, pb: 4 }}>
                {activeTab === 'summary' && (
                  <SummaryTab
                    allProjects={allProjects}
                    onDebugWithMCP={handleDebugWithMCP}
                    rawResults={run?.results}
                    summary={
                      summary
                        ? {
                            failed: summary.failed,
                            passed: summary.passed,
                            skipped: summary.skipped,
                            total: summary.total,
                          }
                        : run
                          ? {
                              failed:
                                run.results?.filter((r: any) => r.status === 'failed').length || 0,
                              passed:
                                run.results?.filter((r: any) => r.status === 'passed').length || 0,
                              skipped:
                                run.results?.filter((r: any) => r.status === 'skipped').length || 0,
                              total: run.results?.length || 0,
                            }
                          : null
                    }
                    testRun={testRunData}
                  />
                )}

                {activeTab === 'output' && consoleOutput && (
                  <ConsoleOutputTab output={consoleOutput} />
                )}

                {activeTab === 'details' && (
                  <SdkAuditTab report={sdkAuditReport} runId={runId ?? undefined} />
                )}

                {activeTab === 'mcp' && testRunData && (
                  <MCPDebugTab
                    analyses={mcpAnalysesData}
                    baseUrl={run?.config?.baseUrl}
                    failedTestResults={
                      mcpFailedTests.length > 0 ? mcpFailedTests : undefined
                    }
                    mcpInteracting={mcpInteracting}
                    mcpLoading={mcpLoading}
                    mcpStatus={mcpStatus}
                    onAnalyze={handleAnalyzeWithMCP}
                    onNavigateToFailure={handleNavigateToFailure}
                    onNavigateToFailureFromTest={handleNavigateToFailureFromTest}
                    onSelectLocator={handleSelectLocator}
                    onTabChange={tab => setActiveTab(tab as TabType)}
                    onTestSelector={handleTestSelector}
                    selectedAnalysis={selectedAnalysis}
                    selectedLocator={selectedLocator}
                    testNavResults={testNavResults}
                    testResults={testRunData.results}
                  />
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
