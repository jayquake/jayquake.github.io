import { type Request, type Response } from 'express';

import { ProjectManager } from '../../infrastructure/config/ProjectManager';
import { type DiscoveredEnvironment, EnvironmentService } from '../../services/EnvironmentService';

/**
 * EnvironmentController - API endpoints for environment/URL management
 */
export class EnvironmentController {
  private environmentService: EnvironmentService;
  private projectManager: ProjectManager;

  constructor() {
    this.environmentService = new EnvironmentService();
    this.projectManager = new ProjectManager();
  }

  /**
   * POST /api/environments/discover/:projectId
   * Fetch environments from env-hub for a project
   */
  async discover(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;

      const project = this.projectManager.getProject(projectId);
      if (!project) {
        res.status(404).json({ error: `Project not found: ${projectId}` });
        return;
      }

      if (!project.envHubNames || project.envHubNames.length === 0) {
        res.json({ count: 0, domains: [], lastUpdated: new Date().toISOString() });
        return;
      }

      const discovered: DiscoveredEnvironment[] =
        await this.environmentService.discoverFromEnvHub(project);

      res.json({
        count: discovered.length,
        domains: discovered,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('[EnvironmentController] Error discovering environments:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/environments/project/:projectId
   * Get all environments for a specific project
   */
  async getByProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;

      const environments = await this.environmentService.getEnvironmentsForProject(projectId);

      res.json(environments);
    } catch (error: any) {
      console.error('[EnvironmentController] Error getting project environments:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/environments/recent
   * Get recent environments (base URLs) for autocomplete
   */
  async getRecent(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.query.projectId as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const environments = await this.environmentService.getRecentEnvironments(projectId, limit);

      res.json(environments);
    } catch (error: any) {
      console.error('[EnvironmentController] Error getting recent environments:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/environments/search
   * Search environments by pattern
   */
  async search(req: Request, res: Response): Promise<void> {
    try {
      const pattern = req.query.pattern as string;
      const projectId = req.query.projectId as string | undefined;

      if (!pattern) {
        res.status(400).json({ error: 'Pattern parameter is required' });
        return;
      }

      const environments = await this.environmentService.searchEnvironments(pattern, projectId);

      res.json(environments);
    } catch (error: any) {
      console.error('[EnvironmentController] Error searching environments:', error);
      res.status(500).json({ error: error.message });
    }
  }
}
