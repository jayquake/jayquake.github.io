import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * GitService class handles git operations with proper error handling
 * and fallbacks for non-git repositories.
 */
export class GitService {
  private _isGitRepository: boolean | null = null;
  private _repositoryPath: string;

  constructor(repositoryPath: string) {
    this._repositoryPath = repositoryPath;
  }

  /**
   * Get current branch name
   */
  getCurrentBranch(): null | string {
    if (!this.isGitRepository()) {
      return null;
    }

    try {
      // Try to get branch from HEAD
      const headPath = join(this._repositoryPath, '.git', 'HEAD');
      if (!existsSync(headPath)) {
        return null;
      }

      const headContent = require('fs').readFileSync(headPath, 'utf-8').trim();

      // If HEAD points to a branch (ref: refs/heads/branch-name)
      if (headContent.startsWith('ref: ')) {
        const branchRef = headContent.replace('ref: refs/heads/', '');
        return branchRef;
      }

      // If HEAD is a commit hash (detached HEAD), try to get branch name
      try {
        const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
          cwd: this._repositoryPath,
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();

        // If it returns HEAD, we're in detached HEAD state
        if (branchName === 'HEAD') {
          return null;
        }

        return branchName;
      } catch {
        return null;
      }
    } catch (error: any) {
      // Silently fail - not a git repo or HEAD doesn't exist
      return null;
    }
  }

  /**
   * Get current commit hash
   */
  getCurrentCommit(): null | string {
    if (!this.isGitRepository()) {
      return null;
    }

    try {
      const commitHash = execSync('git rev-parse HEAD', {
        cwd: this._repositoryPath,
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();

      return commitHash || null;
    } catch {
      return null;
    }
  }

  /**
   * Get repository info safely
   */
  getRepositoryInfo(): {
    branch: null | string;
    commit: null | string;
    hasCommits: boolean;
    isGitRepository: boolean;
  } {
    return {
      branch: this.getCurrentBranch(),
      commit: this.getCurrentCommit(),
      hasCommits: this.hasCommits(),
      isGitRepository: this.isGitRepository(),
    };
  }

  /**
   * Check if HEAD exists (repository has at least one commit)
   */
  hasCommits(): boolean {
    if (!this.isGitRepository()) {
      return false;
    }

    try {
      execSync('git rev-parse --verify HEAD', {
        cwd: this._repositoryPath,
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if the directory is a git repository
   */
  isGitRepository(): boolean {
    if (this._isGitRepository !== null) {
      return this._isGitRepository;
    }

    const gitDir = join(this._repositoryPath, '.git');
    this._isGitRepository = existsSync(gitDir);
    return this._isGitRepository;
  }
}
