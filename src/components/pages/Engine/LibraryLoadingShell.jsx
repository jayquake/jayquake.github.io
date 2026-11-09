import { mgsFonts } from "../../../theme/mgsTokens";
import { Spinner } from "../../ui/spinner";

/** Shown while engine catalog or route chunk is loading — avoids blank main pane. */
export default function LibraryLoadingShell({ label = "Loading rules…" }) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-shell-main">
      <Spinner className="size-7" />
      <p
        className="text-xs uppercase tracking-widest text-foreground-secondary"
        style={{ fontFamily: mgsFonts.hud }}
      >
        {label}
      </p>
    </div>
  );
}
