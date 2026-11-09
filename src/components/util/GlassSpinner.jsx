import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

export default function GlassSpinner({
  size = 32,
  message = "Loading...",
  showMessage = true,
  fullScreen = false,
}) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-shell-main"
          : "flex flex-col items-center justify-center gap-3 p-6"
      }
    >
      <Spinner style={{ width: size, height: size }} />
      {showMessage ? (
        <p className="font-mono text-xs tracking-widest text-primary">{message}</p>
      ) : null}
    </div>
  );
}

export function GlassSkeleton({ width = "100%", height = 40, count = 1 }) {
  return (
    <div className="w-full">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className={count > 1 ? "mb-2" : undefined}
          style={{ width, height }}
        />
      ))}
    </div>
  );
}
