/**
 * Hybrid Storage Configuration
 * Defines retention policies for artifacts and HTML reports
 */

export type StorageConfig = {
  // File storage
  artifacts: {
    baseDir: string; // Base directory for artifacts

    screenshots: {
      enabled: boolean;
      keepOnFailureOnly: boolean; // Only keep screenshots for failures
      retentionDays: number;
    };

    traces: {
      enabled: boolean;
      keepOnFailureOnly: boolean; // Only keep traces for failures
      retentionDays: number;
    };

    videos: {
      deletePassedAfterDays?: number; // Delete passed test videos after N days
      enabled: boolean;
      keepOnFailureOnly: boolean; // Only keep videos for failures
      retentionDays: number;
    };
  };

  // Cleanup
  cleanup: {
    dryRun: boolean; // Set to true to preview
    enabled: boolean;
    schedule: string; // Cron expression
  };

  // Database storage
  database: {
    storeArtifactMetadata: boolean; // Track artifact files
    storePlaywrightData: boolean; // Store full test result JSON
  };

  // HTML reports
  htmlReports: {
    generate: boolean;
    regenerateOnDemand: boolean; // Can regenerate from DB
    retentionDays: number; // Delete after N days
  };
}

/**
 * Default storage configuration
 * Balanced approach: Keep failures longer, clean up passed tests sooner
 */
export const defaultStorageConfig: StorageConfig = {
  // File storage
  artifacts: {
    baseDir: 'reports/artifacts',

    screenshots: {
      enabled: true,
      keepOnFailureOnly: false, // Keep all screenshots
      retentionDays: 14, // Keep all screenshots for 14 days
    },

    traces: {
      enabled: true,
      keepOnFailureOnly: true, // Only keep failure traces after 14 days
      retentionDays: 14, // Keep all traces for 14 days
    },

    videos: {
      deletePassedAfterDays: 1, // Delete passed test videos after 1 day
      enabled: true,
      keepOnFailureOnly: true, // Only keep failure videos after 7 days
      retentionDays: 7, // Keep all videos for 7 days
    },
  },

  // Cleanup
  cleanup: {
    dryRun: false, // Set to true to preview
    enabled: true,
    schedule: '0 2 * * *', // Daily at 2 AM
  },

  // Database storage
  database: {
    storeArtifactMetadata: true, // ✅ Track all artifacts
    storePlaywrightData: true, // ✅ Store full test data in DB
  },

  // HTML reports
  htmlReports: {
    generate: true,
    regenerateOnDemand: true, // Can regenerate from DB
    retentionDays: 3, // Delete after 3 days
  },
};

/**
 * Conservative storage configuration
 * Keep everything longer, good for critical projects
 */
export const conservativeStorageConfig: StorageConfig = {
  artifacts: {
    baseDir: 'reports/artifacts',

    screenshots: {
      enabled: true,
      keepOnFailureOnly: false,
      retentionDays: 30, // Keep all screenshots for 30 days
    },

    traces: {
      enabled: true,
      keepOnFailureOnly: false,
      retentionDays: 30, // Keep all traces for 30 days
    },

    videos: {
      enabled: true,
      keepOnFailureOnly: false, // Keep all videos
      retentionDays: 30, // Keep all videos for 30 days
    },
  },

  cleanup: {
    dryRun: false,
    enabled: true,
    schedule: '0 2 * * 0', // Weekly on Sunday at 2 AM
  },

  database: {
    storeArtifactMetadata: true,
    storePlaywrightData: true,
  },

  htmlReports: {
    generate: true,
    regenerateOnDemand: true,
    retentionDays: 7, // Delete after 7 days
  },
};

/**
 * Aggressive storage configuration
 * Clean up aggressively to save storage, good for high-volume testing
 */
export const aggressiveStorageConfig: StorageConfig = {
  artifacts: {
    baseDir: 'reports/artifacts',

    screenshots: {
      enabled: true,
      keepOnFailureOnly: true, // Only keep failure screenshots
      retentionDays: 7, // Keep screenshots for 7 days
    },

    traces: {
      enabled: true,
      keepOnFailureOnly: true, // Only keep failure traces
      retentionDays: 7, // Keep traces for 7 days
    },

    videos: {
      deletePassedAfterDays: 1, // Delete passed test videos immediately
      enabled: true,
      keepOnFailureOnly: true, // Only keep failure videos
      retentionDays: 3, // Keep videos for 3 days
    },
  },

  cleanup: {
    dryRun: false,
    enabled: true,
    schedule: '0 2 * * *', // Daily at 2 AM
  },

  database: {
    storeArtifactMetadata: true,
    storePlaywrightData: true,
  },

  htmlReports: {
    generate: true,
    regenerateOnDemand: true,
    retentionDays: 1, // Delete after 1 day
  },
};

/**
 * Get storage configuration from environment or use default
 */
export function getStorageConfig(): StorageConfig {
  const envProfile = process.env.STORAGE_PROFILE || 'default';

  switch (envProfile) {
    case 'aggressive':
      return aggressiveStorageConfig;
    case 'conservative':
      return conservativeStorageConfig;
    case 'default':
    default:
      return defaultStorageConfig;
  }
}
