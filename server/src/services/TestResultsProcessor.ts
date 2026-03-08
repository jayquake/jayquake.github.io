/**
 * TestResultsProcessor - Processes Playwright HTML reports and saves to database
 * Extracts and stores Qase IDs from test titles
 */

import { existsSync, readFileSync, statSync } from 'fs';
import { basename, join } from 'path';

import { QaseIdExtractor } from '../../../shared/utils/QaseIdExtractor';
import { TestReportParser } from '../../../shared/utils/TestReportParser';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { ErrorLogger } from '../infrastructure/logging/ErrorLogger';
import { TestArtifactRepository } from '../repositories/TestArtifactRepository';
import { TestResultRepository } from '../repositories/TestResultRepository';
import { TestRunRepository } from '../repositories/TestRunRepository';
import { TestStepRepository } from '../repositories/TestStepRepository';
import { QaseService } from './QaseService';
import { StepExtractor, type TestResultData } from './steps/StepExtractor';

/**
 * TestResultsProcessor - Processes Playwright test results with OOP design
 * Responsibilities:
 * - Parse test reports
 * - Extract test results and steps
 * - Save to database with Qase integration
 */
export class TestResultsProcessor {
  private qaseService: QaseService;
  private stepExtractor: StepExtractor;
  private testArtifactRepository: TestArtifactRepository;
  private testE2eDir: string;
  private testReportParser: TestReportParser;
  private testResultRepository: TestResultRepository;
  private testRunRepository: TestRunRepository;
  private testStepRepository: TestStepRepository;

  constructor() {
    const prisma = DatabaseService.getInstance().getClient();
    this.testReportParser = new TestReportParser();
    this.testRunRepository = new TestRunRepository(prisma);
    this.testResultRepository = new TestResultRepository(prisma);
    this.testStepRepository = new TestStepRepository(prisma);
    this.testArtifactRepository = new TestArtifactRepository(prisma);
    this.qaseService = new QaseService();
    this.stepExtractor = new StepExtractor(); // OOP step extraction
    this.testE2eDir = join(__dirname, '../../../..');
  }

  /**
   * Get test results with Qase test case details for a run
   */
  async getResultsWithQaseDetails(runId: string): Promise<any[]> {
    const run = await this.testRunRepository.findByRunId(runId);
    if (!run) {
      return [];
    }

    // Get test results from database
    const results = await this.testResultRepository.findByTestRunId(run.id);

    // Extract unique Qase IDs
    const qaseIds = results.map((r) => r.qaseId).filter((id): id is number => id !== undefined && id !== null);

    if (qaseIds.length === 0) {
      // No Qase IDs, return results without Qase data
      return results.map((r) => ({ qaseTestCase: null, result: r }));
    }

    // Fetch Qase test cases
    const config = JSON.parse(run.config) as any;
    const {qaseConfig} = config;

    if (!qaseConfig || !qaseConfig.enabled) {
      // Qase not configured
      return results.map((r) => ({ qaseTestCase: null, result: r }));
    }

    const qaseTestCases = await this.qaseService.getTestCases(qaseConfig, qaseIds);

    // Combine results with Qase data
    return results.map((result) => ({
      qaseTestCase: result.qaseId ? qaseTestCases.get(result.qaseId) || null : null,
      result,
    }));
  }

