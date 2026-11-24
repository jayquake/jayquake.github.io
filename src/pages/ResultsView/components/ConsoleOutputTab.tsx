import { Copy, File as FileIcon } from 'lucide-react';

import { AnsiConsole } from '../../../components/standalone/AnsiConsole';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { type ConsoleOutput } from '../models/ConsoleOutput';

type ConsoleOutputTabProps = {
  output: ConsoleOutput;
};

export const ConsoleOutputTab = ({ output }: ConsoleOutputTabProps) => {
  const outputText = output.getCombinedOutput();
  const errorLines = output.getErrorLines();
  const hasErrors = errorLines.length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  if (!output.hasOutput()) {
    return (
      <div className="border border-border bg-shell-panel p-12 text-center text-foreground">
        <FileIcon aria-hidden="true" className="mx-auto mb-4 block size-12 text-foreground-muted" />
        <h6 className="mb-2 mt-0 text-lg font-medium">No Console Output</h6>
        <p className="mb-4 mt-0 text-sm text-foreground-secondary">
          No output available for this test run. Output may not have been captured.
        </p>
        <div className="mt-6 bg-shell-main p-4 text-left">
          <span className="mb-1 block text-xs font-semibold">Tips:</span>
          <ul className="m-0 flex list-disc flex-col gap-1 pl-4">
            {[
              'Check if the test execution completed successfully',
              'Verify that stdout/stderr capture is enabled',
              'Review test execution logs for more details',
            ].map(tip => (
              <li className="text-xs" key={tip}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border bg-shell-panel text-foreground">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
        <h6 className="m-0 text-base font-semibold">Console Output</h6>
        <div className="flex flex-row items-center gap-2">
          {hasErrors && <Chip tone="fail">Contains Errors</Chip>}
          {output.stdout && <Chip tone="info">Stdout Available</Chip>}
          <span className="text-xs text-foreground-secondary">
            {output.getCharacterCount()} chars, {output.getLineCount()} lines
          </span>
          <Button onClick={handleCopy} size="sm" variant="outline">
            <Copy aria-hidden="true" className="size-4" />
            Copy
          </Button>
        </div>
      </div>

      {/* Console stays dark in both themes, as before. */}
      <div className="max-h-[60vh] overflow-y-auto bg-shell-main" data-theme="dark">
        <AnsiConsole output={outputText} />
      </div>

      {hasErrors && (
        <Alert className="m-2" variant="error">
          {errorLines.length} error line{errorLines.length !== 1 ? 's' : ''} detected
        </Alert>
      )}
    </div>
  );
};
