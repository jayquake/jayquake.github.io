import type { TestResultItem } from '../../../shared/utils/TestResultItem';
import type { TestStep } from '../../../shared/types';

export type RunStatus = 'cancelled' | 'completed' | 'failed' | 'running';

export type { TestResultItem, TestStep };

export interface MonitorState {
  progress: {
    completed: number;
    percentage: number;
    total: number;
  };
  qaseInfo?: {
    branch?: string;
    environmentHost?: string;
    environmentId?: number;
    environmentSlug?: string;
    environmentTitle?: string;
  };
  summary?: {
    duration: string;
    failed: number;
    passed: number;
    skipped: number;
  };
  testCount?: number;
  tests: TestResultItem[];
  workers?: number;
}

export interface ParsedTestResult {
  duration?: number;
  error?: string;
  file?: string;
  id?: string;
  name?: string;
  status: string;
  steps?: TestStep[];
  title?: string;
}
