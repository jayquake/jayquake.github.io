import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { loadEngineExample } from "../../utils/engineExampleUtils";

/** Tailwind equivalent of PAGE_SHELL (theme/layout) for the example page scroll region. */
const PAGE_SHELL_CLASS =
  "box-border flex h-full min-h-0 w-full max-w-full flex-col items-stretch gap-3 overflow-y-auto overflow-x-hidden px-4 py-4 text-left sm:px-5 sm:py-5 md:px-6";

function ExampleLoaderSkeleton() {
  return (
    <div className={PAGE_SHELL_CLASS}>
      <Skeleton className="h-7 w-[35%] rounded-none" />
      <Skeleton className="h-12 rounded-none" />
      <Skeleton className="h-[120px] rounded-none" />
      <Skeleton className="h-[240px] rounded-none" />
    </div>
  );
}

export default function EngineExampleLoader({ ruleId, variant }) {
  const [Page, setPage] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPage(null);
    setFailed(false);

    loadEngineExample(ruleId, variant)
      .then((mod) => {
        if (!cancelled) setPage(() => mod.default);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [ruleId, variant]);

  if (failed) {
    return <Navigate to={`/engine/${ruleId}`} replace />;
  }

  if (!Page) {
    return <ExampleLoaderSkeleton />;
  }

  return <Page />;
}
