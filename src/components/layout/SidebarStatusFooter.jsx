import packageJson from "../../../package.json";
import { useMissionClock } from "../../hooks/useMissionClock";
import { HudPulse } from "../motion/HudMotion";
import { MGS } from "../../theme/mgsTokens";

export default function SidebarStatusFooter({ isOpen }) {
  const missionTime = useMissionClock();
  const version = packageJson.version || "0.0.0";
  const buildId = version.replace(/\./g, "").slice(0, 6).toUpperCase() || "DEV";

  if (!isOpen) {
    return (
      <div className="flex justify-center py-2">
        <HudPulse
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: MGS.passGreen,
            boxShadow: `0 0 6px ${MGS.passGreen}`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="shrink-0 border-t border-border px-4 py-3">
      <div className="mb-2 flex items-center gap-1.5">
        <HudPulse
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: MGS.passGreen,
            boxShadow: "0 0 8px rgba(110, 231, 183, 0.6)",
            flexShrink: 0,
          }}
        />
        <p className="font-['Rajdhani',sans-serif] text-[0.78rem] font-bold tracking-[0.12em] text-foreground-accent">
          OPERATIONAL
        </p>
      </div>

      <div className="relative mb-2 flex h-12 items-center justify-center border border-primary before:absolute before:left-0.5 before:top-0.5 before:size-2 before:border-l before:border-t before:border-primary after:absolute after:bottom-0.5 after:right-0.5 after:size-2 after:border-b after:border-r after:border-primary">
        <svg viewBox="0 0 40 40" className="size-7 opacity-70" aria-hidden>
          <polygon points="20,4 32,32 8,32" fill="none" stroke={MGS.raidenCyan} strokeWidth="1" />
          <line x1="20" y1="12" x2="20" y2="24" stroke={MGS.raidenCyan} strokeWidth="1" />
          <circle cx="20" cy="28" r="2" fill={MGS.raidenCyan} />
        </svg>
      </div>

      <p className="mb-1 font-mono text-[0.75rem] tracking-wider text-foreground-secondary">
        v{version} build {buildId}
      </p>
      <p className="font-mono text-[0.75rem] tracking-[0.1em] text-primary">MISSION {missionTime}</p>
    </div>
  );
}
