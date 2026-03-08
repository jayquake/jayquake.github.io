import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PathUtils } from './PathUtils';

/**
 * EnvFileManager - Manages .env file updates in the project root
 * Used to persist BASE_URL from standalone app runs for IDE test execution
 */
export class EnvFileManager {
  private static readonly ENV_FILE_NAME = '.env';

  /**
   * Check if .env file exists
   * @returns true if .env file exists
   */
  static envFileExists(): boolean {
    return existsSync(this.getEnvFilePath());
  }

  /**
   * Get the current BASE_URL from .env file
   * @returns BASE_URL value or undefined if not set
   */
  static getBaseUrl(): string | undefined {
    const content = this.readEnvFile();
    const envMap = this.parseEnvFile(content);
    return envMap.get('BASE_URL');
  }

  /**
   * Update BASE_URL in the .env file
   * Preserves all other environment variables and comments
   * @param baseUrl - The base URL to set
   */
  static updateBaseUrl(baseUrl: string): void {
    try {
      const envPath = this.getEnvFilePath();
      const originalContent = this.readEnvFile();
      const envMap = this.parseEnvFile(originalContent);

      // Update BASE_URL
      envMap.set('BASE_URL', baseUrl);

      // Serialize back to file
      const newContent = this.serializeEnvFile(envMap, originalContent);

      // Write to file
      writeFileSync(envPath, newContent, 'utf-8');
      console.log(`[EnvFileManager] Updated BASE_URL in ${envPath}: ${baseUrl}`);
    } catch (error) {
      console.error('[EnvFileManager] Error updating .env file:', error);
      throw error;
    }
  }

  /**
   * Get the absolute path to the .env file in the project root
   */
  private static getEnvFilePath(): string {
    const projectRoot = PathUtils.getProjectRoot();
    return join(projectRoot, this.ENV_FILE_NAME);
  }

  /**
   * Parse existing .env file into a map of key-value pairs
   * @param content - Raw .env file content
   * @returns Map of environment variables
   */
  private static parseEnvFile(content: string): Map<string, string> {
    const envMap = new Map<string, string>();
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      // Parse KEY=VALUE format
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex === -1) {
        continue;
      }

      const key = trimmed.substring(0, equalIndex).trim();
      const value = trimmed.substring(equalIndex + 1).trim();

      // Remove quotes if present
      const unquotedValue = value.replace(/^["']|["']$/g, '');
      envMap.set(key, unquotedValue);
    }

    return envMap;
  }

  /**
   * Read existing .env file content
   * @returns Existing content or empty string if file doesn't exist
   */
  private static readEnvFile(): string {
    const envPath = this.getEnvFilePath();
    if (!existsSync(envPath)) {
      return '';
    }

    try {
      return readFileSync(envPath, 'utf-8');
    } catch (error) {
      console.error('[EnvFileManager] Error reading .env file:', error);
      return '';
    }
  }

  /**
   * Serialize environment map back to .env file format
   * @param envMap - Map of environment variables
   * @param originalContent - Original file content to preserve comments and formatting
   * @returns Serialized .env content
   */
  private static serializeEnvFile(envMap: Map<string, string>, originalContent: string): string {
    const lines: string[] = [];
    const processedKeys = new Set<string>();

    // First pass: preserve existing structure and update existing keys
    const originalLines = originalContent.split('\n');
    for (const line of originalLines) {
      const trimmed = line.trim();

      // Preserve empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        lines.push(line);
        continue;
      }

      // Check if this line is a KEY=VALUE pair
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex === -1) {
        lines.push(line);
        continue;
      }

      const key = trimmed.substring(0, equalIndex).trim();

      // If we have a new value for this key, update it
      if (envMap.has(key)) {
        const value = envMap.get(key)!;
        lines.push(`${key}=${value}`);
        processedKeys.add(key);
      } else {
        // Preserve the original line
        lines.push(line);
      }
    }

    // Second pass: append any new keys that weren't in the original file
    const newKeys = Array.from(envMap.keys()).filter((key) => !processedKeys.has(key));
    if (newKeys.length > 0) {
      // Add a blank line before new entries if file has existing content
      if (lines.length > 0 && lines[lines.length - 1].trim() !== '') {
        lines.push('');
      }

      // Add comment for standalone app managed entries
      lines.push('# Auto-managed by standalone app');
      for (const key of newKeys) {
        const value = envMap.get(key)!;
        lines.push(`${key}=${value}`);
      }
    }

    return lines.join('\n');
  }
}
