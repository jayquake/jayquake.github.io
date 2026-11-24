import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { useId } from 'react';

import { Label } from '../../components/ui/label';
import { cn } from '../../lib/utils';

interface TargetEnvironmentCardProps {
  baseUrl: string;
  httpAuthEnabled: boolean;
  httpAuthPassword: string;
  httpAuthUsername: string;
  isUrlValid: boolean;
  onBaseUrlChange: (url: string) => void;
  onHttpAuthPasswordChange: (v: string) => void;
  onHttpAuthUsernameChange: (v: string) => void;
}

const fieldInputClass = cn(
  'h-9 w-full min-w-0 border border-border bg-shell-input px-2.5 font-mono text-xs text-foreground outline-none',
  'placeholder:text-foreground-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15'
);

export default function TargetEnvironmentCard({
  baseUrl,
  httpAuthEnabled,
  httpAuthPassword,
  httpAuthUsername,
  isUrlValid,
  onBaseUrlChange,
  onHttpAuthPasswordChange,
  onHttpAuthUsernameChange,
}: TargetEnvironmentCardProps) {
  const hasUrl = baseUrl.trim().length > 0;
  const showError = hasUrl && !isUrlValid;
  const uid = useId();
  const urlId = `${uid}-base-url`;
  const urlHelpId = `${uid}-base-url-help`;
  const usernameId = `${uid}-auth-username`;
  const passwordId = `${uid}-auth-password`;

  return (
    <section className="border border-border bg-shell-panel p-4">
      <h6 className="m-0 mb-2 text-base font-semibold text-foreground">
        Target Environment
      </h6>

      {/* URL input */}
      <div className="mb-3 flex flex-col gap-1">
        <Label htmlFor={urlId} className={cn(showError && 'text-status-fail')}>
          Base URL
        </Label>
        <div className="relative flex items-center">
          <input
            id={urlId}
            className={cn(fieldInputClass, hasUrl && 'pr-8', showError && 'border-status-fail')}
            placeholder="https://example.com"
            value={baseUrl}
            onChange={(e) => onBaseUrlChange(e.target.value)}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? urlHelpId : undefined}
          />
          {hasUrl ? (
            <span className="pointer-events-none absolute right-2 flex items-center">
              {isUrlValid ? (
                <CheckCircle2 className="size-4 text-status-pass" aria-hidden="true" />
              ) : (
                <AlertCircle className="size-4 text-status-fail" aria-hidden="true" />
              )}
            </span>
          ) : null}
        </div>
        {showError ? (
          <p id={urlHelpId} className="m-0 text-[0.75rem] text-status-fail">
            Enter a valid URL (e.g., https://example.com)
          </p>
        ) : null}
      </div>

      {/* HTTP auth (auto-reveal for acsb-test.com) */}
      {httpAuthEnabled && (
        <div>
          <div className="mb-2 flex items-center gap-1">
            <Lock className="size-4 text-status-warn" aria-hidden="true" />
            <span className="text-[0.75rem] font-medium text-status-warn">
              HTTP Basic Auth required
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-1 flex-col gap-1">
              <Label htmlFor={usernameId}>Username</Label>
              <input
                id={usernameId}
                className={fieldInputClass}
                value={httpAuthUsername}
                onChange={(e) => onHttpAuthUsernameChange(e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label htmlFor={passwordId}>Password</Label>
              <input
                id={passwordId}
                type="password"
                className={fieldInputClass}
                value={httpAuthPassword}
                onChange={(e) => onHttpAuthPasswordChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
