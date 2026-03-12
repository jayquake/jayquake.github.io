import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import type { Project } from '../../../../shared/types';

import { PathUtils } from '../utils/PathUtils';

const PROJECTS_DIR = join(PathUtils.getProjectRoot(), 'server', 'projects');

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

    const testFilePatterns = this.getTestFilePatterns(project.testFramework);

    try {
      // Resolve to absolute: prefer project root so in-repo test-suite/tests is used
      const testDir = PathUtils.resolveTestDirectory(project.testDirectory);
      const files: string[] = [];

      const scanDirectory = (dir: string, basePath = ''): void => {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          const relativePath = join(basePath, entry.name);

          if (entry.isDirectory()) {
            if (entry.name === '__pycache__' || entry.name === 'node_modules' || entry.name === 'target') continue;
            scanDirectory(fullPath, relativePath);
          } else if (entry.isFile() && testFilePatterns.some((p) => entry.name.match(p))) {
            files.push(relativePath);
          }
        }
      };

      scanDirectory(testDir);
      return files;
    } catch (error) {
      console.error(`[ProjectManager] Error scanning test files for ${projectId}:`, error);
      throw error;
    }
  }

  private getTestFilePatterns(testFramework?: string): RegExp[] {
    switch (testFramework) {
      case 'pytest':
        return [/^test_.*\.py$/, /.*_test\.py$/];
      case 'maven':
        return [/.*Test\.java$/, /.*Tests\.java$/];
      default:
        return [/\.spec\.(ts|js)$/];
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
            if (project.workingDirectory) {
              project.workingDirectory = PathUtils.normalizeRelativePath(project.workingDirectory);
            }
            if (project.outputDirectory) {
              project.outputDirectory = PathUtils.normalizeRelativePath(project.outputDirectory);
            }

            // Validate paths exist - non-fatal: test suites may live in a separate checkout
            try {
              PathUtils.validatePathExists(project.testDirectory, `Test directory for project ${project.id}`);
              // Only validate configPath for Playwright projects; pytest/maven use their own configs
              const isPlaywright = !project.testFramework || project.testFramework === 'playwright';
              if (isPlaywright) {
                PathUtils.validatePathExists(project.configPath, `Config path for project ${project.id}`);
              }
              if (project.globalSetupPath) {
                PathUtils.validatePathExists(project.globalSetupPath, `Global setup path for project ${project.id}`);
              }
            } catch {
              console.warn(`[ProjectManager] Project "${project.name}" paths not found locally. Set TEST_E2E_DIR in .env to resolve.`);
            }

            this.projects.set(project.id, project);
            console.log(`[ProjectManager] Loaded project: ${project.name} (${project.id}) [${project.testFramework || 'playwright'}]`);
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
