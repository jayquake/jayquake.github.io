import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { loadEngineExample } from "../../utils/engineExampleUtils";

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
    return null;
  }

  return <Page />;
}
