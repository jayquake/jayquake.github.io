import type { QaseConfig } from '../../../shared/types';

export interface TestCaseInfo {
  fullTitle?: string;
  lineNumber: number;
  qaseId?: number;
  title: string;
}

export interface TestFileInfo {
  lastRun?: Date;
  metadata?: {
    qaseDescription?: string;
    qaseTags?: string[];
    qaseTitle?: string;
  };
  name: string;
  path: string;
  qaseId?: number;
  qaseSuiteId?: number;
  relativePath: string;
}

export interface TestSuiteGroup {
  name: string;
  path: string;
  suites: { [key: string]: TestSuiteGroup };
  tests: TestFileInfo[];
  totalTests: number;
}

export type ExecutionMode = 'headed' | 'headless' | 'ui';

export interface ExecutionOptions {
  headless: boolean;
  httpAuthEnabled: boolean;
  httpAuthPassword: string;
  httpAuthUsername: string;
  mode: ExecutionMode;
  qaseConfig: QaseConfig;
  qaseEnabled: boolean;
  slowMo: number;
  uiMode: boolean;
  workers: number;
}

export interface DeployedEnv {
  author: string;
  branch: string;
  date: number;
  domain: string;
  env: string;
}
