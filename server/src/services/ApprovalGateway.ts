/**
 * Approval Gateway
 * 
 * Manages manual approval workflow for low-confidence Qase update intents.
 * Provides CLI, programmatic, and (future) UI approval interfaces.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import type { QaseUpdateIntent } from '../../../shared/types/playwrightSignals';

export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export type ApprovalRecord = {
  approvedAt?: string;
  approvedBy?: string;
  decisionReason?: string;
  hash: string;
  intent: QaseUpdateIntent;
  rejectedAt?: string;
  status: ApprovalStatus;
  submittedAt: string;
};

export type ApprovalRequest = {
  hash: string;
  intents: QaseUpdateIntent[];
  metadata: {
    highConfidenceCount: number;
    lowConfidenceCount: number;
    requesterName?: string;
    timestamp: string;
    totalIntents: number;
  };
};

export type ApprovalDecision = {
  approvedIntents: QaseUpdateIntent[];
  hash: string;
  rejectedIntents: QaseUpdateIntent[];
};

export class ApprovalGateway {
  private approvalDir: string;

  constructor(approvalDir: string = './approvals') {
    this.approvalDir = approvalDir;
    this.ensureApprovalDir();
  }

  /**
   * Submit intents requiring approval
   * Returns approval request with hash for later decision
   */
  submitForApproval(
    intents: QaseUpdateIntent[],
    requesterName?: string,
  ): ApprovalRequest {
    const lowConfidenceIntents = intents.filter((i) => i.confidence.requiresApproval);
    const highConfidenceIntents = intents.filter((i) => !i.confidence.requiresApproval);

    const request: ApprovalRequest = {
      hash: this.generateHash(lowConfidenceIntents),
      intents: lowConfidenceIntents,
      metadata: {
        highConfidenceCount: highConfidenceIntents.length,
        lowConfidenceCount: lowConfidenceIntents.length,
        requesterName,
        timestamp: new Date().toISOString(),
        totalIntents: intents.length,
      },
    };

    // Persist pending approval
    const records: ApprovalRecord[] = lowConfidenceIntents.map((intent) => ({
      hash: request.hash,
      intent,
      status: 'pending',
      submittedAt: request.metadata.timestamp,
    }));

    this.persistApprovalRecords(request.hash, records);

    return request;
  }

  /**
   * Record approval decision
   */
  recordDecision(
    requestHash: string,
    approvedHashes: string[],
    rejectedHashes: string[],
    approverName: string,
    reason?: string,
  ): ApprovalDecision {
    const records = this.loadApprovalRecords(requestHash);

    if (!records) {
      throw new Error(`Approval request not found: ${requestHash}`);
    }

    const approvedIntents: QaseUpdateIntent[] = [];
    const rejectedIntents: QaseUpdateIntent[] = [];
    const timestamp = new Date().toISOString();

    for (const record of records) {
      const intentHash = this.generateHash([record.intent]);

      if (approvedHashes.includes(intentHash)) {
        record.status = 'approved';
        record.approvedAt = timestamp;
        record.approvedBy = approverName;
        record.decisionReason = reason;
        approvedIntents.push(record.intent);
      } else if (rejectedHashes.includes(intentHash)) {
        record.status = 'rejected';
        record.rejectedAt = timestamp;
        record.approvedBy = approverName; // "decided by"
        record.decisionReason = reason;
        rejectedIntents.push(record.intent);
      }
    }

    // Update persisted records
    this.persistApprovalRecords(requestHash, records);

    return {
      approvedIntents,
      hash: requestHash,
      rejectedIntents,
    };
  }

  /**
   * Get approval records for a request
   */
  getApprovalRecords(requestHash: string): ApprovalRecord[] | null {
    return this.loadApprovalRecords(requestHash);
  }

  /**
   * List all pending approval requests
   */
  listPendingApprovals(): ApprovalRequest[] {
    const files = fs.readdirSync(this.approvalDir).filter((f) => f.endsWith('.json'));

    const requests: ApprovalRequest[] = [];

    for (const file of files) {
      const records = this.loadApprovalRecords(path.basename(file, '.json'));
      if (records && records.some((r) => r.status === 'pending')) {
        const pendingIntents = records.filter((r) => r.status === 'pending').map((r) => r.intent);
        
        requests.push({
          hash: records[0].hash,
          intents: pendingIntents,
          metadata: {
            highConfidenceCount: 0,
            lowConfidenceCount: pendingIntents.length,
            timestamp: records[0].submittedAt,
            totalIntents: pendingIntents.length,
          },
        });
      }
    }

    return requests;
  }

  /**
   * Auto-approve high-confidence intents, return low-confidence for review
   */
  routeByConfidence(
    intents: QaseUpdateIntent[],
  ): {
    autoApproved: QaseUpdateIntent[];
    requiresReview: QaseUpdateIntent[];
  } {
    const autoApproved = intents.filter((i) => !i.confidence.requiresApproval);
    const requiresReview = intents.filter((i) => i.confidence.requiresApproval);

    return { autoApproved, requiresReview };
  }

  /**
   * Generate approval summary report
   */
  generateSummary(request: ApprovalRequest): string {
    const lines = [
      '# Approval Request Summary',
      '',
      `**Request Hash:** ${request.hash}`,
      `**Submitted:** ${request.metadata.timestamp}`,
      `**Requester:** ${request.metadata.requesterName || 'Unknown'}`,
      '',
      '## Statistics',
      `- Total Intents: ${request.metadata.totalIntents}`,
      `- High Confidence (auto-approved): ${request.metadata.highConfidenceCount}`,
      `- Low Confidence (requires review): ${request.metadata.lowConfidenceCount}`,
      '',
      '## Intents Requiring Review',
      '',
    ];

    for (const [index, intent] of request.intents.entries()) {
      const intentHash = this.generateHash([intent]);
      
      lines.push(`### ${index + 1}. ${intent.proposedChanges.title?.new || 'Untitled'}`);
      lines.push(`**Intent Hash:** ${intentHash}`);
      lines.push(`**Confidence:** ${(intent.confidence.overall * 100).toFixed(1)}%`);
      lines.push(`**Rationale:** ${intent.rationale}`);
      lines.push('');
      lines.push('**Confidence Breakdown:**');
      lines.push(`- Selector Stability: ${(intent.confidence.breakdown.selectorStability * 100).toFixed(1)}%`);
      lines.push(`- Step Coverage: ${(intent.confidence.breakdown.stepCoverage * 100).toFixed(1)}%`);
      lines.push(`- Title Convention: ${(intent.confidence.breakdown.titleConvention * 100).toFixed(1)}%`);
      lines.push('');
      lines.push('**Proposed Changes:**');
      
      if (intent.proposedChanges.title) {
        lines.push(`- **Title:** ${intent.proposedChanges.title.new}`);
      }
      
      if (intent.proposedChanges.automation) {
        lines.push(`- **Automation:** ${intent.proposedChanges.automation.new}`);
      }
      
      if (intent.proposedChanges.steps) {
        lines.push(`- **Steps:** ${intent.proposedChanges.steps.new.length} steps`);
      }
      
      lines.push('');
      lines.push('---');
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Generate approval hash from intents
   */
  private generateHash(intents: QaseUpdateIntent[]): string {
    const content = JSON.stringify(intents, null, 0);
    return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
  }

  /**
   * Persist approval records to file
   */
  private persistApprovalRecords(hash: string, records: ApprovalRecord[]): void {
    const filePath = path.join(this.approvalDir, `${hash}.json`);
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf-8');
  }

  /**
   * Load approval records from file
   */
  private loadApprovalRecords(hash: string): ApprovalRecord[] | null {
    const filePath = path.join(this.approvalDir, `${hash}.json`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as ApprovalRecord[];
  }

  /**
   * Ensure approval directory exists
   */
  private ensureApprovalDir(): void {
    if (!fs.existsSync(this.approvalDir)) {
      fs.mkdirSync(this.approvalDir, { recursive: true });
    }
  }
}
