import type { FlowConfig, ProgressUpdate, Project, TestRun, TestRunConfig } from '../../shared/types';

import { TestRunSummary } from '../../shared/domain/valueObjects/TestRunSummary';
import { type ProjectManager } from './infrastructure/config/ProjectManager';
import { type TestRunner } from './testRunner';

export class FlowOrchestrator {
  private projectManager: ProjectManager;
  private testRunner: TestRunner;

  constructor(testRunner: TestRunner, projectManager: ProjectManager) {
    this.testRunner = testRunner;
    this.projectManager = projectManager;
  }

  cancelFlow(runId: string, projectIds: string[]): void {
    for (const projectId of projectIds) {
      this.testRunner.cancel(`${runId}-${projectId}`);
    }
  }

  async executeFlow(runId: string, flow: FlowConfig, onProgress: (update: ProgressUpdate) => void): Promise<TestRun> {
    const startTime = new Date().toISOString();
    const results: any[] = [];
    let overallSuccess = true;

    onProgress({
      runId,
      timestamp: startTime,
      type: 'flow-start',
    });

    // Execute projects in order
    for (const projectId of flow.order) {
      const projectConfig = flow.projects.find((p) => p.projectId === projectId);
      if (!projectConfig) {
        console.warn(`[FlowOrchestrator] Project config not found: ${projectId}`);
        continue;
      }

      const project = this.projectManager.getProject(projectId);
      if (!project) {
        console.warn(`[FlowOrchestrator] Project not found: ${projectId}`);
        continue;
      }

      onProgress({
        projectId,
        runId,
        timestamp: new Date().toISOString(),
        type: 'project-start',
      });

      try {
        const result = await this.testRunner.runTests(`${runId}-${projectId}`, project, projectConfig, (update) => {
          // Forward progress updates with project context
          onProgress({
            ...update,
            projectId,
          });
        });

        results.push({
          projectId,
          projectName: project.name,
          ...result,
        });

        if (!result.success) {
          overallSuccess = false;
          // Optionally continue with other projects or stop
          // For now, we continue
        }
      } catch (error) {
        console.error(`[FlowOrchestrator] Error running project ${projectId}:`, error);
        overallSuccess = false;
        results.push({
          error: error instanceof Error ? error.message : String(error),
          projectId,
          projectName: project.name,
          success: false,
        });
      }

      onProgress({
        projectId,
        runId,
        timestamp: new Date().toISOString(),
        type: 'project-end',
      });
    }

    const endTime = new Date().toISOString();
    const duration = new Date(endTime).getTime() - new Date(startTime).getTime();

    // Aggregate results
    const aggregatedData = this.aggregateResults(results);
    const summary = new TestRunSummary(aggregatedData);

    onProgress({
      runId,
      timestamp: endTime,
      type: 'flow-end',
    });

    return {
      config: flow,
      duration,
      endTime,
      flowId: flow.id,
      id: runId,
      projects: flow.order,
      results: [], // Individual test results would be aggregated here
      startTime,
      status: overallSuccess ? 'completed' : 'failed',
      summary: summary.toJSON(), // Serialize to JSON for storage
    };
  }

  private aggregateResults(results: any[]): {
    exitCode?: number;
    failed: number;
    passed: number;
    skipped: number;
    stderr?: string;
    stdout?: string;
    total: number;
  } {
    const aggregated = results.reduce(
      (acc, result) => {
        if (result.results) {
          acc.total += result.results.total || 0;
          acc.failed += result.results.failures || 0;
          acc.skipped += result.results.skipped || 0;
          acc.passed += (result.results.total || 0) - (result.results.failures || 0) - (result.results.skipped || 0);

          // Aggregate stdout and stderr
          if (result.results.stdout) {
            acc.stdout = (acc.stdout || '') + result.results.stdout;
          }
          if (result.results.stderr) {
            acc.stderr = (acc.stderr || '') + result.results.stderr;
          }

          // Use the last exit code (or non-zero if any failed)
          if (result.results.exitCode !== undefined) {
            if (result.results.exitCode !== 0 || acc.exitCode === undefined) {
              acc.exitCode = result.results.exitCode;
            }
          }
        }
        return acc;
      },
      {
        exitCode: undefined as number | undefined,
        failed: 0,
        passed: 0,
        skipped: 0,
        stderr: undefined as string | undefined,
        stdout: undefined as string | undefined,
        total: 0,
      },
    );

    // Remove undefined values
    if (aggregated.stdout === undefined) {
      delete aggregated.stdout;
    }
    if (aggregated.stderr === undefined) {
      delete aggregated.stderr;
    }
    if (aggregated.exitCode === undefined) {
      delete aggregated.exitCode;
    }

    return aggregated;
  }
}
