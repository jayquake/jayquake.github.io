import { ChevronDown, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../components/ui/button';
import { Chip } from '../../components/ui/chip';
import { Spinner } from '../../components/ui/spinner';
import type { TestCaseInfo, TestFileInfo } from './types';

function stripQasePrefix(title: string): string {
  return title.replace(/^Qase\s+\d+\s*[:\-–]\s*/i, '').trim();
}

interface RunQueueProps {
  isSubmitting: boolean;
  onRun: () => void;
  selectedTestCases: Map<string, Set<string>>;
  selectedTests: Set<string>;
  testCasesCache: Map<string, TestCaseInfo[]>;
  testFiles: TestFileInfo[];
  validUrl: boolean;
}

export default function RunQueue({
  isSubmitting,
  onRun,
  selectedTestCases,
  selectedTests,
  testCasesCache,
  testFiles,
  validUrl,
}: RunQueueProps) {
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());

  // Include files selected whole-file OR files with individually-selected cases
  const selectedFiles = testFiles.filter(f =>
    selectedTests.has(f.relativePath) ||
    ((selectedTestCases.get(f.relativePath)?.size ?? 0) > 0)
  );
  const totalCaseCount = Array.from(selectedTestCases.values()).reduce((s, v) => s + v.size, 0);
  // Don't double-count files that have individual case selections — count those by case
  const pureFileCount = selectedFiles.filter(
    f => selectedTests.has(f.relativePath) && !(selectedTestCases.get(f.relativePath)?.size)
  ).length;
  const totalSelected = pureFileCount + totalCaseCount;
  const canRun = totalSelected > 0 && validUrl && !isSubmitting;

  const toggleFile = (path: string) => {
    setExpandedFiles(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  return (
    <section className="flex flex-col border border-border bg-shell-panel">
      <div className="px-4 pb-2 pt-4">
        <h6 className="m-0 text-base font-semibold text-foreground">
          Run Queue
          {selectedFiles.length > 0 && (
            <span className="ml-2 text-sm font-normal text-foreground-secondary">
              ({selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''})
            </span>
          )}
        </h6>
      </div>

      <div className="h-px bg-border" />

      {selectedFiles.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="m-0 text-sm text-foreground-secondary">
            No tests selected — choose from the tree
          </p>
        </div>
      ) : (
        <ul className="m-0 max-h-60 list-none overflow-auto p-0">
          {selectedFiles.map((file) => {
            const cases = testCasesCache.get(file.relativePath) || [];
            const selectedCases = selectedTestCases.get(file.relativePath);
            const isExpanded = expandedFiles.has(file.relativePath);
            const activeCases = selectedCases
              ? cases.filter((c: TestCaseInfo) => selectedCases.has(c.title))
              : cases;
            const casesId = `run-queue-cases-${file.relativePath}`;

            return (
              <li key={file.relativePath} className="border-b border-border">
                <div className="flex items-center gap-2 px-4 py-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1 py-1">
                      <span className="font-mono text-xs text-foreground">
                        {file.name}
                      </span>
                      {file.qaseId && (
                        <Chip tone="info">{`Q-${file.qaseId}`}</Chip>
                      )}
                      <Chip>
                        {`${activeCases.length} case${activeCases.length !== 1 ? 's' : ''}`}
                      </Chip>
                    </div>
                    <span className="block font-mono text-[0.75rem] text-foreground-secondary">
                      {file.relativePath.replace(file.name, '').replace(/\/$/, '')}
                    </span>
                  </div>
                  {activeCases.length > 0 ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFile(file.relativePath)}
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? casesId : undefined}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} cases for ${file.name}`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="size-4" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  ) : null}
                </div>

                {isExpanded && (
                  <div id={casesId} className="flex flex-row flex-wrap gap-1 px-6 pb-2">
                    {activeCases.map((tc: TestCaseInfo) => (
                      <Chip
                        key={tc.title}
                        tone={tc.qaseId ? 'info' : 'default'}
                        title={stripQasePrefix(tc.title)}
                      >
                        {tc.qaseId ? `Q-${tc.qaseId}: ${stripQasePrefix(tc.title).slice(0, 40)}` : stripQasePrefix(tc.title).slice(0, 40)}
                      </Chip>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="p-4">
        <Button
          variant="default"
          disabled={!canRun}
          onClick={onRun}
          className="h-11 w-full text-sm font-bold"
        >
          {isSubmitting ? (
            <Spinner className="size-4 text-current" aria-hidden="true" role={undefined} aria-label={undefined} />
          ) : (
            <Play className="size-4" aria-hidden="true" />
          )}
          {isSubmitting
            ? 'Starting…'
            : totalSelected > 0
            ? `Run ${totalSelected} Test${totalSelected !== 1 ? 's' : ''}`
            : 'Run Tests'}
        </Button>
      </div>
    </section>
  );
}
