import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import type { Project } from '../../../../shared/types';

import { PathUtils } from '../utils/PathUtils';

const PROJECTS_DIR = join(__dirname, '../../../projects');

export class ProjectManager {
  private projects: Map<string, Project> = new Map();

  constructor() {
    this.loadProjects();
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getTestFiles(projectId: string): string[] {
    const project = this.projects.get(projectId);
    if (!project) return [];

    try {
      // Resolve to absolute only for file system operations
      const testDir = PathUtils.resolveFromTestE2e(project.testDirectory);
      const files: string[] = [];

      const scanDirectory = (dir: string, basePath = ''): void => {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          const relativePath = join(basePath, entry.name);

          if (entry.isDirectory()) {
            scanDirectory(fullPath, relativePath);
          } else if (entry.isFile() && entry.name.endsWith('.spec.ts')) {
            files.push(relativePath);
          }
        }
      };

      scanDirectory(testDir);
      return files;
    } catch (error) {
      console.error(`[ProjectManager] Error scanning test files for ${projectId}:`, error);
      throw error; // Don't mask failures - throw error instead of returning empty array
    }
  }

  validateProject(id: string): boolean {
    const project = this.projects.get(id);
    if (!project) {
      throw new Error(`Project ${id} not found`);
    }

    try {
      // Validate paths exist (throws error if not found)
      PathUtils.validatePathExists(project.testDirectory, `Test directory for project ${id}`);
      PathUtils.validatePathExists(project.configPath, `Config path for project ${id}`);
      if (project.globalSetupPath) {
        PathUtils.validatePathExists(project.globalSetupPath, `Global setup path for project ${id}`);
      }
      return true;
    } catch (error) {
      console.error(`[ProjectManager] Project validation failed for ${id}:`, error);
      throw error; // Don't mask failures
    }
  }

  private loadProjects(): void {
    try {
      if (!existsSync(PROJECTS_DIR)) {
        console.warn(`[ProjectManager] Projects directory not found: ${PROJECTS_DIR}`);
        return;
      }
      const projectFiles = readdirSync(PROJECTS_DIR).filter((file) => file.endsWith('.json'));

      for (const file of projectFiles) {
        try {
          const filePath = join(PROJECTS_DIR, file);
          const content = readFileSync(filePath, 'utf-8');
          const project: Project = JSON.parse(content);

          // Validate project structure
          if (project.id && project.name && project.testDirectory && project.configPath) {
            // Normalize paths (remove ./ prefix if present)
            project.testDirectory = PathUtils.normalizeRelativePath(project.testDirectory);
            project.configPath = PathUtils.normalizeRelativePath(project.configPath);
            if (project.globalSetupPath) {
              project.globalSetupPath = PathUtils.normalizeRelativePath(project.globalSetupPath);
            }

            // Validate paths exist - non-fatal: test suites may live in a separate checkout
            try {
              PathUtils.validatePathExists(project.testDirectory, `Test directory for project ${project.id}`);
              PathUtils.validatePathExists(project.configPath, `Config path for project ${project.id}`);
              if (project.globalSetupPath) {
                PathUtils.validatePathExists(project.globalSetupPath, `Global setup path for project ${project.id}`);
              }
            } catch {
              console.warn(`[ProjectManager] Project "${project.name}" paths not found locally. Set TEST_E2E_DIR in .env to resolve.`);
            }

            this.projects.set(project.id, project);
            console.log(`[ProjectManager] Loaded project: ${project.name} (${project.id})`);
          } else {
            console.warn(`[ProjectManager] Invalid project config: ${file}`);
          }
        } catch (error) {
          console.error(`[ProjectManager] Error loading project ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('[ProjectManager] Error loading projects:', error);
    }
  }

  // Removed resolvePath() - paths are now kept relative throughout
  // Use PathUtils.resolveFromTestE2e() when absolute path is needed for file operations
}
