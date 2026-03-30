import { TestProgressMonitor } from '../../../shared/utils/TestProgressMonitor';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Project } from '../../../shared/types';

import { api } from '../../api/client';
import { useCommonShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useWebSocket } from '../../hooks/useWebSocket';
import ConsolePanel from './ConsolePanel';
import PlaywrightUIPanel from './PlaywrightUIPanel';
import ProgressAppBar from './ProgressAppBar';
import RunSummaryBar from './RunSummaryBar';
import TestExecutionList from './TestExecutionList';
import type { MonitorState, ParsedTestResult, RunStatus } from './types';

export default function TestProgress() {
  const { runId } = useParams<{ runId: string }>();
  const navigate = useNavigate();
  const { connected, updates } = useWebSocket(runId || null);

  const [runStatus, setRunStatus] = useState<RunStatus>('running');
  const [playwrightUIProxyUrl, setPlaywrightUIProxyUrl] = useState<null | string>(null);
  const [showUIViewer, setShowUIViewer] = useState(false);
  const [uiModeChecked, setUiModeChecked] = useState(false);
  const [testResults, setTestResults] = useState<ParsedTestResult[]>([]);
  const [selectedTestIndex, setSelectedTestIndex] = useState<null | number>(null);
  const resultsLoadingRef = useRef(false);
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [runData, setRunData] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Create TestProgressMonitor instance
  const monitor = useMemo(() => {
    if (!runId) return null;
    return new TestProgressMonitor(runId);
  }, [runId]);

  // monitorState is kept in React state so it updates AFTER processUpdate() runs.
  // Using useMemo here would snapshot stale data because useMemo runs during render
  // but useEffect (which calls processUpdate) runs after render.
  const [monitorState, setMonitorState] = useState<MonitorState | null>(null);

  // Process updates through monitor, then capture the fresh state
  useEffect(() => {
    if (!monitor || !runId) return;

    for (const update of updates) {
      monitor.processUpdate(update);
    }

    // Spread to create a new object reference — triggers re-render with updated data
    setMonitorState({ ...monitor.getState() } as MonitorState);
  }, [updates, monitor, runId]);

  useEffect(() => {
    api.projects.getAll().then(setAllProjects).catch(() => {});
  }, []);

  const loadTestResults = useCallback(async (): Promise<boolean> => {
    if (!runId || resultsLoadingRef.current) return false;
    resultsLoadingRef.current = true;
    console.log('[TestProgress] Loading test results for runId:', runId);
    try {
      const data = await api.runs.getTestResults(runId);
      console.log('[TestProgress] Received test results:', data);
      if (data.results && data.results.length > 0) {
        console.log('[TestProgress] Setting test results:', data.results.length, 'tests');
        setTestResults(data.results as ParsedTestResult[]);
        return true;
      }
      console.warn('[TestProgress] No test results in response yet');
      return false;
    } catch (error) {
      console.error('[TestProgress] Error loading test results:', error);
      return false;
    } finally {
      resultsLoadingRef.current = false;
    }
  }, [runId]);

  // Retry polling: called after run-complete when results may not be in DB yet.
  // Polls every 2s up to 5 times, stopping as soon as results are found.
  const scheduleResultsRetry = useCallback(() => {
    if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    let attempts = 0;
    retryIntervalRef.current = setInterval(async () => {
      attempts++;
      const found = await loadTestResults();
      if (found || attempts >= 5) {
        clearInterval(retryIntervalRef.current!);
        retryIntervalRef.current = null;
      }
    }, 2000);
  }, [loadTestResults]);

  // Poll run status via REST API as a fallback in case WebSocket events are missed.
  // Checks every 5s while the run is still 'running'. Stops once status transitions.
  const statusPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!runId) return;

    const checkRunStatus = async () => {
      try {
        const fetchedRunData = await api.runs.getById(runId);
        setRunData(fetchedRunData);
        if (fetchedRunData.status === 'completed' || fetchedRunData.status === 'failed') {
          setRunStatus(fetchedRunData.status);
          loadTestResults();
        }
      } catch (error) {
        console.error('[TestProgress] Error checking run status:', error);
      }
    };

    checkRunStatus();

    statusPollRef.current = setInterval(async () => {
      try {
        const data = await api.runs.getById(runId);
        setRunData(data);
        if (data.status === 'completed' || data.status === 'failed') {
          setRunStatus(data.status);
          if (statusPollRef.current) {
            clearInterval(statusPollRef.current);
            statusPollRef.current = null;
          }
          scheduleResultsRetry();
        }
      } catch {
        // ignore — will retry on next interval
      }
    }, 5000);

    return () => {
      if (statusPollRef.current) {
        clearInterval(statusPollRef.current);
        statusPollRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId]);

  // Clean up retry interval on unmount
  useEffect(() => () => {
    if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
  }, []);

  // Watch WebSocket updates for run completion and results availability
  useEffect(() => {
    if (!runId) return;

    const lastUpdate = updates[updates.length - 1];
    if (lastUpdate?.type === 'run-complete' || lastUpdate?.type === 'flow-complete') {
      setRunStatus('completed');
      if (statusPollRef.current) { clearInterval(statusPollRef.current); statusPollRef.current = null; }
      scheduleResultsRetry();
    } else if (lastUpdate?.type === 'run-error' || lastUpdate?.type === 'flow-error') {
      setRunStatus('failed');
      if (statusPollRef.current) { clearInterval(statusPollRef.current); statusPollRef.current = null; }
      scheduleResultsRetry();
    } else if (lastUpdate?.type === 'results-ready') {
      // Post-processing complete — fetch final results and cancel any pending retry
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }
      loadTestResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updates, runId]);

  // Collect console output from WebSocket or stored run data
  const consoleOutput = useMemo(() => {
    const liveOutput = updates
      .filter(u => u.type === 'test-output')
      .map(u => u.output || '')
      .join('');

    if (liveOutput) return liveOutput;

    if (runData) {
      return [runData.stdout, runData.stderr].filter(Boolean).join('\n');
    }

    return '';
  }, [updates, runData]);

  // Detect Playwright UI URL and fetch proxy URL from API
  useEffect(() => {
    if (!runId) return;

    const checkForPlaywrightUI = async () => {
      const outputUpdates = updates.filter(u => u.type === 'test-output');
      let detectedUrl: null | string = null;

      for (const update of outputUpdates) {
        const output = update.output || '';
        if (output.includes('PLAYWRIGHT_UI_URL:')) {
          detectedUrl = output.replace('PLAYWRIGHT_UI_URL:', '').trim();
          break;
        }
      }

      if (detectedUrl || (!uiModeChecked && runStatus === 'running')) {
        setUiModeChecked(true);
        try {
          const response = await fetch(`/api/playwright-ui/${runId}`);
          if (response.ok) {
            const data = await response.json();
            if (data.proxyUrl) {
              setPlaywrightUIProxyUrl(data.proxyUrl);
              setShowUIViewer(true);
            }
          } else if (detectedUrl) {
            setPlaywrightUIProxyUrl(`/api/playwright-ui-proxy/${runId}`);
            setShowUIViewer(true);
          }
        } catch {
          if (detectedUrl) {
            setPlaywrightUIProxyUrl(`/api/playwright-ui-proxy/${runId}`);
            setShowUIViewer(true);
          }
        }
      }
    };

    checkForPlaywrightUI();
  }, [updates, runId, runStatus, uiModeChecked]);

  const handleCancel = async () => {
    if (!runId) return;
    try {
      await api.runs.cancel(runId);
      setRunStatus('cancelled');
    } catch (error) {
      console.error('Error cancelling run:', error);
    }
  };

  // Use monitor state for test updates, fallback to WebSocket updates
  const testUpdates = useMemo(() => {
    if (monitorState?.tests && monitorState.tests.length > 0) {
      return monitorState.tests.map(test => ({
        error: test.error,
        status: test.status,
        testFile: test.file,
        testName: test.name,
        timestamp:
          test.endTime?.toISOString() || test.startTime?.toISOString() || new Date().toISOString(),
        type: test.isRunning ? ('test-start' as const) : ('test-end' as const),
      }));
    }
    return updates.filter(u => u.type === 'test-start' || u.type === 'test-end');
  }, [monitorState, updates]);

  useCommonShortcuts();

  const showPlaywrightUIToggle = Boolean(playwrightUIProxyUrl);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sticky top app bar */}
      <ProgressAppBar
        connected={connected}
        onCancel={handleCancel}
        onNavigateBack={() => navigate(runData?.projectId ? `/test-runner/library?project=${runData.projectId}` : '/test-runner')}
        onProjectChange={(id) => navigate(`/test-runner/library?project=${id}`)}
        onRetry={() => navigate(-1)}
        onTogglePlaywrightUI={() => setShowUIViewer(v => !v)}
        onViewResults={() => navigate(`/test-runner/results/${runId}`)}
        projectId={runData?.projectId || ''}
        projectName={allProjects.find(p => p.id === runData?.projectId)?.name || ''}
        projects={allProjects}
        runId={runId || ''}
        runStatus={runStatus}
        showPlaywrightUIToggle={showPlaywrightUIToggle}
        showUIViewer={showUIViewer}
      />

      {/* Progress summary bar (below app bar, no scroll) */}
      <RunSummaryBar monitorState={monitorState} />

      {/* Main scrollable content */}
      <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {/* Playwright UI panel (optional) */}
        {playwrightUIProxyUrl && showUIViewer && runId && (
          <PlaywrightUIPanel
            onHide={() => setShowUIViewer(false)}
            proxyUrl={playwrightUIProxyUrl}
            runId={runId}
          />
        )}

        {/* Test execution list */}
        <TestExecutionList
          consoleOutput={consoleOutput}
          monitorState={monitorState}
          onSelectTest={setSelectedTestIndex}
          runStatus={runStatus}
          selectedTestIndex={selectedTestIndex}
          testResults={testResults}
          testUpdates={testUpdates}
        />

        {/* Console output */}
        <ConsolePanel
          consoleExpanded={consoleExpanded}
          consoleOutput={consoleOutput}
          onToggleExpanded={() => setConsoleExpanded(v => !v)}
          runStatus={runStatus}
        />
      </Stack>
    </Box>
  );
}
