import * as fs from 'fs';
import * as path from 'path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { QaseUpdateIntent } from '../../../../shared/types/playwrightSignals';

import { ApprovalGateway } from '../ApprovalGateway';

const TEST_APPROVAL_DIR = './test-approvals';

describe('ApprovalGateway', () => {
  let gateway: ApprovalGateway;

  const mockHighConfidenceIntent: QaseUpdateIntent = {
    confidence: {
      breakdown: {
        selectorStability: 0.9,
        stepCoverage: 0.9,
        titleConvention: 1.0,
      },
      overall: 0.93,
      requiresApproval: false,
      threshold: 0.7,
    },
    proposedChanges: {
      title: {
        new: 'Journeys-Page: Dashboard',
        reason: 'High confidence',
      },
    },
    rationale: 'High confidence update',
    sourceSignals: [],
  };

  const mockLowConfidenceIntent: QaseUpdateIntent = {
    confidence: {
      breakdown: {
        selectorStability: 0.3,
        stepCoverage: 0.5,
        titleConvention: 0.5,
      },
      overall: 0.43,
      requiresApproval: true,
      threshold: 0.7,
    },
    proposedChanges: {
      title: {
        new: 'Test Case Low Confidence',
        reason: 'Low confidence',
      },
    },
    rationale: 'Low confidence update',
    sourceSignals: [],
  };

  beforeEach(() => {
    gateway = new ApprovalGateway(TEST_APPROVAL_DIR);
  });

  afterEach(() => {
    // Clean up test approval directory
    if (fs.existsSync(TEST_APPROVAL_DIR)) {
      const files = fs.readdirSync(TEST_APPROVAL_DIR);
      for (const file of files) {
        fs.unlinkSync(path.join(TEST_APPROVAL_DIR, file));
      }
      fs.rmdirSync(TEST_APPROVAL_DIR);
    }
  });

  describe('Approval Submission', () => {
    it('should submit low-confidence intents for approval', () => {
      const intents = [mockHighConfidenceIntent, mockLowConfidenceIntent];
      
      const request = gateway.submitForApproval(intents, 'test-user');

      expect(request.intents).toHaveLength(1);
      expect(request.intents[0].confidence.requiresApproval).toBe(true);
      expect(request.metadata.highConfidenceCount).toBe(1);
      expect(request.metadata.lowConfidenceCount).toBe(1);
    });

    it('should generate approval hash', () => {
      const intents = [mockLowConfidenceIntent];
      
      const request = gateway.submitForApproval(intents);

      expect(request.hash).toBeDefined();
      expect(request.hash).toHaveLength(16);
    });

    it('should persist approval records', () => {
      const intents = [mockLowConfidenceIntent];
      
      const request = gateway.submitForApproval(intents);

      const records = gateway.getApprovalRecords(request.hash);
      expect(records).toBeDefined();
      expect(records).toHaveLength(1);
      expect(records![0].status).toBe('pending');
    });
  });

  describe('Approval Decision', () => {
    it('should record approval decision', () => {
      const intents = [mockLowConfidenceIntent];
      const request = gateway.submitForApproval(intents);

      // Generate intent hash for approval
      const crypto = require('crypto');
      const intentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify([mockLowConfidenceIntent], null, 0))
        .digest('hex')
        .slice(0, 16);

      const decision = gateway.recordDecision(
        request.hash,
        [intentHash],
        [],
        'approver-1',
        'Looks good',
      );

      expect(decision.approvedIntents).toHaveLength(1);
      expect(decision.rejectedIntents).toHaveLength(0);

      const records = gateway.getApprovalRecords(request.hash);
      expect(records![0].status).toBe('approved');
      expect(records![0].approvedBy).toBe('approver-1');
    });

    it('should record rejection decision', () => {
      const intents = [mockLowConfidenceIntent];
      const request = gateway.submitForApproval(intents);

      const crypto = require('crypto');
      const intentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify([mockLowConfidenceIntent], null, 0))
        .digest('hex')
        .slice(0, 16);

      const decision = gateway.recordDecision(
        request.hash,
        [],
        [intentHash],
        'approver-1',
        'Needs revision',
      );

      expect(decision.approvedIntents).toHaveLength(0);
      expect(decision.rejectedIntents).toHaveLength(1);

      const records = gateway.getApprovalRecords(request.hash);
      expect(records![0].status).toBe('rejected');
    });
  });

  describe('Confidence Routing', () => {
    it('should route by confidence threshold', () => {
      const intents = [mockHighConfidenceIntent, mockLowConfidenceIntent];
      
      const { autoApproved, requiresReview } = gateway.routeByConfidence(intents);

      expect(autoApproved).toHaveLength(1);
      expect(requiresReview).toHaveLength(1);
      expect(autoApproved[0].confidence.requiresApproval).toBe(false);
      expect(requiresReview[0].confidence.requiresApproval).toBe(true);
    });
  });

  describe('Pending Approvals', () => {
    it('should list pending approval requests', () => {
      const intent1: QaseUpdateIntent = {
        ...mockLowConfidenceIntent,
        proposedChanges: {
          title: {
            new: 'Test Case 1',
            reason: 'Low confidence',
          },
        },
      };

      const intent2: QaseUpdateIntent = {
        ...mockLowConfidenceIntent,
        proposedChanges: {
          title: {
            new: 'Test Case 2',
            reason: 'Low confidence',
          },
        },
      };

      gateway.submitForApproval([intent1], 'user-1');
      gateway.submitForApproval([intent2], 'user-2');

      const pending = gateway.listPendingApprovals();

      expect(pending.length).toBeGreaterThanOrEqual(2);
    });

    it('should not list approved requests as pending', () => {
      const intents = [mockLowConfidenceIntent];
      const request = gateway.submitForApproval(intents);

      const crypto = require('crypto');
      const intentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify([mockLowConfidenceIntent], null, 0))
        .digest('hex')
        .slice(0, 16);

      gateway.recordDecision(request.hash, [intentHash], [], 'approver-1');

      const pending = gateway.listPendingApprovals();
      
      // Should not include the approved request
      const hasApprovedRequest = pending.some((p) => p.hash === request.hash);
      expect(hasApprovedRequest).toBe(false);
    });
  });

  describe('Summary Generation', () => {
    it('should generate approval summary', () => {
      const intents = [mockLowConfidenceIntent];
      const request = gateway.submitForApproval(intents);

      const summary = gateway.generateSummary(request);

      expect(summary).toContain('Approval Request Summary');
      expect(summary).toContain(request.hash);
      expect(summary).toContain('Confidence:');
      expect(summary).toContain('43.0%');
    });
  });
});
