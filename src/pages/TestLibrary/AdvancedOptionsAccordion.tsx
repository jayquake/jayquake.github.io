import { SlidersHorizontal } from 'lucide-react';
import { useId } from 'react';

import type { QaseConfig } from '../../../shared/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { cn } from '../../lib/utils';

interface AdvancedOptionsAccordionProps {
  httpAuthPassword: string;
  httpAuthUsername: string;
  onHttpAuthPasswordChange: (v: string) => void;
  onHttpAuthUsernameChange: (v: string) => void;
  onQaseConfigChange: (config: QaseConfig) => void;
  onQaseEnabledChange: (enabled: boolean) => void;
  qaseConfig: QaseConfig;
  qaseEnabled: boolean;
  showHttpAuth: boolean;
}

/** Bordered text input used for the labelled fields below. */
const fieldInputClass = cn(
  'h-9 w-full min-w-0 border border-border bg-shell-input px-2.5 font-mono text-xs text-foreground outline-none',
  'placeholder:text-foreground-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15'
);

export default function AdvancedOptionsAccordion({
  httpAuthPassword,
  httpAuthUsername,
  onHttpAuthPasswordChange,
  onHttpAuthUsernameChange,
  onQaseConfigChange,
  onQaseEnabledChange,
  qaseConfig,
  qaseEnabled,
  showHttpAuth,
}: AdvancedOptionsAccordionProps) {
  const uid = useId();
  const ids = {
    qaseSwitch: `${uid}-qase-enabled`,
    apiToken: `${uid}-qase-token`,
    projectCode: `${uid}-qase-project`,
    environment: `${uid}-qase-env`,
    username: `${uid}-auth-username`,
    password: `${uid}-auth-password`,
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="advanced">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-foreground-secondary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">Advanced Options</span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 py-1">
            {/* Qase section */}
            <div>
              <div className="flex items-center gap-2">
                <Switch
                  id={ids.qaseSwitch}
                  checked={qaseEnabled}
                  onCheckedChange={(checked) => onQaseEnabledChange(checked)}
                />
                <Label htmlFor={ids.qaseSwitch} className="cursor-pointer text-sm normal-case tracking-normal text-foreground">
                  Report to Qase
                </Label>
              </div>

              {qaseEnabled && (
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={ids.apiToken}>Qase API Token</Label>
                    <input
                      id={ids.apiToken}
                      type="password"
                      className={fieldInputClass}
                      value={qaseConfig.apiToken}
                      onChange={(e) =>
                        onQaseConfigChange({ ...qaseConfig, apiToken: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                      <Label htmlFor={ids.projectCode}>Project Code</Label>
                      <input
                        id={ids.projectCode}
                        className={fieldInputClass}
                        value={qaseConfig.projectCode}
                        onChange={(e) =>
                          onQaseConfigChange({ ...qaseConfig, projectCode: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Label htmlFor={ids.environment}>Environment</Label>
                      <input
                        id={ids.environment}
                        className={fieldInputClass}
                        value={qaseConfig.environment || ''}
                        onChange={(e) =>
                          onQaseConfigChange({ ...qaseConfig, environment: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* HTTP auth override (shown when not auto-detected) */}
            {showHttpAuth && (
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="mb-1 p-0 text-[0.75rem] text-foreground-secondary">
                  HTTP Basic Auth Override
                </legend>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <Label htmlFor={ids.username}>Username</Label>
                    <input
                      id={ids.username}
                      className={fieldInputClass}
                      value={httpAuthUsername}
                      onChange={(e) => onHttpAuthUsernameChange(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <Label htmlFor={ids.password}>Password</Label>
                    <input
                      id={ids.password}
                      type="password"
                      className={fieldInputClass}
                      value={httpAuthPassword}
                      onChange={(e) => onHttpAuthPasswordChange(e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
