import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PAGE_SHELL } from "../../theme/layout";
import { loadEngineExample } from "../../utils/engineExampleUtils";

function ExampleLoaderSkeleton() {
  return (
    <Box sx={{ ...PAGE_SHELL, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Skeleton variant="text" width="35%" height={28} />
      <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 0 }} />
      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 0 }} />
      <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 0 }} />
    </Box>
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
