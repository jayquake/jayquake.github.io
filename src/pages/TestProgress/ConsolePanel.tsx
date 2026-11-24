import { ChevronDown, ChevronUp } from 'lucide-react';

import { AnsiConsole } from '../../components/standalone';
import { Alert } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import type { RunStatus } from './types';

interface ConsolePanelProps {
  consoleExpanded: boolean;
  consoleOutput: string;
  onToggleExpanded: () => void;
  runStatus: RunStatus;
}

export default function ConsolePanel({
  consoleExpanded,
  consoleOutput,
  onToggleExpanded,
  runStatus,
}: ConsolePanelProps) {
  const toggleLabel = consoleExpanded ? 'Collapse' : 'Expand';

  return (
    <section className="overflow-hidden border border-border bg-shell-panel shadow-sm">
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2',
          consoleExpanded && 'border-b border-border'
        )}
      >
        <h6 className="m-0 text-base font-semibold text-foreground">Console Output</h6>
        <Button
          aria-expanded={consoleExpanded}
          aria-label={toggleLabel}
          onClick={onToggleExpanded}
          size="icon"
          title={toggleLabel}
          variant="ghost"
        >
          {consoleExpanded ? (
            <ChevronUp aria-hidden="true" className="size-5" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-5" />
          )}
        </Button>
      </div>

      {consoleExpanded && (
        <div>
          {/* Terminal surface: stays dark in both themes. */}
          <div className="max-h-[40vh] overflow-y-auto bg-[#1e1e1e]">
            {consoleOutput ? (
              <AnsiConsole output={consoleOutput} />
            ) : (
              <p className="m-0 p-4 font-mono text-sm text-[#e0e0e0]/60">No output yet…</p>
            )}
          </div>

          {runStatus === 'failed' && (
            <Alert className="m-2" variant="warning">
              Test run failed. Review the console output above for error details.
            </Alert>
          )}
        </div>
      )}
    </section>
  );
}
