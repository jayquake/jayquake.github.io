import GlassSpinner from "./GlassSpinner";
import { useLoading } from "./LoadingContext";

export default function GlobalLoading() {
  const { loading, loadingMessage, loadingType } = useLoading();

  if (!loading) return null;

  if (loadingType === "spinner") {
    return <GlassSpinner fullScreen={true} message={loadingMessage} />;
  }

  return (
    <div
      className="fixed inset-x-0 top-0 z-[1000] h-1 overflow-hidden bg-primary/20"
      role="progressbar"
      aria-label={loadingMessage}
      aria-valuetext={loadingMessage}
    >
      <div className="h-full w-1/3 animate-progress-indeterminate bg-primary" />
    </div>
  );
}
