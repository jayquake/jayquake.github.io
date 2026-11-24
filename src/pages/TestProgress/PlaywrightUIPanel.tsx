import { ExternalLink, X } from 'lucide-react';

import { Button } from '../../components/ui/button';

interface PlaywrightUIPanelProps {
  onHide: () => void;
  proxyUrl: string;
  runId: string;
}

export default function PlaywrightUIPanel({ onHide, proxyUrl, runId }: PlaywrightUIPanelProps) {
  const handleOpenInNew = () => {
    fetch(`/api/playwright-ui/${runId}`)
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.open(data.url, '_blank');
        }
      })
      .catch(() => {
        window.open('http://localhost:9323', '_blank');
      });
  };

  return (
    <section className="overflow-hidden border border-border bg-shell-panel shadow-md">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div>
          <h6 className="m-0 text-base font-semibold text-foreground">Playwright UI Mode</h6>
          <span className="text-xs text-foreground-secondary">Interactive test inspector embedded in app</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenInNew} size="sm" variant="outline">
            <ExternalLink aria-hidden="true" className="size-4" />
            Open in New Window
          </Button>
          <Button aria-label="Hide Playwright UI" onClick={onHide} size="icon" title="Hide Playwright UI" variant="ghost">
            <X aria-hidden="true" className="size-5" />
          </Button>
        </div>
      </div>

      <div className="relative h-[700px] bg-shell-main">
        <iframe
          onError={() => {
            console.error('Failed to load Playwright UI in iframe');
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          src={proxyUrl}
          style={{ border: 'none', height: '100%', width: '100%' }}
          title="Playwright UI"
        />
        <div className="absolute right-2 top-2 rounded bg-shell-panel/90 px-2 py-1">
          <button
            className="cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline focus-visible:underline"
            onClick={handleOpenInNew}
            type="button"
          >
            Open Full Screen →
          </button>
        </div>
      </div>

      <span className="block px-4 py-2 text-xs text-foreground-secondary">
        💡 The Playwright UI is embedded via proxy. If it doesn't load, try "Open in New Window"
        above.
      </span>
    </section>
  );
}
