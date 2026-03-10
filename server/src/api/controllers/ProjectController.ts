import { type Request, type Response } from 'express';

import { getNodeSdkDefaultBaseUrl, getNodeSdkTarballPath } from '../../infrastructure/utils/SdkConfigReader';
import { ProjectService } from '../../services/ProjectService';
import { TestLibraryService } from '../../services/TestLibraryService';

export class ProjectController {
  private projectService: ProjectService;
  private testLibraryService: TestLibraryService;

  constructor() {
    this.projectService = new ProjectService();
    this.testLibraryService = new TestLibraryService();
  }

  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectService.getAllProjects();
      res.json(projects.map((p) => p.toJSON()));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const project = await this.projectService.getProjectById(req.params.id);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.json(project.toJSON());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTestCases(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      const filePath = req.params.filePath ? decodeURIComponent(req.params.filePath) : '';

      if (!filePath) {
        res.status(400).json({ error: 'File path is required' });
        return;
      }

      const testCases = await this.testLibraryService.getTestCases(projectId, filePath);
      res.json(testCases);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTestFiles(req: Request, res: Response): Promise<void> {
    try {
      const testFiles = await this.projectService.getTestFiles(req.params.id);
      res.json(testFiles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTestFilesGroupedBySuite(req: Request, res: Response): Promise<void> {
    try {
      const includeQaseMetadata = req.query.includeQaseMetadata === 'true';
      const suiteGroup = await this.testLibraryService.getTestFilesGroupedBySuite(req.params.id, includeQaseMetadata);
      res.json(suiteGroup);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /api/projects/:id/sdk-default-base-url
   * For AccessFlow (Node), read the base URL from the SDK tarball's sdk.config.js.
   */
  async getSdkDefaultBaseUrl(req: Request, res: Response): Promise<void> {
    try {
      const projectId = req.params.id;
      if (projectId !== 'accessflow') {
        res.status(404).json({ error: 'SDK default URL only supported for accessflow project' });
        return;
      }
      const tgzPath = getNodeSdkTarballPath();
      const baseUrl = getNodeSdkDefaultBaseUrl(tgzPath);
      if (!baseUrl) {
        res.status(404).json({ error: 'Could not read default base URL from SDK tarball' });
        return;
      }
      res.json({ baseUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
