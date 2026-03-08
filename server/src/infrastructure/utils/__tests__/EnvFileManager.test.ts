/**
 * EnvFileManager Tests
 * Tests for .env file management and BASE_URL persistence
 */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EnvFileManager } from '../EnvFileManager';
import { PathUtils } from '../PathUtils';

describe('EnvFileManager', () => {
  let testEnvPath: string;

  beforeEach(() => {
    // Create a temporary directory for test .env files
    const testDir = join(__dirname, '__test_env_files__');
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
    testEnvPath = join(testDir, '.env');

    // Mock PathUtils.getProjectRoot to return our test directory
    vi.spyOn(PathUtils, 'getProjectRoot').mockReturnValue(testDir);
  });

  afterEach(() => {
    // Cleanup test files
    const testDir = join(__dirname, '__test_env_files__');
    if (existsSync(testDir)) {
      rmSync(testDir, { force: true, recursive: true });
    }

    // Restore original mock
    vi.restoreAllMocks();
  });

  describe('updateBaseUrl', () => {
    it('should create new .env file with BASE_URL when file does not exist', () => {
      const baseUrl = 'https://staging.example.com';
      
      EnvFileManager.updateBaseUrl(baseUrl);
      
      expect(existsSync(testEnvPath)).toBe(true);
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('BASE_URL=https://staging.example.com');
    });

    it('should update existing BASE_URL in .env file', () => {
      // Create initial .env file
      writeFileSync(testEnvPath, 'BASE_URL=http://localhost:4001\nOTHER_VAR=value\n', 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://production.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('BASE_URL=https://production.example.com');
      expect(content).toContain('OTHER_VAR=value');
    });

    it('should preserve comments in .env file', () => {
      // Create .env with comments
      const initialContent = `# This is a comment
BASE_URL=http://localhost:4001
# Another comment
OTHER_VAR=value
`;
      writeFileSync(testEnvPath, initialContent, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://staging.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('# This is a comment');
      expect(content).toContain('# Another comment');
      expect(content).toContain('BASE_URL=https://staging.example.com');
      expect(content).toContain('OTHER_VAR=value');
    });

    it('should preserve all other environment variables', () => {
      const initialContent = `DB_URI=mongodb://localhost
BASE_URL=http://localhost:4001
API_KEY=secret123
DEBUG=true
`;
      writeFileSync(testEnvPath, initialContent, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://new-url.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('DB_URI=mongodb://localhost');
      expect(content).toContain('BASE_URL=https://new-url.example.com');
      expect(content).toContain('API_KEY=secret123');
      expect(content).toContain('DEBUG=true');
    });

    it('should handle empty lines in .env file', () => {
      const initialContent = `BASE_URL=http://localhost:4001

OTHER_VAR=value

ANOTHER_VAR=test
`;
      writeFileSync(testEnvPath, initialContent, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://staging.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('BASE_URL=https://staging.example.com');
      expect(content).toContain('OTHER_VAR=value');
      expect(content).toContain('ANOTHER_VAR=test');
    });

    it('should handle values with quotes', () => {
      const initialContent = `BASE_URL="http://localhost:4001"
QUOTED_VAR='some value'
`;
      writeFileSync(testEnvPath, initialContent, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://staging.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('BASE_URL=https://staging.example.com');
      // Quotes are preserved in the original line
      expect(content).toContain('QUOTED_VAR');
    });

    it('should add BASE_URL if not present in existing file', () => {
      const initialContent = `OTHER_VAR=value
ANOTHER_VAR=test
`;
      writeFileSync(testEnvPath, initialContent, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://staging.example.com');
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain('OTHER_VAR=value');
      expect(content).toContain('ANOTHER_VAR=test');
      expect(content).toContain('BASE_URL=https://staging.example.com');
      expect(content).toContain('# Auto-managed by standalone app');
    });

    it('should handle URLs with special characters', () => {
      const baseUrl = 'https://staging.example.com:8080/path?query=value&foo=bar';
      
      EnvFileManager.updateBaseUrl(baseUrl);
      
      const content = readFileSync(testEnvPath, 'utf-8');
      expect(content).toContain(`BASE_URL=${baseUrl}`);
    });
  });

  describe('getBaseUrl', () => {
    it('should return undefined when .env file does not exist', () => {
      const baseUrl = EnvFileManager.getBaseUrl();
      
      expect(baseUrl).toBeUndefined();
    });

    it('should return BASE_URL from .env file', () => {
      writeFileSync(testEnvPath, 'BASE_URL=https://staging.example.com\nOTHER_VAR=value\n', 'utf-8');
      
      const baseUrl = EnvFileManager.getBaseUrl();
      
      expect(baseUrl).toBe('https://staging.example.com');
    });

    it('should return undefined when BASE_URL is not set', () => {
      writeFileSync(testEnvPath, 'OTHER_VAR=value\n', 'utf-8');
      
      const baseUrl = EnvFileManager.getBaseUrl();
      
      expect(baseUrl).toBeUndefined();
    });

    it('should handle quoted values', () => {
      writeFileSync(testEnvPath, 'BASE_URL="https://staging.example.com"\n', 'utf-8');
      
      const baseUrl = EnvFileManager.getBaseUrl();
      
      expect(baseUrl).toBe('https://staging.example.com');
    });
  });

  describe('envFileExists', () => {
    it('should return false when .env file does not exist', () => {
      const exists = EnvFileManager.envFileExists();
      
      expect(exists).toBe(false);
    });

    it('should return true when .env file exists', () => {
      writeFileSync(testEnvPath, 'BASE_URL=http://localhost:4001\n', 'utf-8');
      
      const exists = EnvFileManager.envFileExists();
      
      expect(exists).toBe(true);
    });
  });

  describe('parseEnvFile', () => {
    it('should parse KEY=VALUE pairs correctly', () => {
      const content = `KEY1=value1
KEY2=value2
KEY3=value3
`;
      writeFileSync(testEnvPath, content, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://test.com');
      
      const updatedContent = readFileSync(testEnvPath, 'utf-8');
      expect(updatedContent).toContain('KEY1=value1');
      expect(updatedContent).toContain('KEY2=value2');
      expect(updatedContent).toContain('KEY3=value3');
    });

    it('should skip invalid lines', () => {
      const content = `VALID_KEY=value
invalid line without equals
ANOTHER_KEY=value2
=invalid_start
`;
      writeFileSync(testEnvPath, content, 'utf-8');
      
      EnvFileManager.updateBaseUrl('https://test.com');
      
      const updatedContent = readFileSync(testEnvPath, 'utf-8');
      expect(updatedContent).toContain('VALID_KEY=value');
      expect(updatedContent).toContain('ANOTHER_KEY=value2');
    });
  });

  describe('error handling', () => {
    it('should handle read errors gracefully', () => {
      // Test that getBaseUrl returns undefined when file doesn't exist
      const baseUrl = EnvFileManager.getBaseUrl();
      expect(baseUrl).toBeUndefined();
    });
  });
});
