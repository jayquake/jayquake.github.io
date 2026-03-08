/**
 * DatabasePopulator
 *
 * Populates database with processed test data
 * Saves test results, steps, artifacts, and Qase metadata
 *
 * Design Pattern: Repository Pattern (uses repositories for data access)
 * Responsibilities:
 * - Save test results to database
 * - Save test steps to database
 * - Save artifact metadata to database
 * - Link Qase metadata to test results
 * - Ensure data integrity
 */

import { basename } from 'path';

import { type PrismaClient } from '@prisma/client';

import { TestArtifactRepository } from '../../repositories/TestArtifactRepository';
import { TestResultRepository } from '../../repositories/TestResultRepository';
import { TestStepRepository } from '../../repositories/TestStepRepository';
import { type MetadataProcessorResult } from './MetadataProcessor';
import { type PlaywrightProcessorResult } from './PlaywrightReportProcessor';
import { type QaseProcessorResult } from './QaseDataProcessor';

export type DatabasePopulatorResult = {
  artifactsCreated: number;
  errors: string[];
  resultsCreated: number;
  stepsCreated: number;
  success: boolean;
}

export class DatabasePopulator {
  private prisma: PrismaClient;
  private testArtifactRepository: TestArtifactRepository;
  private testResultRepository: TestResultRepository;
  private testStepRepository: TestStepRepository;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.testResultRepository = new TestResultRepository(prisma);
    this.testStepRepository = new TestStepRepository(prisma);
    this.testArtifactRepository = new TestArtifactRepository(prisma);
  }

  /**
   * Populate database with all processed data
   */
  async populate(
    runId: string,
    playwrightData: PlaywrightProcessorResult,
    qaseData: QaseProcessorResult,
    metadataData: MetadataProcessorResult,
  ): Promise<DatabasePopulatorResult> {
    console.log(`[DatabasePopulator] Populating database for run: ${runId}`);

    const result: DatabasePopulatorResult = {
      artifactsCreated: 0,
      errors: [],
      resultsCreated: 0,
      stepsCreated: 0,
      success: false,
    };

    try {
      // First, get the TestRun to get its database ID
      const testRun = await this.prisma.testRun.findUnique({
        where: { runId },
      });

      if (!testRun) {
        throw new Error(`TestRun not found for runId: ${runId}`);
      }

      console.log(`[DatabasePopulator] Found TestRun with database ID: ${testRun.id}`);

      // Step 1: Save test results
      console.log(`[DatabasePopulator] Saving ${playwrightData.tests.length} test results...`);
      for (const test of playwrightData.tests) {
        try {
          // Get Qase test case if available
          const qaseTestCase = test.qaseId ? qaseData.testCaseMap.get(test.qaseId) : undefined;

          // Build playwrightData JSON with annotations for Hybrid Storage
          const playwrightDataJson = JSON.stringify({
            annotations: test.annotations || [],
            artifacts: test.artifacts?.map((a) => ({
              contentType: a.contentType,
              name: a.name,
              path: a.path,
              type: a.type,
            })) || [],
            fullTitle: test.fullTitle,
          });

          // Create test result (using database ID, not runId)
          const testResult = await this.testResultRepository.create({
            duration: test.duration,
            endTime: test.endTime,
            error: test.error,
            file: test.testFile,
            name: test.title,
            playwrightData: playwrightDataJson,
            qaseId: test.qaseId,
            startTime: test.startTime,
            status: test.status,
            testRunId: testRun.id,
          });

          result.resultsCreated++;

          // Step 2: Save test steps
          if (test.steps && test.steps.length > 0) {
            for (let i = 0; i < test.steps.length; i++) {
              const step = test.steps[i];
              try {
                await this.testStepRepository.create({
                  duration: step.duration,
                  error: step.error,
                  order: i + 1,
                  status: step.error ? 'failed' : 'passed',
                  testResultId: testResult.id,
                  title: step.title,
                });

                result.stepsCreated++;
              } catch (error: any) {
                console.warn(
                  `[DatabasePopulator] Failed to save step ${i + 1} for result ${testResult.id}:`,
                  error.message,
                );
              }
            }
          }

          // Step 3: Save test-specific artifacts
          const testArtifacts = metadataData.artifacts.filter((artifact) =>
            test.artifacts.some((testArtifact) => artifact.path.includes(testArtifact.path)),
          );

          for (const artifact of testArtifacts) {
            try {
              // Map metadata artifact type to DB-compatible type
              const dbType: 'log' | 'screenshot' | 'trace' | 'video' =
                artifact.type === 'data' || artifact.type === 'html_report' ? 'log' : artifact.type;

              await this.testArtifactRepository.create({
                contentType: artifact.contentType,
                filename: basename(artifact.path),
                path: artifact.path,
                size: artifact.size,
                testResultId: testResult.id,
                testRunId: testRun.id,
                type: dbType,
              });

              result.artifactsCreated++;
            } catch (error: any) {
              console.warn(`[DatabasePopulator] Failed to save artifact for result ${testResult.id}:`, error.message);
            }
          }
        } catch (error: any) {
          result.errors.push(`Failed to save test result: ${test.title} - ${error.message}`);
          console.error(`[DatabasePopulator] Failed to save test result: ${test.title}:`, error);
        }
      }

      // Step 4: Save run-level artifacts (HTML report, etc.)
      const runLevelArtifacts = metadataData.artifacts.filter(
        (artifact) =>
          artifact.type === 'html_report' ||
          !playwrightData.tests.some((test) =>
            test.artifacts.some((testArtifact) => artifact.path.includes(testArtifact.path)),
          ),
      );

      for (const artifact of runLevelArtifacts) {
        try {
          // Map metadata artifact type to DB-compatible type
          const dbType: 'log' | 'screenshot' | 'trace' | 'video' =
            artifact.type === 'data' || artifact.type === 'html_report' ? 'log' : artifact.type;

          await this.testArtifactRepository.create({
            contentType: artifact.contentType,
            filename: basename(artifact.path),
            path: artifact.path,
            size: artifact.size,
            testRunId: testRun.id,
            type: dbType,
          });

          result.artifactsCreated++;
        } catch (error: any) {
          console.warn(`[DatabasePopulator] Failed to save run-level artifact:`, error.message);
        }
      }

      result.success = true;
      console.log(`[DatabasePopulator] ✅ Database populated successfully:`, {
        artifactsCreated: result.artifactsCreated,
        resultsCreated: result.resultsCreated,
        stepsCreated: result.stepsCreated,
      });
    } catch (error: any) {
      result.errors.push(error.message);
      console.error('[DatabasePopulator] ❌ Database population failed:', error);
    }

    return result;
  }
}
