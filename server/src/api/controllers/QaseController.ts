import { type Request, type Response } from 'express';

import type { IntentObject, QaseConfig, QuerySpec } from '../../../../shared/types';
import type { PlaywrightSignal } from '../../../../shared/types/playwrightSignals';

import { getMcpConfig } from '../../config/mcp';
import { ApprovalGateway } from '../../services/ApprovalGateway';
import { artifactPersistence } from '../../services/ArtifactPersistenceService';
import { operationHasher } from '../../services/OperationHasher';
import { PlaywrightToQaseMapper } from '../../services/PlaywrightToQaseMapper';
import { QaseHybridRouter } from '../../services/QaseHybridRouter';
import { getMetricsCollector } from '../../services/QaseMetricsCollector';
import { QaseService } from '../../services/QaseService';
import { QaseSyncService } from '../../services/QaseSyncService';
import { UIVsQaseValidationService } from '../../services/UIVsQaseValidationService';

export class QaseController {
  private approvalGateway: ApprovalGateway;
  private hybridRouter: QaseHybridRouter;
  private playwrightMapper: PlaywrightToQaseMapper;
  private qaseService: QaseService;
  private qaseSyncService: QaseSyncService;
  private validationService: UIVsQaseValidationService;

  constructor() {
    this.qaseService = new QaseService();
    this.qaseSyncService = new QaseSyncService(this.qaseService);
    this.hybridRouter = new QaseHybridRouter({
      mcpAvailable: false,
      preferMcpThreshold: 50,
      restFallbackEnabled: true,
    });
    this.playwrightMapper = new PlaywrightToQaseMapper();
    this.approvalGateway = new ApprovalGateway('./approvals');
    this.validationService = new UIVsQaseValidationService(getMcpConfig().url);
  }

  /**
   * POST /api/qase/sync/apply
   * 
   * Apply approved operations from a dry-run to Qase.
   * 
   * Request body:
   * {
   *   runHash: string,                   // Must match a dry-run runHash
   *   approvedOperationHashes: string[], // Operation hashes to apply
   *   qaseConfig: QaseConfig,           // Qase configuration
   *   metadata?: {                      // Optional metadata
   *     approvedBy?: string,
   *     approvalTimestamp?: string,
   *   }
   * }
   * 
   * Response:
   * {
   *   success: boolean,
   *   appliedOperations: [
   *     {
   *       operationHash: string,
   *       qaseId: number,
   *       status: 'success' | 'failed' | 'skipped',
   *       error?: string,
   *     }
   *   ],
   *   summary: {
   *     total: number,
   *     succeeded: number,
   *     failed: number,
   *     skipped: number,
   *   },
   *   rollbackArtifactPath?: string,
   * }
   */
  async applySync(req: Request, res: Response): Promise<void> {
    try {
      const { approvedOperationHashes, metadata, qaseConfig, runHash } = req.body;

      // Validate request body
      if (!runHash || typeof runHash !== 'string') {
        res.status(400).json({ 
          error: 'Invalid request: runHash is required',
        });
        return;
      }

      if (!approvedOperationHashes || !Array.isArray(approvedOperationHashes)) {
        res.status(400).json({ 
          error: 'Invalid request: approvedOperationHashes must be an array',
        });
        return;
      }

      if (!qaseConfig || !qaseConfig.apiToken || !qaseConfig.projectCode) {
        res.status(400).json({ 
          error: 'Invalid request: qaseConfig must include apiToken and projectCode',
        });
        return;
      }

      // Extract runId from runHash (format: dry-run-{timestamp}-{random})
      // We need to load the dry-run artifact to get the full result
      // For now, we'll try to find it by listing artifacts
      const allArtifacts = await artifactPersistence.listArtifacts('');
      const dryRunFiles = allArtifacts.filter((f) => f.includes('dry-run-diff'));
      
      if (dryRunFiles.length === 0) {
        res.status(404).json({ 
          error: 'No dry-run artifacts found. Run dry-run sync first.',
        });
        return;
      }

      // Load the most recent dry-run (or we should match by hash)
      // For proper implementation, we need to load and verify the hash
      let dryRunResult = null;
      for (const file of dryRunFiles.sort().reverse()) {
        const runId = file.replace('dry-run-diff_', '').replace('.json', '');
        const loaded = await artifactPersistence.loadDryRun(runId);
        if (loaded && loaded.runHash === runHash) {
          dryRunResult = loaded;
          break;
        }
      }

      if (!dryRunResult) {
        res.status(404).json({ 
          error: `Dry-run artifact with hash ${runHash} not found. It may have expired or been cleaned up.`,
        });
        return;
      }

      // Validate the apply request using ApplyGateContract
      const { applyGateContract } = await import('../../services/OperationHasher');
      const validation = applyGateContract.validateAndPrepareApply(
        { approvedOperationHashes, metadata, runHash },
        dryRunResult,
      );

      if (!validation.valid) {
        res.status(400).json({ 
          error: 'Invalid apply request',
          errors: validation.errors,
        });
        return;
      }

      // Get the approved operations
      const approvedOperations = validation.operations;

      if (approvedOperations.length === 0) {
        res.status(400).json({ 
          error: 'No valid operations to apply',
        });
        return;
      }

      console.log(`[QaseController] Applying ${approvedOperations.length} approved operations`);

      // Persist rollback patches before applying
      const rollbackArtifactPath = await artifactPersistence.persistRollbackPatches(
        dryRunResult.runId,
        approvedOperations,
      );

      // Apply operations via QaseSyncService
      const applyResult = await this.qaseSyncService.applyOperations(
        approvedOperations,
        qaseConfig as QaseConfig,
      );

      // Persist apply journal
      await artifactPersistence.persistApplyJournal(
        dryRunResult.runId,
        applyResult,
        metadata?.approvedBy,
      );

      // Return apply result
      res.json({
        ...applyResult,
        rollbackArtifactPath,
      });
    } catch (error: any) {
      console.error('[QaseController] Apply sync error:', error);
      res.status(500).json({ 
        error: error.message || 'Internal server error during apply sync',
      });
    }
  }

