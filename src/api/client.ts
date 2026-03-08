const API_URL = process.env.REACT_APP_API_URL || '';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = `API error: ${response.statusText}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // response body not parseable, keep generic message
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  artifacts: {
    getArtifactUrl: (artifactId: string) => `${API_URL}/api/artifacts/file/${artifactId}`,
    getRunArtifacts: (runId: string) =>
      fetchAPI<{
        artifacts: {
          logs: any[];
          screenshots: any[];
          traces: any[];
          videos: any[];
        };
        stats: {
          logs: number;
          screenshots: number;
          traces: number;
          videos: number;
        };
        success: boolean;
        total: number;
      }>(`/api/artifacts/run/${runId}`),
    getStats: (runId: string) =>
      fetchAPI<{
        stats: {
          byType: Record<string, { count: number; size: number }>;
          totalCount: number;
          totalSize: number;
        };
        success: boolean;
      }>(`/api/artifacts/stats/${runId}`),
    getTestResultArtifacts: (resultId: string) =>
      fetchAPI<{
        artifacts: {
          logs: Array<{
            contentType: string | null;
            filename: string;
            id: string;
            pageSnapshotContent: string | null;
            path: string;
            resolvedUrl: string | null;
            size: number | null;
            type: 'log';
          }>;
          screenshots: Array<{
            contentType: string | null;
            filename: string;
            id: string;
            pageSnapshotContent: null;
            path: string;
            resolvedUrl: string | null;
            size: number | null;
            type: 'screenshot';
          }>;
          traces: Array<{
            contentType: string | null;
            filename: string;
            id: string;
            pageSnapshotContent: null;
            path: string;
            resolvedUrl: string | null;
            size: number | null;
            type: 'trace';
          }>;
          videos: Array<{
            contentType: string | null;
            filename: string;
            id: string;
            pageSnapshotContent: null;
            path: string;
            resolvedUrl: string | null;
            size: number | null;
            type: 'video';
          }>;
        };
        success: boolean;
        total: number;
      }>(`/api/artifacts/result/${resultId}`),
  },
  cleanup: {
    cleanupRun: (runId: string, options?: { dryRun?: boolean }) =>
      fetchAPI<{
        dryRun: boolean;
        report: any;
        success: boolean;
      }>(`/api/cleanup/run/${runId}`, {
        body: JSON.stringify(options || {}),
        method: 'DELETE',
      }),
    getArtifactStats: () =>
      fetchAPI<{
        stats: {
          byType: Record<string, { count: number; size: number }>;
          totalCount: number;
          totalSize: number;
        };
        success: boolean;
      }>('/api/cleanup/artifacts/stats'),
    getConfig: () =>
      fetchAPI<{
        config: any;
        success: boolean;
      }>('/api/cleanup/config'),
    getStats: () =>
      fetchAPI<{
        config: any;
        stats: any;
        success: boolean;
      }>('/api/cleanup/stats'),
    run: (options?: { dryRun?: boolean }) =>
      fetchAPI<{
        dryRun: boolean;
        report: any;
        success: boolean;
      }>('/api/cleanup/run', {
        body: JSON.stringify(options || {}),
        method: 'POST',
      }),
  },
  environments: {
    discover: (projectId: string) =>
      fetchAPI<{
        count: number;
        domains: {
          author: string;
          branch: string;
          date: number;
          domain: string;
          env: string;
        }[];
        lastUpdated: string;
      }>(`/api/environments/discover/${projectId}`, { method: 'POST' }),
    getRecent: (projectId?: string, limit?: number) => {
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      if (limit) params.append('limit', limit.toString());
      return fetchAPI<string[]>(`/api/environments/recent?${params.toString()}`);
    },
    search: (pattern: string, projectId?: string) => {
      const params = new URLSearchParams();
      params.append('pattern', pattern);
      if (projectId) params.append('projectId', projectId);
      return fetchAPI<string[]>(`/api/environments/search?${params.toString()}`);
    },
  },
  flows: {
    execute: (flow: any) =>
      fetchAPI<{ runId: string; status: string }>('/api/flows/execute', {
        body: JSON.stringify({ flow }),
        method: 'POST',
      }),
  },
  mcp: {
    analyzeElement: (url: string, selector: string, context?: string) =>
      fetchAPI<{ analysis: any }>('/api/mcp/analyze-element', {
        body: JSON.stringify({ context, selector, url }),
        method: 'POST',
      }),
    analyzeRun: (runId: string) =>
      fetchAPI<{ analyses: any[]; error?: string }>(`/api/mcp/analyze-run/${runId}`, {
        method: 'POST',
      }),
    cleanup: () =>
      fetchAPI<{ success: boolean }>('/api/mcp/cleanup', {
        method: 'POST',
      }),
    getElementAtPosition: (x: number, y: number) =>
      fetchAPI<{ element?: any; selector?: string; success: boolean }>(
        '/api/mcp/get-element-at-position',
        {
          body: JSON.stringify({ x, y }),
          method: 'POST',
        }
      ),
    getStatus: () =>
      fetchAPI<{ available: boolean; cliMode?: boolean; message: string; tools: string[]; url: string }>(
        '/api/mcp/status'
      ),
    interact: (action: { selector?: string; type: string; url?: string; value?: string }) =>
      fetchAPI<{ result: any }>('/api/mcp/interact', {
        body: JSON.stringify(action),
        method: 'POST',
      }),
    navigate: (url: string) =>
      fetchAPI<{ success: boolean }>('/api/mcp/navigate', {
        body: JSON.stringify({ url }),
        method: 'POST',
      }),
    validateSelector: (selector: string) =>
      fetchAPI<{
        count: number;
        error?: string;
        matches: Array<{ id?: string; tag: string; text: string }>;
      }>('/api/mcp/validate-selector', {
        body: JSON.stringify({ selector }),
        method: 'POST',
      }),
    navigateToFailure: (
      url: string,
      selector?: string,
      highlight?: boolean,
      testResultId?: string,
      suggestedSelectors?: string[],
      pageSnapshotContent?: string,
    ) =>
      fetchAPI<{
        currentUrl?: string;
        error?: string;
        expectedUrl?: string;
        navigationOutcome?: 'auth-redirect' | 'correct' | 'not-loaded' | 'wrong-page';
        playwrightSteps?: Array<{ duration?: number; error?: string; status: string; step_number: number; title: string }>;
        qaseSteps?: Array<{ action: string; expected_result?: string; step_number: number }>;
        refreshedSelectors?: string[];
        reportScreenshotUrl?: string;
        screenshot?: string;
        steps?: { detail?: string; status: string; step: string; timestamp: string }[];
        success: boolean;
        validatedSelectors?: Array<{ count: number; selector: string; status: 'pass' | 'fail'; tag?: string }>;
      }>(
        '/api/mcp/navigate-to-failure',
        {
          body: JSON.stringify({ highlight, pageSnapshotContent, selector, suggestedSelectors, testResultId, url }),
          method: 'POST',
        }
      ),
  },
  projects: {
    getAll: () => fetchAPI<any[]>('/api/projects'),
    getById: (id: string) => fetchAPI<any>(`/api/projects/${id}`),
    getTestCases: (id: string, filePath: string) =>
      fetchAPI<{ fullTitle?: string; lineNumber: number; qaseId?: number; title: string; }[]>(
        `/api/projects/${id}/test-cases/${encodeURIComponent(filePath)}`
      ),
    getTestFiles: (id: string, includeQaseMetadata?: boolean) => {
      const params = new URLSearchParams();
      if (includeQaseMetadata) params.append('includeQaseMetadata', 'true');
      return fetchAPI<any[]>(`/api/projects/${id}/test-files?${params.toString()}`);
    },
    getTestFileWithQase: (id: string, filePath: string) =>
      fetchAPI<any>(`/api/projects/${id}/test-files/${encodeURIComponent(filePath)}`),
    getTests: (id: string) => fetchAPI<string[]>(`/api/projects/${id}/tests`),
    getTestSuites: (id: string, includeQaseMetadata?: boolean) => {
      const params = new URLSearchParams();
      if (includeQaseMetadata) params.append('includeQaseMetadata', 'true');
      return fetchAPI<any>(`/api/projects/${id}/test-suites?${params.toString()}`);
    },
  },
  qase: {
    getStatus: () =>
      fetchAPI<{
        config: any;
        configured: boolean;
        defaultProjectCode: string;
        message: string;
        method: string;
      }>('/api/qase/status'),
    getTestCase: (projectCode: string, testCaseId: number) =>
      fetchAPI<{ fetchedVia: string; testCase: any; }>(
        `/api/qase/test-case/${projectCode}/${testCaseId}`
      ),
    validate: (config: any) =>
      fetchAPI<{ errors: string[]; valid: boolean; }>('/api/qase/validate', {
        body: JSON.stringify(config),
        method: 'POST',
      }),
    validationPilot: (params: {
      applyApproved: boolean;
      baseUrl: string;
      qaseConfig: { apiToken: string; enabled: boolean; projectCode: string };
      suiteId: number;
    }) =>
      fetchAPI<any>('/api/qase/validation/pilot', {
        body: JSON.stringify(params),
        method: 'POST',
      }),
  },
  runs: {
    cancel: (runId: string) =>
      fetchAPI<{ cancelled: boolean }>(`/api/runs/${runId}/cancel`, {
        method: 'POST',
      }),
    create: (projectId: string, config: any) =>
      fetchAPI<{ runId: string; status: string }>('/api/runs', {
        body: JSON.stringify({ config, projectId }),
        method: 'POST',
      }),
    getAll: (projectId?: string, flowId?: string) => {
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      if (flowId) params.append('flowId', flowId);
      return fetchAPI<any[]>(`/api/runs?${params.toString()}`);
    },
    getById: (runId: string) => fetchAPI<any>(`/api/runs/${runId}`),
    getPostProcessingStatus: (runId: string) =>
      fetchAPI<{
        completed: boolean;
        error: null | string;
        inProgress: boolean;
        progress: { testsProcessed: number; totalTests: number };
        runStatus: string;
      }>(`/api/runs/${runId}/post-processing-status`),
    getQaseTestCases: (runId: string, options?: RequestInit) =>
      fetchAPI<{
        cached?: boolean; // Deprecated, use 'source' instead
        count: number;
        lastFetched?: string;
        source: 'cache' | 'database' | 'empty';
        testCases: Record<number, any>;
      }>(`/api/runs/${runId}/qase-test-cases`, options),
    getReport: (runId: string) =>
      fetchAPI<{ exists: boolean; reportPath: string; reportUrl: string; }>(
        `/api/runs/${runId}/report`
      ),
    getResultsWithQase: (runId: string) =>
      fetchAPI<{ results: any[] }>(`/api/runs/${runId}/results-with-qase`),
    getTestResults: (runId: string) =>
      fetchAPI<{ results: any[]; summary: any }>(`/api/runs/${runId}/test-results`),
  },
  ruleLab: {
    listRules: () => fetchAPI<{ engineRules: any[]; legacyRules: any[]; total: number }>('/api/rules'),
    getRule: (ruleId: string) => fetchAPI<any>(`/api/rules/${ruleId}`),
    getRuleExamples: (ruleId: string) => fetchAPI<{ existing: any[]; discovered: Record<string, any[]> }>(`/api/rules/${ruleId}/examples`),
    getRuleAnalyses: (ruleId: string) => fetchAPI<any[]>(`/api/rules/${ruleId}/analyses`),

    analyzeExample: (ruleId: string, ruleType: string, htmlSnippet: string, exampleType?: string) =>
      fetchAPI<any>('/api/rule-lab/analyze', {
        body: JSON.stringify({ exampleType, htmlSnippet, ruleId, ruleType }),
        method: 'POST',
      }),
    discoverOnSite: (ruleId: string, ruleType: string, siteUrl: string) =>
      fetchAPI<any>('/api/rule-lab/discover', {
        body: JSON.stringify({ ruleId, ruleType, siteUrl }),
        method: 'POST',
      }),
    discoverAll: (ruleId: string, ruleType: string) =>
      fetchAPI<any>('/api/rule-lab/discover-all', {
        body: JSON.stringify({ ruleId, ruleType }),
        method: 'POST',
      }),

    listSites: () => fetchAPI<any[]>('/api/rule-lab/sites'),
    addSite: (name: string, url: string, category: string) =>
      fetchAPI<any>('/api/rule-lab/sites', {
        body: JSON.stringify({ category, name, url }),
        method: 'POST',
      }),
    updateSite: (siteId: string, data: { enabled?: boolean; name?: string; category?: string }) =>
      fetchAPI<any>(`/api/rule-lab/sites/${siteId}`, {
        body: JSON.stringify(data),
        method: 'PATCH',
      }),

    curateExample: (exampleId: string) =>
      fetchAPI<any>(`/api/rule-lab/curate/${exampleId}`, {
        method: 'POST',
      }),

    checkHealth: () => fetchAPI<any>('/api/rule-lab/health'),
  },
  slack: {
    getConfig: () =>
      fetchAPI<{
        channelId: null | string;
        configured: boolean;
        enabled: boolean;
      }>('/api/slack/config'),
    sendTestResults: (runId: string, resultsUrl?: string) =>
      fetchAPI<{ message: string; runId: string }>('/api/slack/send-results', {
        body: JSON.stringify({ resultsUrl, runId }),
        method: 'POST',
      }),
    testConnection: (message?: string) =>
      fetchAPI<{ message: string }>('/api/slack/test', {
        body: JSON.stringify({ message }),
        method: 'POST',
      }),
  },
};

export { API_URL };
