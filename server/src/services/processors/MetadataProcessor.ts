/**
 * MetadataProcessor
 *
 * Processes test artifacts and metadata
 * Scans artifact directories and links them to tests
 *
 * Design Pattern: Strategy Pattern (implements processor interface)
 * Responsibilities:
 * - Scan artifact directories (videos, screenshots, traces)
 * - Match artifacts to test results
 * - Extract artifact metadata (size, type, etc.)
 * - Prepare artifact data for database storage
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

import { type ProcessedTest } from './PlaywrightReportProcessor';

export type ArtifactMetadata = {
  contentType: string;
  createdAt: Date;
  path: string;
  size: number;
  testId?: string;
  type: 'data' | 'html_report' | 'log' | 'screenshot' | 'trace' | 'video';
}

export type MetadataProcessorResult = {
  artifactCount: number;
  artifacts: ArtifactMetadata[];
  errors: string[];
  success: boolean;
}

export class MetadataProcessor {
  private testE2eRoot: string;

  constructor() {
    // Navigate to test-e2e directory (4 levels up from backend/src/services/processors)
    this.testE2eRoot = resolve(join(__dirname, '../../../..'));
  }

  /**
   * Process artifacts and metadata
   */
  async process(runId: string, tests: ProcessedTest[]): Promise<MetadataProcessorResult> {
    console.log(`[MetadataProcessor] Processing artifacts for run: ${runId}`);

    const result: MetadataProcessorResult = {
      artifactCount: 0,
      artifacts: [],
      errors: [],
      success: false,
    };

    try {
      // Process artifacts from test results
      for (const test of tests) {
        for (const artifact of test.artifacts) {
          const metadata = this.processArtifact(artifact.path, artifact.type);
          if (metadata) {
            result.artifacts.push(metadata);
          }
        }
      }

      // Scan report directories for additional artifacts
      await this.scanReportDirectories(runId, result);

      result.artifactCount = result.artifacts.length;
      result.success = true;
      console.log(`[MetadataProcessor] ✅ Processed ${result.artifactCount} artifacts`);
    } catch (error: any) {
      result.errors.push(error.message);
      console.error('[MetadataProcessor] ❌ Processing failed:', error);
    }

    return result;
  }

  /**
   * Detect artifact type from file path
   */
  private detectArtifactType(filePath: string): ArtifactMetadata | null {
    try {
      const stats = statSync(filePath);
      let type: ArtifactMetadata['type'] = 'data';

      if (filePath.endsWith('.webm') || filePath.includes('video')) {
        type = 'video';
      } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.includes('screenshot')) {
        type = 'screenshot';
      } else if (filePath.includes('trace')) {
        type = 'trace';
      } else if (filePath.endsWith('.log') || filePath.includes('log')) {
        type = 'log';
      } else {
        // Skip non-artifact files
        return null;
      }

      // Make path relative to test-e2e root
      const relativePath = filePath.replace(`${this.testE2eRoot  }/`, '');

      return {
        contentType: this.getContentType(type),
        createdAt: stats.birthtime,
        path: relativePath,
        size: stats.size,
        type,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Get content type for artifact type
   */
  private getContentType(type: ArtifactMetadata['type']): string {
    const types: Record<ArtifactMetadata['type'], string> = {
      data: 'application/octet-stream',
      html_report: 'text/html',
      log: 'text/plain',
      screenshot: 'image/png',
      trace: 'application/zip',
      video: 'video/webm',
    };

    return types[type];
  }

  /**
   * Get total size of directory
   */
  private getDirectorySize(dir: string): number {
    let size = 0;

    try {
      const entries = readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          size += this.getDirectorySize(fullPath);
        } else if (entry.isFile()) {
          const stats = statSync(fullPath);
          size += stats.size;
        }
      }
    } catch (error) {
      // Silently ignore errors
    }

    return size;
  }

  /**
   * Process a single artifact
   */
  private processArtifact(
    path: string,
    type: 'data' | 'log' | 'screenshot' | 'trace' | 'video',
  ): ArtifactMetadata | null {
    try {
      // Resolve absolute path
      const absolutePath = path.startsWith('/') ? path : join(this.testE2eRoot, path);

      if (!existsSync(absolutePath)) {
        return null;
      }

      const stats = statSync(absolutePath);

      return {
        contentType: this.getContentType(type),
        createdAt: stats.birthtime,
        path: path.startsWith('/') ? path : path,
        size: stats.size,
        type,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Recursively scan directory for artifacts
   */
  private scanDirectory(dir: string, result: MetadataProcessorResult): void {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          this.scanDirectory(fullPath, result);
        } else if (entry.isFile()) {
          const artifact = this.detectArtifactType(fullPath);
          if (artifact) {
            result.artifacts.push(artifact);
          }
        }
      }
    } catch (error) {
      // Silently ignore scan errors
    }
  }

  /**
   * Scan report directories for artifacts
   */
  private async scanReportDirectories(runId: string, result: MetadataProcessorResult): Promise<void> {
    // Scan test-results directory
    const testResultsDir = join(this.testE2eRoot, 'test-results');
    if (existsSync(testResultsDir)) {
      this.scanDirectory(testResultsDir, result);
    }

    // Scan HTML report directory
    const htmlReportDir = join(this.testE2eRoot, 'reports', 'html', runId);
    if (existsSync(htmlReportDir)) {
      result.artifacts.push({
        contentType: 'text/html',
        createdAt: new Date(),
        path: `reports/html/${runId}`,
        size: this.getDirectorySize(htmlReportDir),
        type: 'html_report',
      });
    }
  }
}