  /**
   * POST /api/qase/sync/dry-run
   * 
   * Generate a dry-run diff preview for Qase sync operations.
   * 
   * Request body:
   * {
   *   intentObjects: IntentObject[], // Array of normalized intent objects
   *   qaseConfig: QaseConfig,         // Qase configuration
   * }
   * 
   * Response:
   * {
   *   runId: string,
   *   runHash: string,
   *   timestamp: string,
   *   summary: {
   *     totalCandidates: number,
   *     updates: number,
   *     skipped: number,
   *     requiresApproval: number,
   *   },
   *   operations: QaseDiffOperation[],
   *   artifactPath?: string,
   * }
   */
  async dryRunSync(req: Request, res: Response): Promise<void> {
    try {
      const { intentObjects, qaseConfig } = req.body;

      // Validate request body
      if (!intentObjects || !Array.isArray(intentObjects)) {
        res.status(400).json({ 
          error: 'Invalid request: intentObjects must be an array',
        });
        return;
      }

      if (!qaseConfig || !qaseConfig.apiToken || !qaseConfig.projectCode) {
        res.status(400).json({ 
          error: 'Invalid request: qaseConfig must include apiToken and projectCode',
        });
        return;
      }

      // Generate sync candidates
      const candidates = await this.qaseSyncService.generateSyncCandidates(
        intentObjects as IntentObject[],
        qaseConfig as QaseConfig,
      );

      // Compute diff operations (without hashes)
      const operationsWithoutHashes = await this.qaseSyncService.computeDiffOperations(candidates);

      // Add operation hashes
      const operations = operationHasher.batchAddOperationHashes(operationsWithoutHashes);

      // Build dry-run result
      const runId = `dry-run-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const timestamp = new Date().toISOString();

      const dryRunResultWithoutHash = {
        operations,
        runId,
        summary: {
          requiresApproval: operations.filter((op) => op.requiresApproval).length,
          skipped: candidates.filter((c) => c.operation === 'skip').length,
          totalCandidates: candidates.length,
          updates: operations.length,
        },
        timestamp,
      };

      // Add run hash
      const dryRunResult = operationHasher.addDryRunHash(dryRunResultWithoutHash);

      // Persist dry-run artifact
      const artifactPath = await artifactPersistence.persistDryRun(dryRunResult);

      // Return dry-run result with artifact path
      res.json({
        ...dryRunResult,
        artifactPath,
      });
    } catch (error: any) {
      console.error('[QaseController] Dry-run sync error:', error);
      res.status(500).json({ 
        error: error.message || 'Internal server error during dry-run sync',
      });
    }
  }

  /**
   * Get Qase service status
   */
  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const config = {
        apiToken: process.env.QASE_API_TOKEN ? `***${  process.env.QASE_API_TOKEN.slice(-4)}` : 'Not Set',
        enabled: Boolean(process.env.QASE_API_TOKEN),
        host: process.env.QASE_TESTOPS_HOST || 'https://api.qase.io',
        projectCode: process.env.QASE_PROJECT_CODE || 'ACCESSFLOW',
      };

      res.json({
        config,
        configured: config.enabled,
        defaultProjectCode: process.env.QASE_PROJECT_CODE || 'ACCESSFLOW',
        message: 'Using Qase REST API',
        method: 'REST API',
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Test fetching a single test case
   */
  async getTestCase(req: Request, res: Response): Promise<void> {
    try {
      const { projectCode, testCaseId } = req.params;
      const apiToken = process.env.QASE_API_TOKEN;

      if (!apiToken || !projectCode) {
        res.status(400).json({ error: 'Missing Qase configuration' });
        return;
      }

      const config = {
        apiToken,
        enabled: true,
        projectCode,
      };

      const testCase = await this.qaseService.getTestCase(config, parseInt(testCaseId, 10));

      if (!testCase) {
        res.status(404).json({ error: 'Test case not found' });
        return;
      }

      res.json({
        fetchedVia: 'REST API',
        testCase,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Test fetching multiple test cases
   */
  async getTestCases(req: Request, res: Response): Promise<void> {
    try {
      const { projectCode } = req.query;
      const { ids } = req.body; // Array of test case IDs
      const apiToken = process.env.QASE_API_TOKEN;

      if (!apiToken || !projectCode || !Array.isArray(ids)) {
        res.status(400).json({ error: 'Missing Qase configuration or invalid IDs array' });
        return;
      }

      const config = {
        apiToken,
        enabled: true,
        projectCode: projectCode as string,
      };

      const testCasesMap = await this.qaseService.getTestCases(config, ids);

      // Convert Map to object for JSON response
      const testCases: Record<number, any> = {};
      testCasesMap.forEach((testCase, id) => {
        testCases[id] = testCase;
      });

      res.json({
        count: testCasesMap.size,
        fetchedVia: 'REST API',
        testCases,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Validate Qase configuration
   */
  async validateConfig(req: Request, res: Response): Promise<void> {
    try {
      const validation = this.qaseService.validateConfig(req.body);
      res.json(validation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // ========================================
  // Hybrid MCP Workflow Methods
  // ========================================

  /**
   * POST /api/qase/hybrid/query
   * Execute a query using hybrid routing
   */
  async hybridQuery(req: Request, res: Response): Promise<void> {
    try {
      const spec = req.body.spec as QuerySpec;
      const qaseConfig = req.body.qaseConfig as QaseConfig;

      const { decision, result } = await this.hybridRouter.executeQuery(spec, qaseConfig);

      res.json({
        decision,
        query: result,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * POST /api/qase/hybrid/transform
   * Transform Playwright signals to Qase intents
   */
  async transformSignals(req: Request, res: Response): Promise<void> {
    try {
      const signals = req.body.signals as PlaywrightSignal[];
      const requesterName = req.body.requesterName as string | undefined;

      const transformResult = this.playwrightMapper.transformSignals(signals);

      // Route by confidence
      const { autoApproved, requiresReview } = this.approvalGateway.routeByConfidence(
        transformResult.intents,
      );

      // Submit low-confidence for approval
      let approvalRequest;
      if (requiresReview.length > 0) {
        approvalRequest = this.approvalGateway.submitForApproval(transformResult.intents, requesterName);
      }

      res.json({
        approvalRequest,
        autoApproved: autoApproved.length,
        requiresReview: requiresReview.length,
        success: true,
        transformResult,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/approvals/pending
   * List pending approvals
   */
  async listPendingApprovals(req: Request, res: Response): Promise<void> {
    try {
      const pending = this.approvalGateway.listPendingApprovals();

      res.json({
        pending,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/approvals/:hash
   * Get approval records
   */
  async getApprovalRecords(req: Request, res: Response): Promise<void> {
    try {
      const { hash } = req.params;
      const records = this.approvalGateway.getApprovalRecords(hash);

      if (!records) {
        res.status(404).json({
          error: 'Approval request not found',
          success: false,
        });
        return;
      }

      res.json({
        records,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * POST /api/qase/approvals/:hash/decide
   * Record approval decision
   */
  async recordApprovalDecision(req: Request, res: Response): Promise<void> {
    try {
      const { hash } = req.params;
      const { approvedHashes, approverName, reason, rejectedHashes } = req.body;

      const decision = this.approvalGateway.recordDecision(
        hash,
        approvedHashes || [],
        rejectedHashes || [],
        approverName,
        reason,
      );

      res.json({
        decision,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/hybrid/config
   * Get hybrid router configuration
   */
  async getHybridConfig(req: Request, res: Response): Promise<void> {
    try {
      const config = this.hybridRouter.getConfig();

      res.json({
        config,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * PATCH /api/qase/hybrid/config
   * Update hybrid router configuration
   */
  async updateHybridConfig(req: Request, res: Response): Promise<void> {
    try {
      const updates = req.body;

      this.hybridRouter.updateConfig(updates);

      res.json({
        config: this.hybridRouter.getConfig(),
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/metrics
   * Get metrics summary
   */
  async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      const { startTime, endTime, hours } = req.query;

      const metricsCollector = getMetricsCollector();

      let start: Date | undefined;
      let end: Date | undefined;

      if (startTime) {
        start = new Date(startTime as string);
      } else if (hours) {
        start = new Date(Date.now() - parseInt(hours as string, 10) * 60 * 60 * 1000);
      }

      if (endTime) {
        end = new Date(endTime as string);
      }

      const summary = metricsCollector.getSummary(start, end);

      res.json({
        metrics: summary,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/metrics/rate-limits
   * Get recent rate limit incidents
   */
  async getRateLimitIncidents(req: Request, res: Response): Promise<void> {
    try {
      const { hours = '1' } = req.query;

      const metricsCollector = getMetricsCollector();
      const incidents = metricsCollector.getRecentRateLimits(parseInt(hours as string, 10));

      res.json({
        incidents,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/qase/metrics/distribution
   * Get path distribution (MCP vs REST usage)
   */
  async getPathDistribution(req: Request, res: Response): Promise<void> {
    try {
      const metricsCollector = getMetricsCollector();
      const distribution = metricsCollector.getPathDistribution();

      res.json({
        distribution,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * POST /api/qase/metrics/export
   * Export metrics to file
   */
  async exportMetrics(req: Request, res: Response): Promise<void> {
    try {
      const { endTime, outputPath, startTime } = req.body;

      const metricsCollector = getMetricsCollector();

      const start = startTime ? new Date(startTime) : undefined;
      const end = endTime ? new Date(endTime) : undefined;

      metricsCollector.exportMetrics(outputPath, start, end);

      res.json({
        message: `Metrics exported to ${outputPath}`,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * POST /api/qase/metrics/clear
   * Clear old metrics events
   */
  async clearOldMetrics(req: Request, res: Response): Promise<void> {
    try {
      const { daysToKeep = 30 } = req.body;

      const metricsCollector = getMetricsCollector();
      metricsCollector.clearOldEvents(daysToKeep);

      res.json({
        message: `Cleared events older than ${daysToKeep} days`,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  // ========================================
  // Pilot Validation Workflow
  // ========================================

  /**
   * POST /api/qase/validation/pilot
   * Run UI vs Qase validation pilot for a suite
   */
  async runValidationPilot(req: Request, res: Response): Promise<void> {
    try {
      const { applyApproved = false, baseUrl, qaseConfig, suiteId } = req.body;

      // Validate request body
      if (!suiteId || typeof suiteId !== 'number') {
        res.status(400).json({
          error: 'Invalid request: suiteId is required and must be a number',
          success: false,
        });
        return;
      }

      if (!baseUrl || typeof baseUrl !== 'string') {
        res.status(400).json({
          error: 'Invalid request: baseUrl is required',
          success: false,
        });
        return;
      }

      if (!qaseConfig || !qaseConfig.apiToken || !qaseConfig.projectCode) {
        res.status(400).json({
          error: 'Invalid request: qaseConfig must include apiToken and projectCode',
          success: false,
        });
        return;
      }

      console.log(`[QaseController] Running validation pilot for suite ${suiteId}`);

      // Step 1: Run UI vs Qase validation
      const validationReport = await this.validationService.validateSuite(
        suiteId,
        baseUrl,
        qaseConfig as QaseConfig,
      );

      console.log(`[QaseController] Validation complete: ${validationReport.metadata.totalCases} cases checked`);
      console.log(`[QaseController] Accurate: ${validationReport.metadata.accurateCount}, Needs Update: ${validationReport.metadata.needsUpdateCount}`);

      // Step 2: Convert validation results to Playwright signals
      const signals = this.validationService.convertToPlaywrightSignals(validationReport, baseUrl);

      console.log(`[QaseController] Generated ${signals.length} Playwright signals from mismatches`);

      if (signals.length === 0) {
        res.json({
          message: 'All test cases are accurate - no updates needed',
          success: true,
          validationReport,
        });
        return;
      }

      // Step 3: Transform signals to Qase update intents
      const transformResult = this.playwrightMapper.transformSignals(signals);

      console.log(`[QaseController] Transformed to ${transformResult.intents.length} update intents`);

      // Step 4: Route by confidence
      const { autoApproved, requiresReview } = this.approvalGateway.routeByConfidence(
        transformResult.intents,
      );

      console.log(`[QaseController] Auto-approved: ${autoApproved.length}, Requires review: ${requiresReview.length}`);

      // Step 5: Generate dry-run diff
      const intentObjects: any[] = [];
      for (const intent of transformResult.intents) {
        if (intent.caseId && intent.proposedChanges) {
          const qaseSteps = intent.proposedChanges.steps?.new?.map((step, idx) => ({
            action: step.action,
            expectedResult: step.expected_result,
            fallbackSelectors: [],
            order: idx + 1,
            primarySelector: '',
          })) || [];

          intentObjects.push({
            metadata: {
              qaseId: intent.caseId,
              requiresApproval: intent.confidence.requiresApproval,
              source: 'ui-validation-pilot',
            },
            steps: qaseSteps,
            title: intent.proposedChanges.title?.new || '',
            type: 'page',
          });
        }
      }

      const candidates = await this.qaseSyncService.generateSyncCandidates(
        intentObjects,
        qaseConfig as QaseConfig,
      );

      const operationsWithoutHashes = await this.qaseSyncService.computeDiffOperations(candidates);
      const operations = operationHasher.batchAddOperationHashes(operationsWithoutHashes);

      const runId = `pilot-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const timestamp = new Date().toISOString();

      const dryRunResultWithoutHash = {
        operations,
        runId,
        summary: {
          requiresApproval: operations.filter((op) => op.requiresApproval).length,
          skipped: candidates.filter((c) => c.operation === 'skip').length,
          totalCandidates: candidates.length,
          updates: operations.length,
        },
        timestamp,
      };

      const dryRunResult = operationHasher.addDryRunHash(dryRunResultWithoutHash);

      // Persist dry-run artifact
      const artifactPath = await artifactPersistence.persistDryRun(dryRunResult);

      console.log(`[QaseController] Dry-run complete: ${operations.length} operations`);

      // Step 6: Submit for approval if needed
      let approvalRequest;
      if (requiresReview.length > 0) {
        approvalRequest = this.approvalGateway.submitForApproval(
          transformResult.intents,
          'pilot-validation',
        );
        console.log(`[QaseController] Approval request created: ${approvalRequest.hash}`);
      }

      // Step 7: Apply if requested and approved
      let applyResult;
      if (applyApproved && operations.length > 0) {
        console.log(`[QaseController] Applying ${autoApproved.length} auto-approved operations`);

        // Only apply auto-approved operations
        const autoApprovedHashes = operations
          .filter((op) => !op.requiresApproval)
          .map((op) => op.operationHash);

        if (autoApprovedHashes.length > 0) {
          const rollbackArtifactPath = await artifactPersistence.persistRollbackPatches(
            runId,
            operations.filter((op) => autoApprovedHashes.includes(op.operationHash)),
          );

          applyResult = await this.qaseSyncService.applyOperations(
            operations.filter((op) => autoApprovedHashes.includes(op.operationHash)),
            qaseConfig as QaseConfig,
          );

          await artifactPersistence.persistApplyJournal(
            runId,
            applyResult,
            'pilot-validation-auto',
          );

          console.log(`[QaseController] Applied ${applyResult.appliedOperations.length} operations`);
        }
      }

      // Return comprehensive pilot report
      res.json({
        applyResult,
        approvalRequest,
        artifactPath,
        dryRunResult,
        metrics: {
          duration: Date.now() - Date.parse(validationReport.metadata.timestamp),
          requestCount: validationReport.metadata.totalCases,
          successRate: validationReport.summary.accuracyRate,
        },
        success: true,
        transformResult,
        validationReport,
      });
    } catch (error: any) {
      console.error('[QaseController] Pilot validation error:', error);
      res.status(500).json({
        error: error.message || 'Internal server error during pilot validation',
        success: false,
      });
    }
  }
}