  /**
   * Process test run results after execution completes
   * Parses Playwright HTML report and saves results to database with Qase IDs
   */
  async processTestResults(runId: string): Promise<void> {
    console.log(`[TestResultsProcessor] Processing results for run ${runId}`);

    // Get test run from database
    const run = await this.testRunRepository.findByRunId(runId);
    if (!run) {
      console.error(`[TestResultsProcessor] Test run ${runId} not found`);
      throw new Error(`Test run ${runId} not found`);
    }

    // Use JSON report file from organized reports folder
    const jsonReportPath = join(this.testE2eDir, 'reports', 'json', 'test-results.json');

    // Validate JSON reporter is available
    if (!existsSync(jsonReportPath)) {
      const errorMsg = `JSON report not found at ${jsonReportPath}. Ensure JSON reporter is enabled in playwright.config.ts with: reporter: [['json', { outputFile: 'reports/json/test-results.json' }]]`;
      console.error(`[TestResultsProcessor] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    console.log(`[TestResultsProcessor] ✅ JSON report found at ${jsonReportPath}`);

    // Parse Playwright JSON report
    const reportData = JSON.parse(readFileSync(jsonReportPath, 'utf-8'));
    const playwrightResults = this.parseJsonReport(reportData);

    console.log(`[TestResultsProcessor] Found ${playwrightResults.length} test results`);

    // Track counts and artifacts for hybrid storage
    let passedCount = 0;
    let failedCount = 0;
    let skippedCount = 0;
    let totalArtifacts = 0;
    let totalArtifactSize = 0;

    // Save each test result to database with Qase ID
    for (const result of playwrightResults) {
      try {
        // Extract Qase ID - check multiple sources
        let {qaseId} = result;

        // If not already extracted, try from test name
        if (!qaseId) {
          qaseId = this.extractQaseIdFromName(result.name);
        }

        // If still not found, check playwrightData annotations (fallback)
        if (!qaseId && result.playwrightData) {
          try {
            const playwrightData =
              typeof result.playwrightData === 'string' ? JSON.parse(result.playwrightData) : result.playwrightData;

            if (playwrightData.annotations && Array.isArray(playwrightData.annotations)) {
              for (const annotation of playwrightData.annotations) {
                if (annotation.type === 'qase' && annotation.description) {
                  const extractedId = QaseIdExtractor.extract(annotation.description);
                  if (extractedId !== null) {
                    qaseId = extractedId;
                    console.log(
                      `[TestResultsProcessor] ✅ Extracted Qase ID ${qaseId} from annotation for test: ${result.name}`,
                    );
                    break;
                  } else {
                    console.warn(
                      `[TestResultsProcessor] ⚠️ Failed to extract Qase ID from annotation: "${annotation.description}"`,
                    );
                  }
                }
              }
            }
          } catch (parseError: any) {
            // LOG THE ERROR instead of silently ignoring
            ErrorLogger.log({
              error: parseError as Error,
              metadata: {
                playwrightDataSample:
                  typeof result.playwrightData === 'string' ? result.playwrightData.substring(0, 200) : 'object',
                playwrightDataType: typeof result.playwrightData,
                testName: result.name,
              },
              operation: 'extractQaseIdFromPlaywrightData',
              recoverable: true,
              runId: run.runId,
              service: 'TestResultsProcessor',
            });
          }
        }

        // Add warning if no Qase ID found
        if (!qaseId) {
          console.warn(`[TestResultsProcessor] No Qase ID found for test: ${result.name} (file: ${result.file})`);
        }

        // Track counts
        if (result.status === 'passed') passedCount++;
        else if (result.status === 'failed') failedCount++;
        else if (result.status === 'skipped') skippedCount++;

        // Create test result in database with playwrightData (Hybrid Storage)
        const testResult = await this.testResultRepository.create({
          browserName: result.browserName,
          duration: result.duration,
          endTime: result.endTime ? new Date(result.endTime) : undefined,
          error: result.error,
          file: result.file,
          name: result.name,
          // Hybrid Storage: Store full Playwright data
          playwrightData: result.playwrightData ? JSON.stringify(result.playwrightData) : undefined,
          projectName: result.projectName,
          qaseId,
          retryCount: result.retryCount || 0,
          startTime: new Date(result.startTime),
          status: result.status,
          testRunId: run.id,
        });

        console.log(`[TestResultsProcessor] Saved test result: ${result.name}${qaseId ? ` (Qase ID: ${qaseId})` : ''}`);

        // Save test steps
        if (result.steps && result.steps.length > 0) {
          for (let i = 0; i < result.steps.length; i++) {
            const step = result.steps[i];
            await this.testStepRepository.create({
              duration: step.duration,
              error: step.error,
              location: step.location ? JSON.stringify(step.location) : undefined,
              order: i,
              status: step.error ? 'failed' : 'passed',
              testResultId: testResult.id,
              title: step.title,
            });
          }
          console.log(`[TestResultsProcessor] Saved ${result.steps.length} steps for test: ${result.name}`);
        }

        // Hybrid Storage: Track artifacts (videos, screenshots, traces)
        if (result.artifacts && result.artifacts.length > 0) {
          for (const artifact of result.artifacts) {
            try {
              const artifactPath = artifact.path;
              const artifactFullPath = join(this.testE2eDir, artifactPath);

              // Get file size if file exists
              let size = 0;
              if (existsSync(artifactFullPath)) {
                const stats = statSync(artifactFullPath);
                size = stats.size;
                totalArtifactSize += size;
              }

              await this.testArtifactRepository.create({
                contentType: artifact.contentType,
                filename: basename(artifactPath),
                metadata: artifact.metadata ? JSON.stringify(artifact.metadata) : undefined,
                path: artifactPath,
                retentionPolicy: result.status === 'failed' ? 'keep-forever' : undefined,
                size,
                testResultId: testResult.id,
                testRunId: run.id,
                type: artifact.type,
              });

              totalArtifacts++;
            } catch (artifactError: any) {
              console.warn(`[TestResultsProcessor] Error saving artifact:`, artifactError.message);
            }
          }
          console.log(`[TestResultsProcessor] Tracked ${result.artifacts.length} artifacts for test: ${result.name}`);
        }
      } catch (error: any) {
        console.error(`[TestResultsProcessor] Error saving test result ${result.name}:`, error.message);
      }
    }

    // Extract Qase Run ID from report data or environment
    let qaseRunId: number | undefined;

    // Try to extract from report metadata (if playwright-qase-reporter includes it)
    if (reportData.config?.metadata?.qaseRunId) {
      qaseRunId = parseInt(reportData.config.metadata.qaseRunId, 10);
      console.log(`[TestResultsProcessor] Found Qase Run ID in report metadata: ${qaseRunId}`);
    } else if (reportData.qaseRunId) {
      qaseRunId = parseInt(reportData.qaseRunId, 10);
      console.log(`[TestResultsProcessor] Found Qase Run ID in report: ${qaseRunId}`);
    } else if (process.env.QASE_RUN_ID) {
      qaseRunId = parseInt(process.env.QASE_RUN_ID, 10);
      console.log(`[TestResultsProcessor] Found Qase Run ID in environment: ${qaseRunId}`);
    }

    // Hybrid Storage: Update TestRun with quick stats and Qase Run ID
    try {
      await this.testRunRepository.update(run.id, {
        failedCount,
        htmlGenerated: true, // Mark that HTML report was generated
        htmlGeneratedAt: new Date(),
        passedCount,
        qaseId: qaseRunId, // Store Qase Run ID
        skippedCount,
        testCount: playwrightResults.length,
        totalArtifacts,
        totalArtifactSize,
      });
      console.log(
        `[TestResultsProcessor] Updated run stats: ${passedCount}/${failedCount}/${skippedCount}, ${totalArtifacts} artifacts (${(totalArtifactSize / 1024 / 1024).toFixed(2)} MB)${qaseRunId ? `, Qase Run ID: ${qaseRunId}` : ''}`,
      );
    } catch (statsError: any) {
      console.error(`[TestResultsProcessor] Error updating run stats:`, statsError.message);
    }

    console.log(`[TestResultsProcessor] Completed processing results for run ${runId}`);
  }

  /**
   * Extract Qase ID from test name
   * Uses centralized QaseIdExtractor for consistency
   */
  private extractQaseIdFromName(testName: string): number | undefined {
    const id = QaseIdExtractor.extract(testName);
    return id !== null ? id : undefined;
  }

  /**
   * Parse Playwright JSON report format
   * JSON reporter format: { suites: [], config: {}, ... }
   *
   * Note: JSON reporter doesn't include detailed steps.
   * We extract pseudo-steps from errors and attachments for context.
   */
  private parseJsonReport(reportData: any): any[] {
    const results: any[] = [];

    const processSuite = (suite: any, file: string) => {
      // Process tests in this suite
      if (suite.specs && Array.isArray(suite.specs)) {
        for (const spec of suite.specs) {
          for (const test of spec.tests || []) {
            // Get the last result (most recent attempt)
            const result = test.results && test.results.length > 0 ? test.results[test.results.length - 1] : null;

            if (result) {
              // Extract steps using OOP StepExtractor
              const extractedSteps = this.stepExtractor.extractSteps(result as TestResultData, spec.title);

              // Hybrid Storage: Extract artifacts (videos, screenshots, traces)
              const artifacts: any[] = [];
              if (result.attachments && Array.isArray(result.attachments)) {
                for (const attachment of result.attachments) {
                  // Determine artifact type
                  let artifactType: null | string = null;
                  if (attachment.name === 'video' || attachment.contentType?.includes('video')) {
                    artifactType = 'video';
                  } else if (attachment.name === 'screenshot' || attachment.contentType?.includes('image')) {
                    artifactType = 'screenshot';
                  } else if (attachment.name === 'trace' || attachment.path?.endsWith('.zip')) {
                    artifactType = 'trace';
                  }

                  if (artifactType && attachment.path) {
                    artifacts.push({
                      contentType: attachment.contentType,
                      metadata: {
                        attachmentName: attachment.name,
                      },
                      path: attachment.path,
                      type: artifactType,
                    });
                  }
                }
              }

              // Extract Qase ID from multiple sources: title, annotations, and tags
              let qaseId = this.extractQaseIdFromName(spec.title);

              // If not found in title, check annotations (playwright-qase-reporter adds it here)
              if (!qaseId && test.annotations && Array.isArray(test.annotations)) {
                for (const annotation of test.annotations) {
                  if (annotation.type === 'qase' && annotation.description) {
                    const extractedId = QaseIdExtractor.extract(annotation.description);
                    if (extractedId !== null) {
                      qaseId = extractedId;
                      break;
                    }
                  }
                }
              }

              // If still not found, check tags (some reporters add qase:id tag)
              if (!qaseId && test.tags && Array.isArray(test.tags)) {
                for (const tag of test.tags) {
                  if (typeof tag === 'string') {
                    // Check for qase:id=123 format
                    const tagMatch = tag.match(/qase:id=(\d+)/i);
                    if (tagMatch) {
                      qaseId = parseInt(tagMatch[1], 10);
                      break;
                    }
                    // Also try extracting from tag text
                    const extractedId = QaseIdExtractor.extract(tag);
                    if (extractedId !== null) {
                      qaseId = extractedId;
                      break;
                    }
                  }
                }
              }

              results.push({
                artifacts, // Hybrid Storage: Artifact list
                browserName: test.projectName, // Usually includes browser name
                duration: result.duration || 0,
                endTime:
                  result.startTime && result.duration ?
                    new Date(new Date(result.startTime).getTime() + result.duration)
                  : undefined,
                error: result.error?.message,
                file,
                name: spec.title,
                // Hybrid Storage: Store full Playwright data
                playwrightData: {
                  annotations: test.annotations,
                  attachments: result.attachments?.map((a: any) => ({
                    contentType: a.contentType,
                    name: a.name,
                    path: a.path,
                  })),
                  location: test.location,
                  parallelIndex: result.parallelIndex,
                  projectId: test.projectId,
                  projectName: test.projectName,
                  retry: result.retry,
                  tags: test.tags,
                  workerIndex: result.workerIndex,
                },
                projectName: test.projectName,
                qaseId,
                retryCount: result.retry || 0,
                startTime: result.startTime ? new Date(result.startTime) : new Date(),
                status:
                  result.status === 'passed' ? 'passed'
                  : result.status === 'skipped' ? 'skipped'
                  : 'failed',
                steps: extractedSteps, // Use OOP StepExtractor
              });
            }
          }
        }
      }

      // Process nested suites
      if (suite.suites && Array.isArray(suite.suites)) {
        for (const nestedSuite of suite.suites) {
          processSuite(nestedSuite, file);
        }
      }
    };

    // Process all suites
    if (reportData.suites && Array.isArray(reportData.suites)) {
      for (const suite of reportData.suites) {
        const file = suite.file || suite.title || 'unknown';
        processSuite(suite, file);
      }
    }

    return results;
  }
}
