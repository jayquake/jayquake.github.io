import { ChevronRight, History, Home, Send } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../../shared/types';

import ProjectBreadcrumbItem from '../../components/standalone/ProjectBreadcrumbItem';
import { Button, buttonClass } from '../../components/ui/button';
import { Chip, type ChipTone } from '../../components/ui/chip';
import { routeClick } from '../../lib/routeClick';

interface ResultsAppBarProps {
  onNavigateBack: () => void;
  onNavigateToHistory: () => void;
  onNavigateToLibrary?: () => void;
  onProjectChange: (projectId: string) => void;
  onShareToSlack?: () => void;
  projectId?: string;
  projectName?: string;
  projects?: Project[];
  runId: string;
  runStatus: string;
  sendingToSlack?: boolean;
  showSlack?: boolean;
}

const STATUS_TONE: Record<string, ChipTone> = {
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

export default function ResultsAppBar({
  onNavigateBack,
  onNavigateToHistory,
  onNavigateToLibrary,
  onProjectChange,
  onShareToSlack,
  projectId,
  projectName,
  projects = [],
  runId,
  runStatus,
  sendingToSlack = false,
  showSlack = false,
}: ResultsAppBarProps) {
  const shortId = runId.substring(0, 8);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-shell-elevated text-foreground-secondary shadow-sm">
      <div className="flex min-h-12 flex-wrap items-center gap-2 px-4 py-1">
        <nav aria-label="breadcrumb" className="min-w-0 flex-grow">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
            <li className="flex items-center">
              <Link className={crumbLinkClass} onClick={routeClick(onNavigateBack)} to="/test-runner">
                <Home aria-hidden="true" className="size-4" />
                Projects
              </Link>
            </li>
            {projectId && projectName && (
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
            {projectId && onNavigateToLibrary && (
              <>
                <Separator />
                <li className="flex items-center">
                  <Link
                    className={crumbLinkClass}
                    onClick={routeClick(onNavigateToLibrary)}
                    to={`/test-runner/library?project=${projectId}`}
                  >
                    Test Configuration
                  </Link>
                </li>
              </>
            )}
            <Separator />
            <li aria-current="page" className="flex items-center text-sm font-semibold text-foreground">
              Results &middot; {shortId}
            </li>
          </ol>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {runStatus && <Chip tone={STATUS_TONE[runStatus] ?? 'default'}>{runStatus.toUpperCase()}</Chip>}

          {showSlack && onShareToSlack && (
            <Button disabled={sendingToSlack} onClick={onShareToSlack} size="sm" variant="outline">
              <Send aria-hidden="true" className="size-4" />
              {sendingToSlack ? 'Sending…' : 'Share to Slack'}
            </Button>
          )}

          <Link
            className={buttonClass({ size: 'sm', variant: 'outline', className: 'no-underline' })}
            onClick={routeClick(onNavigateToHistory)}
            to="/test-runner/history"
          >
            <History aria-hidden="true" className="size-4" />
            History
          </Link>
        </div>
      </div>
    </header>
  );
}
