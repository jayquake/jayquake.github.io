import type { Project } from '../../../shared/types';

import { EnvironmentRepository } from '../repositories/EnvironmentRepository';

/**
 * Shape of a single entry in the env-hub envs.json response.
 */
interface EnvHubEntry {
  author: string;
  date: number;
  env: string;
  name: string;
  url: string;
}

/**
 * Parsed environment returned from env-hub discovery.
 */
export interface DiscoveredEnvironment {
  author: string;
  branch: string;
  date: number;
  domain: string;
  env: string;
}

/**
 * EnvironmentService - Env-Hub / GCP environment discovery and domain memory
 */
export class EnvironmentService {
  private environmentRepository: EnvironmentRepository;

  constructor() {
    this.environmentRepository = new EnvironmentRepository();
  }

  /**
   * Discover environments from the company env-hub service.
   *
   * Fetches the full envs.json, filters entries whose `name` matches one of the
   * project's `envHubNames`, skips entries with empty/null URLs, persists each
   * domain to the Environment table, and returns the list sorted by deploy date
   * (most recent first).
   */
  async discoverFromEnvHub(project: Project): Promise<DiscoveredEnvironment[]> {
    const envHubNames = project.envHubNames;
    if (!envHubNames || envHubNames.length === 0) {
      console.log(`[EnvironmentService] No envHubNames configured for project ${project.id}`);
      return [];
    }

    const envHubUrl = process.env.ENV_HUB_URL || 'https://env-hub.acsb-test.com/envs.json';
    const envHubUser = process.env.ENV_HUB_USER || 'test';
    const envHubPass = process.env.ENV_HUB_PASS || 'acsb123';

    console.log(
      `[EnvironmentService] Fetching env-hub for project ${project.id} (names: ${envHubNames.join(', ')})`,
    );

    const authHeader = 'Basic ' + Buffer.from(`${envHubUser}:${envHubPass}`).toString('base64');

    let data: Record<string, Record<string, EnvHubEntry>>;

    try {
      const response = await fetch(envHubUrl, {
        headers: { Authorization: authHeader },
      });

      if (!response.ok) {
        throw new Error(`Env-hub responded with ${response.status}: ${response.statusText}`);
      }

      data = (await response.json()) as Record<string, Record<string, EnvHubEntry>>;
    } catch (error: any) {
      console.error(`[EnvironmentService] Failed to fetch env-hub: ${error.message}`);
      throw error;
    }

    const nameSet = new Set(envHubNames.map((n) => n.toLowerCase()));
    const discovered: DiscoveredEnvironment[] = [];

    for (const [branchSlug, projects] of Object.entries(data)) {
      for (const [projectName, entry] of Object.entries(projects)) {
        if (!nameSet.has(projectName.toLowerCase())) continue;

        const url = entry.url;
        if (!url || url === 'null' || url === '' || url === 'undefined') continue;

        const domain = url.startsWith('http') ? url : `https://${url}`;

        discovered.push({
          author: entry.author || '',
          branch: branchSlug,
          date: entry.date,
          domain,
          env: entry.env || '',
        });
      }
    }

    discovered.sort((a, b) => b.date - a.date);

    console.log(
      `[EnvironmentService] Discovered ${discovered.length} environments for project ${project.id}`,
    );

    for (const env of discovered) {
      try {
        await this.saveEnvironment(env.domain, 'github', project.id, {
          author: env.author,
          branch: env.branch,
          envBranch: env.env,
          lastDiscovered: new Date().toISOString(),
        });
      } catch (error: any) {
        console.warn(
          `[EnvironmentService] Failed to persist environment ${env.domain}: ${error.message}`,
        );
      }
    }

    return discovered;
  }

  /**
   * Discover environments from GCP
   */
  async discoverFromGCP(project: Project, gcpCredentials?: string): Promise<string[]> {
    // TODO: Implement GCP API integration
    console.log(`[EnvironmentService] GCP discovery not yet implemented for project ${project.id}`);
    return [];
  }

  /**
   * Get all environments for a project
   */
  async getEnvironmentsForProject(projectId: string): Promise<string[]> {
    const environments = await this.environmentRepository.findAll({ projectId });
    return environments.map((env) => env.domain);
  }

  /**
   * Get recent environments from memory (database)
   */
  async getRecentEnvironments(projectId?: string, limit = 10): Promise<string[]> {
    const environments = await this.environmentRepository.getRecentEnvironments(limit);

    if (projectId) {
      return environments.filter((env) => env.projectId === projectId).map((env) => env.domain);
    }

    return environments.map((env) => env.domain);
  }

  /**
   * Save environment to memory (database)
   */
  async saveEnvironment(
    domain: string,
    source: 'gcp' | 'github' | 'manual',
    projectId?: string,
    metadata?: any,
  ): Promise<void> {
    const existing = await this.environmentRepository.findByDomain(domain);

    if (existing) {
      await this.environmentRepository.updateByDomain(domain, {
        lastUsed: new Date(),
        metadata: metadata ? JSON.stringify(metadata) : existing.metadata ?? undefined,
      });
    } else {
      await this.environmentRepository.create({
        domain,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
        projectId,
        source,
      });
    }
  }

  /**
   * Search environments by domain pattern
   */
  async searchEnvironments(pattern: string, projectId?: string): Promise<string[]> {
    const environments = await this.environmentRepository.findAll({ projectId });
    return environments.filter((env) => env.domain.includes(pattern)).map((env) => env.domain);
  }
}
