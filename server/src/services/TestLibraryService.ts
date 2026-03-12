import { readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

import type { QaseConfig } from '../../../shared/types';

import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { PathUtils } from '../infrastructure/utils/PathUtils';
import { TestFileRepository } from '../repositories/TestFileRepository';
import { ProjectService } from './ProjectService';
import { QaseService } from './QaseService';
import { type TestCaseInfo, TestFileParser } from './TestFileParser';

/**
 * Test file information
 */
export type TestFileInfo = {
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

/**
 * Test file with Qase metadata overlay
 */
export type TestFileWithQase = {
  file: TestFileInfo;
  qaseTestCase?: {
    description?: string;
    id: number;
    steps?: { action: string; expected_result: string }[];
    suite?: string;
    title: string;
  };
}

/**
 * Test suite group structure
 */
export type TestSuiteGroup = {
  name: string;
  path: string;
  suites: { [key: string]: TestSuiteGroup };
  tests: TestFileInfo[];
  totalTests: number;
}

/**
 * TestLibraryService - Test file organization with Qase metadata overlay
 * Provides hybrid view of file tree structure with Qase test case metadata
 */
export class TestLibraryService {
  private cacheTTL: number = 5 * 60 * 1000; // 5 minutes
  private fileCache: Map<string, TestFileInfo[]> = new Map();
  private lastCacheTime: Map<string, number> = new Map();
  private projectService: ProjectService;
  private qaseService: QaseService;
  private testFileRepository: TestFileRepository;

  constructor(projectService?: ProjectService, qaseService?: QaseService) {
    const prisma = DatabaseService.getInstance().getClient();
    this.testFileRepository = new TestFileRepository(prisma);
    this.projectService = projectService || new ProjectService();
    this.qaseService = qaseService || new QaseService();
  }

  /**
   * Get individual test cases from a specific test file
   */
  async getTestCases(projectId: string, filePath: string): Promise<TestCaseInfo[]> {
    // Get project to resolve test directory
    const project = await this.projectService.getProjectById(projectId);
    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }

    // Parse the test file
    return TestFileParser.parseTestFileByRelativePath(filePath, project.testDirectory);
  }

  /**
   * Get all test files for a project
   * Returns file tree structure with optional Qase metadata
   */
  async getTestFiles(projectId: string, includeQaseMetadata = false): Promise<TestFileInfo[]> {
    // Check cache
    const cached = this.getCachedFiles(projectId);
    if (cached) {
      return cached;
    }

    // Get project
    const project = await this.projectService.getProjectById(projectId);
    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }

    // Scan file system for test files
    // Prefer project root so in-repo test-suite/tests is used when TEST_E2E_DIR points elsewhere
    const testDirAbsolute =
      project.testDirectory.startsWith('/')
        ? project.testDirectory
        : PathUtils.resolveTestDirectory(project.testDirectory);
    const testFiles = await this.scanTestFiles(testDirAbsolute, projectId, project.testFramework);

    // Enrich with database metadata (last run, Qase IDs)
    const enrichedFiles = await this.enrichWithDatabaseMetadata(testFiles, projectId);

    // Cache the results
    this.cacheFiles(projectId, enrichedFiles);

    return enrichedFiles;
  }

  /**
   * Get test files grouped by suite (folder structure)
   * Returns a tree structure organized by directory/suite
   */
  async getTestFilesGroupedBySuite(projectId: string, includeQaseMetadata = false): Promise<TestSuiteGroup> {
    const files = await this.getTestFiles(projectId, includeQaseMetadata);

    // Build tree structure from file paths
    const root: TestSuiteGroup = {
      name: 'root',
      path: '',
      suites: {},
      tests: [],
      totalTests: 0,
    };

    for (const file of files) {
      const parts = file.relativePath.split('/');
      const fileName = parts[parts.length - 1];
      const suitePath = parts.slice(0, -1).join('/');

      // Navigate/create suite structure
      let currentSuite = root;
      if (suitePath) {
        const suiteParts = suitePath.split('/');
        for (const part of suiteParts) {
          if (!currentSuite.suites[part]) {
            currentSuite.suites[part] = {
              name: part,
              path: suiteParts.slice(0, suiteParts.indexOf(part) + 1).join('/'),
              suites: {},
              tests: [],
              totalTests: 0,
            };
          }
          currentSuite = currentSuite.suites[part];
        }
      }

      // Add test to current suite
      currentSuite.tests.push(file);
      currentSuite.totalTests++;

      // Update parent suite totals
      let parent = root;
      if (suitePath) {
        const suiteParts = suitePath.split('/');
        for (const part of suiteParts) {
          parent = parent.suites[part];
          parent.totalTests++;
        }
      }
    }

    return root;
  }

  /**
   * Get a specific test file with full Qase metadata
   */
  async getTestFileWithQaseMetadata(
    projectId: string,
    filePath: string,
    qaseConfig?: QaseConfig,
  ): Promise<null | TestFileWithQase> {
    // Get file info from database
    const dbFile = await this.testFileRepository.findByPath(filePath);

    // Get file from filesystem
    const files = await this.getTestFiles(projectId);
    const fileInfo = files.find((f) => f.relativePath === filePath);

    if (!fileInfo) {
      return null;
    }

    // Merge database info with file info
    const mergedInfo: TestFileInfo = {
      ...fileInfo,
      lastRun: dbFile?.lastRun || fileInfo.lastRun,
      qaseId: dbFile?.qaseId || fileInfo.qaseId,
      qaseSuiteId: dbFile?.qaseSuiteId || fileInfo.qaseSuiteId,
    };

    // If Qase ID exists and config provided, fetch Qase test case
    if (mergedInfo.qaseId && qaseConfig?.enabled && qaseConfig.apiToken && qaseConfig.projectCode) {
      try {
        const qaseTestCase = await this.qaseService.getTestCase(
          qaseConfig.projectCode,
          mergedInfo.qaseId,
          qaseConfig.apiToken,
        );

        if (qaseTestCase) {
          return {
            file: mergedInfo,
            qaseTestCase: {
              description: qaseTestCase.description,
              id: qaseTestCase.id,
              steps: qaseTestCase.steps,
              suite: qaseTestCase.suite?.title,
              title: qaseTestCase.title,
            },
          };
        }
      } catch (error) {
        console.warn(`[TestLibraryService] Failed to fetch Qase test case ${mergedInfo.qaseId}:`, error);
      }
    }

    return {
      file: mergedInfo,
    };
  }

  /**
   * Link a test file to a Qase test case
   */
  async linkToQase(projectId: string, filePath: string, qaseId: number, qaseSuiteId?: number): Promise<void> {
    const existing = await this.testFileRepository.findByPath(filePath);

    if (existing) {
      await this.testFileRepository.update(existing.id, {
        qaseId,
        qaseSuiteId,
      });
    } else {
      await this.testFileRepository.create({
        path: filePath,
        projectId,
        qaseId,
        qaseSuiteId,
      });
    }

    // Clear cache to reflect changes
    this.clearCache(projectId);
  }

  /**
   * Refresh test files for a project (clear cache and rescan)
   */
  async refreshTestFiles(projectId: string): Promise<void> {
    this.clearCache(projectId);
    await this.getTestFiles(projectId);
  }

  /**
   * Update test file metadata (last run time, etc.)
   */
  async updateTestFileMetadata(projectId: string, filePath: string, metadata: { lastRun?: Date }): Promise<void> {
    const existing = await this.testFileRepository.findByPath(filePath);

    if (existing) {
      await this.testFileRepository.update(existing.id, {
        lastRun: metadata.lastRun,
      });
    } else {
      await this.testFileRepository.create({
        lastRun: metadata.lastRun,
        path: filePath,
        projectId,
      });
    }

    // Clear cache
    this.clearCache(projectId);
  }

  /**
   * Cache test files
   */
  private cacheFiles(projectId: string, files: TestFileInfo[]): void {
    this.fileCache.set(projectId, files);
    this.lastCacheTime.set(projectId, Date.now());
  }

  /**
   * Clear cache for a project
   */
  private clearCache(projectId: string): void {
    this.fileCache.delete(projectId);
    this.lastCacheTime.delete(projectId);
  }

  /**
   * Enrich test files with database metadata
   */
  private async enrichWithDatabaseMetadata(files: TestFileInfo[], projectId: string): Promise<TestFileInfo[]> {
    const enriched: TestFileInfo[] = [];

    for (const file of files) {
      const dbFile = await this.testFileRepository.findByPath(file.relativePath);

      enriched.push({
        ...file,
        lastRun: dbFile?.lastRun || undefined,
        metadata: dbFile?.metadata ? JSON.parse(dbFile.metadata) : undefined,
        qaseId: dbFile?.qaseId || undefined,
        qaseSuiteId: dbFile?.qaseSuiteId || undefined,
      });
    }

    return enriched;
  }

  /**
   * Get cached files if available and not expired
   */
  private getCachedFiles(projectId: string): null | TestFileInfo[] {
    const cached = this.fileCache.get(projectId);
    const cacheTime = this.lastCacheTime.get(projectId);

    if (cached && cacheTime) {
      const age = Date.now() - cacheTime;
      if (age < this.cacheTTL) {
        return cached;
      }
    }

    return null;
  }

  /**
   * Scan filesystem for test files
   * Supports Jest/Playwright (.spec/.test .ts|js|tsx|jsx) and pytest (test_*.py, *_test.py)
   */
  private async scanTestFiles(
    testDirectory: string,
    projectId: string,
    testFramework?: string,
  ): Promise<TestFileInfo[]> {
    const files: TestFileInfo[] = [];
    const isPytest = testFramework === 'pytest';
    const filePattern = isPytest
      ? /^test_.*\.py$|.*_test\.py$/
      : /\.(spec|test)\.(ts|js|tsx|jsx)$/;

    const scanDir = (dir: string, baseDir: string = testDirectory) => {
      try {
        const entries = readdirSync(dir);

        for (const entry of entries) {
          const fullPath = join(dir, entry);
          const stats = statSync(fullPath);

          if (stats.isDirectory()) {
            // Recursively scan subdirectories
            scanDir(fullPath, baseDir);
          } else if (stats.isFile() && entry.match(filePattern)) {
            // Test file found
            const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/');
            files.push({
              name: entry,
              path: fullPath,
              relativePath,
            });
          }
        }
      } catch (error) {
        console.warn(`[TestLibraryService] Error scanning directory ${dir}:`, error);
      }
    };

    scanDir(testDirectory);
    return files;
  }
}
