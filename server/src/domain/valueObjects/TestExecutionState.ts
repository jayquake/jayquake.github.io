/**
 * TestExecutionState - State machine for test execution lifecycle
 *
 * Prevents race conditions and ensures valid state transitions
 * Tracks execution phases with timestamps for debugging
 *
 * Design Pattern: State Machine Pattern
 */

export enum TestExecutionPhase {
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  EXECUTING_TESTS = 'executing_tests',
  FAILED = 'failed',
  GENERATING_REPORTS = 'generating_reports',
  INITIALIZING = 'initializing',
  POST_PROCESSING = 'post_processing',
  PRE_FETCHING_QASE = 'pre_fetching_qase',
}

type PhaseHistoryEntry = {
  phase: TestExecutionPhase;
  timestamp: Date;
}

export class TestExecutionStateMachine {
  private currentPhase: TestExecutionPhase = TestExecutionPhase.INITIALIZING;
  private phaseHistory: PhaseHistoryEntry[] = [];
  private runId: string;

  constructor(runId: string) {
    this.runId = runId;
    this.recordPhase(TestExecutionPhase.INITIALIZING);
  }

  /**
   * Check if transition to a phase is valid
   */
  canTransitionTo(phase: TestExecutionPhase): boolean {
    return this.getValidTransitions().includes(phase);
  }

  /**
   * Get current phase
   */
  getCurrentPhase(): TestExecutionPhase {
    return this.currentPhase;
  }

  /**
   * Get duration of a specific phase
   * @returns Duration in milliseconds, or null if phase not found
   */
  getDuration(phase: TestExecutionPhase): null | number {
    const phaseEntry = this.phaseHistory.find((h) => h.phase === phase);
    if (!phaseEntry) return null;

    const index = this.phaseHistory.indexOf(phaseEntry);
    const nextEntry = this.phaseHistory[index + 1];

    if (!nextEntry) {
      // Still in this phase
      return Date.now() - phaseEntry.timestamp.getTime();
    }

    return nextEntry.timestamp.getTime() - phaseEntry.timestamp.getTime();
  }

  /**
   * Get phase history
   */
  getPhaseHistory(): PhaseHistoryEntry[] {
    return [...this.phaseHistory];
  }

  /**
   * Get a summary of the execution
   */
  getSummary(): {
    currentPhase: TestExecutionPhase;
    isTerminal: boolean;
    phaseDurations: Record<string, null | number>;
    runId: string;
    totalDuration: number;
  } {
    const phaseDurations: Record<string, null | number> = {};

    for (const phase of Object.values(TestExecutionPhase)) {
      phaseDurations[phase] = this.getDuration(phase);
    }

    return {
      currentPhase: this.currentPhase,
      isTerminal: this.isTerminal(),
      phaseDurations,
      runId: this.runId,
      totalDuration: this.getTotalDuration(),
    };
  }

  /**
   * Get total execution time
   */
  getTotalDuration(): number {
    if (this.phaseHistory.length === 0) return 0;

    const start = this.phaseHistory[0].timestamp.getTime();
    const end = this.phaseHistory[this.phaseHistory.length - 1].timestamp.getTime();

    return end - start;
  }

  /**
   * Check if execution is in a terminal state
   */
  isTerminal(): boolean {
    return [TestExecutionPhase.CANCELLED, TestExecutionPhase.COMPLETED, TestExecutionPhase.FAILED].includes(
      this.currentPhase,
    );
  }

  /**
   * Transition to a new phase
   * @throws Error if transition is invalid
   */
  transition(to: TestExecutionPhase): void {
    if (!this.canTransitionTo(to)) {
      throw new Error(
        `Invalid state transition: ${this.currentPhase} → ${to}\n` +
          `Valid transitions: ${this.getValidTransitions().join(', ')}\n` +
          `Run ID: ${this.runId}\n` +
          `Phase history: ${this.phaseHistory.map((h) => h.phase).join(' → ')}`,
      );
    }

    this.recordPhase(to);
    this.currentPhase = to;
    console.log(`[TestExecution] [${this.runId}] Transitioned to: ${to}`);
  }

  /**
   * Get valid transitions from current phase
   */
  private getValidTransitions(): TestExecutionPhase[] {
    const transitions: Record<TestExecutionPhase, TestExecutionPhase[]> = {
      [TestExecutionPhase.CANCELLED]: [],
      [TestExecutionPhase.COMPLETED]: [],
      [TestExecutionPhase.EXECUTING_TESTS]: [
        TestExecutionPhase.POST_PROCESSING,
        TestExecutionPhase.FAILED,
        TestExecutionPhase.CANCELLED,
      ],
      [TestExecutionPhase.FAILED]: [],
      [TestExecutionPhase.GENERATING_REPORTS]: [TestExecutionPhase.COMPLETED, TestExecutionPhase.FAILED],
      [TestExecutionPhase.INITIALIZING]: [
        TestExecutionPhase.PRE_FETCHING_QASE,
        TestExecutionPhase.EXECUTING_TESTS,
        TestExecutionPhase.FAILED,
      ],
      [TestExecutionPhase.POST_PROCESSING]: [
        TestExecutionPhase.GENERATING_REPORTS,
        TestExecutionPhase.COMPLETED,
        TestExecutionPhase.FAILED,
      ],
      [TestExecutionPhase.PRE_FETCHING_QASE]: [TestExecutionPhase.EXECUTING_TESTS, TestExecutionPhase.FAILED],
    };

    return transitions[this.currentPhase] || [];
  }

  /**
   * Record a phase in history
   */
  private recordPhase(phase: TestExecutionPhase): void {
    this.phaseHistory.push({ phase, timestamp: new Date() });
  }
}
