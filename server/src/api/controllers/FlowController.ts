import { type Request, type Response } from 'express';

import type { FlowConfig, ProgressUpdate } from '../../../../shared/types';

import { FlowOrchestrator } from '../../flowOrchestrator';
import { ProjectManager } from '../../infrastructure/config/ProjectManager';
import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { FlowRepository } from '../../repositories/FlowRepository';
import { TestRunRepository } from '../../repositories/TestRunRepository';
import { ProjectService } from '../../services/ProjectService';
import { TestRunner } from '../../testRunner';

export class FlowController {
  private broadcastToClients: (data: any) => void;
  private flowOrchestrator: FlowOrchestrator;
  private flowRepository: FlowRepository;
  private testRunRepository: TestRunRepository;

  constructor(broadcastToClients: (data: any) => void) {
    const prisma = DatabaseService.getInstance().getClient();
    const projectManager = new ProjectManager();
    const testRunner = new TestRunner();
    this.flowOrchestrator = new FlowOrchestrator(testRunner, projectManager);
    this.flowRepository = new FlowRepository(prisma);
    this.testRunRepository = new TestRunRepository(prisma);
    this.broadcastToClients = broadcastToClients;
  }

  async createFlow(req: Request, res: Response): Promise<void> {
    try {
      // For now, flows are managed in memory/config
      // This is a placeholder for future database storage
      res.status(501).json({ error: 'Flow creation not yet implemented in database' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFlow(req: Request, res: Response): Promise<void> {
    try {
      // For now, flows are managed in memory/config
      // This is a placeholder for future database storage
      res.status(501).json({ error: 'Flow deletion not yet implemented in database' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async executeFlow(req: Request, res: Response): Promise<void> {
    try {
      const { flow } = req.body as { flow: FlowConfig };

      const runId = `flow-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Create flow run in database
      await this.testRunRepository.create({
        config: JSON.stringify({ flow }),
        flowId: flow.id,
        runId,
        startTime: new Date(),
        status: 'running',
        summary: JSON.stringify({
          failed: 0,
          passed: 0,
          skipped: 0,
          total: 0,
        }),
      });

      // Start flow execution asynchronously
      this.flowOrchestrator
        .executeFlow(runId, flow, (update: ProgressUpdate) => {
          this.broadcastToClients(update);
        })
        .then(async (testRun) => {
          // Update flow run in database
          await this.testRunRepository.updateByRunId(runId, {
            endTime: new Date(testRun.endTime || new Date()),
            status: testRun.status === 'completed' ? 'completed' : 'failed',
            summary: JSON.stringify(testRun.summary || {}),
          });

          this.broadcastToClients({ runId, testRun, type: 'flow-complete' });
        })
        .catch(async (error) => {
          console.error('[FlowController] Flow execution error:', error);
          await this.testRunRepository.updateByRunId(runId, {
            endTime: new Date(),
            status: 'failed',
          });
          this.broadcastToClients({
            error: error.message,
            runId,
            timestamp: new Date().toISOString(),
            type: 'flow-error',
          });
        });

      res.json({ runId, status: 'started' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllFlows(req: Request, res: Response): Promise<void> {
    try {
      // For now, flows are managed in memory/config
      // This is a placeholder for future database storage
      res.status(501).json({ error: 'Flow listing not yet implemented in database' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFlow(req: Request, res: Response): Promise<void> {
    try {
      // For now, flows are managed in memory/config
      // This is a placeholder for future database storage
      res.status(501).json({ error: 'Flow retrieval not yet implemented in database' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFlow(req: Request, res: Response): Promise<void> {
    try {
      // For now, flows are managed in memory/config
      // This is a placeholder for future database storage
      res.status(501).json({ error: 'Flow update not yet implemented in database' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
