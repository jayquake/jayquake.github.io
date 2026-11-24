import { CheckCircle2, ChevronRight, Eye, EyeOff, Home, RotateCcw, Table2, Wifi, WifiOff, XCircle } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';

import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';
import { Button, buttonClass } from '../../components/ui/button';
import { Chip, type ChipTone } from '../../components/ui/chip';
import type { RunStatus } from './types';
import { routeClick } from '../../lib/routeClick';

interface ProgressAppBarProps {
  connected: boolean;
  onCancel: () => void;
  onNavigateBack: () => void;
  onProjectChange: (projectId: string) => void;
  onRetry: () => void;
  onTogglePlaywrightUI?: () => void;
  onViewResults: () => void;
  projectId: string;
  projectName: string;
  projects: Project[];
  runId: string;
  runStatus: RunStatus;
  showPlaywrightUIToggle?: boolean;
  showUIViewer?: boolean;
}

const STATUS_CHIP_TONE: Record<RunStatus, ChipTone> = {
  cancelled: 'warn',
  completed: 'pass',
  failed: 'fail',
  running: 'info',
};

/**
 * Real links keep their href (middle-click, copy link, open in new tab) while a
 * plain left click still runs the caller's navigation handler.
 */
const crumbLinkClass =
  'inline-flex items-center gap-1 text-sm text-inherit no-underline hover:underline focus-visible:underline';

function Separator() {
  return (
    <li aria-hidden="true" className="flex items-center text-foreground-muted">
      <ChevronRight className="size-4" />
    </li>
  );
}

export default function ProgressAppBar({
  connected,
  onCancel,
  onNavigateBack,
  onProjectChange,
  onRetry,
  onTogglePlaywrightUI,
  onViewResults,
  projectId,
  projectName,
  projects,
  runId,
  runStatus,
  showPlaywrightUIToggle = false,
  showUIViewer = false,
}: ProgressAppBarProps) {
  const shortRunId = runId.substring(0, 8);
  // Mirrors the page's onNavigateBack target so the links carry a real href.
  const backHref = projectId ? `/test-runner/library?project=${projectId}` : '/test-runner';
  const toggleLabel = showUIViewer ? 'Hide Playwright UI' : 'Show Playwright UI';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-shell-elevated text-foreground-secondary shadow-sm">
      <div className="flex min-h-12 flex-wrap items-center gap-2 px-4 py-1">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="min-w-0 flex-grow">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            <li className="flex items-center">
              <Link className={crumbLinkClass} onClick={routeClick(onNavigateBack)} to={backHref}>
                <Home aria-hidden="true" className="size-4" />
                Projects
              </Link>
            </li>
            {projectName && (
              <>
                <Separator />
                <li className="flex items-center">
                  <ProjectBreadcrumbItem
                    projectId={projectId}
                    projectName={projectName}
                    projects={projects}
                    onProjectChange={onProjectChange}
                  />
                </li>
              </>
            )}
            {projectId && (
              <>
                <Separator />
                <li className="flex items-center">
                  <Link className={crumbLinkClass} onClick={routeClick(onNavigateBack)} to={backHref}>
                    Test Configuration
                  </Link>
                </li>
              </>
            )}
            <Separator />
            <li className="flex items-center text-sm font-semibold text-foreground">
              Execution &middot; {shortRunId}
            </li>
          </ol>
        </nav>

        {/* Status chips */}
        <div className="flex shrink-0 items-center gap-2">
          <Chip
            className="bg-transparent"
            icon={connected ? <Wifi aria-hidden="true" className="size-3.5" /> : <WifiOff aria-hidden="true" className="size-3.5" />}
            tone={connected ? 'pass' : 'fail'}
          >
            {connected ? 'Connected' : 'Disconnected'}
          </Chip>
          <Chip
            icon={
              runStatus === 'completed' ? (
                <CheckCircle2 aria-hidden="true" className="size-3.5" />
              ) : runStatus === 'failed' || runStatus === 'cancelled' ? (
                <XCircle aria-hidden="true" className="size-3.5" />
              ) : undefined
            }
            tone={STATUS_CHIP_TONE[runStatus]}
          >
            {runStatus.toUpperCase()}
          </Chip>
        </div>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {runStatus === 'running' && (
            <Button
              className="border-status-fail bg-status-fail/15 text-status-fail hover:bg-status-fail/25 hover:text-status-fail"
              onClick={onCancel}
              size="sm"
              variant="default"
            >
              <XCircle aria-hidden="true" className="size-4" />
              Cancel
            </Button>
          )}

          {(runStatus === 'completed' || runStatus === 'failed') && (
            <>
              <Link
                className={buttonClass({ size: 'sm', variant: 'default', className: 'no-underline' })}
                onClick={routeClick(onViewResults)}
                to={`/test-runner/results/${runId}`}
              >
                <Table2 aria-hidden="true" className="size-4" />
                View Results
              </Link>
              <Button onClick={onRetry} size="sm" variant="outline">
                <RotateCcw aria-hidden="true" className="size-4" />
                Retry
              </Button>
            </>
          )}

          {showPlaywrightUIToggle && (
            <Button aria-label={toggleLabel} onClick={onTogglePlaywrightUI} size="icon" title={toggleLabel} variant="ghost">
              {showUIViewer ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
