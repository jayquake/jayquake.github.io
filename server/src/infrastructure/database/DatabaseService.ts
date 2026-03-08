import { PrismaClient } from '@prisma/client';
import { join } from 'path';

/**
 * DatabaseService - Singleton pattern for Prisma client
 * Manages database connections and provides clearing functionality
 */
export class DatabaseService {
  private static instance: DatabaseService;
  private dbPath: string;
  private prisma: PrismaClient;

  private constructor() {
    this.dbPath = join(__dirname, '../../../prisma/data/test-runner.db');
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  /**
   * Get singleton instance of DatabaseService
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Clear all data from database (use with caution!)
   * This will delete all records from all tables
   */
  public async clearAll(): Promise<void> {
    try {
      // Delete in order to respect foreign key constraints
      await this.prisma.mCPArtifact.deleteMany();
      await this.prisma.mCPAnalysis.deleteMany();
      await this.prisma.testStep.deleteMany();
      await this.prisma.testLog.deleteMany();
      await this.prisma.testResult.deleteMany();
      await this.prisma.testRun.deleteMany();
      await this.prisma.environment.deleteMany();
      await this.prisma.testFile.deleteMany();

      console.log('[DatabaseService] All data cleared successfully');
    } catch (error) {
      console.error('[DatabaseService] Error clearing database:', error);
      throw error;
    }
  }

  /**
   * Connect to database
   */
  public async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  /**
   * Check if database file exists
   */
  public async databaseExists(): Promise<boolean> {
    const { existsSync } = await import('fs');
    return existsSync(this.dbPath);
  }

  /**
   * Disconnect from database
   */
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  /**
   * Get Prisma client instance
   */
  public getClient(): PrismaClient {
    return this.prisma;
  }

  /**
   * Get database path
   */
  public getDbPath(): string {
    return this.dbPath;
  }

  /**
   * Get database statistics
   */
  public async getStats(): Promise<{
    environments: number;
    mcpAnalyses: number;
    mcpArtifacts: number;
    testFiles: number;
    testLogs: number;
    testResults: number;
    testRuns: number;
    testSteps: number;
  }> {
    const [testRuns, testResults, testSteps, testLogs, environments, testFiles, mcpAnalyses, mcpArtifacts] =
      await Promise.all([
        this.prisma.testRun.count(),
        this.prisma.testResult.count(),
        this.prisma.testStep.count(),
        this.prisma.testLog.count(),
        this.prisma.environment.count(),
        this.prisma.testFile.count(),
        this.prisma.mCPAnalysis.count(),
        this.prisma.mCPArtifact.count(),
      ]);

    return {
      environments,
      mcpAnalyses,
      mcpArtifacts,
      testFiles,
      testLogs,
      testResults,
      testRuns,
      testSteps,
    };
  }
}

// Export singleton instance
export const databaseService = DatabaseService.getInstance();
