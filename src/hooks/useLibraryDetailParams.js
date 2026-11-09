import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/** `detail=open|closed` — description panel on the right (default open on desktop). */
export function useLibraryDetailParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const detailOpen = useMemo(() => {
    const raw = searchParams.get("detail");
    if (raw === "closed") return false;
    if (raw === "open") return true;
    return true;
  }, [searchParams]);

  const setDetailOpen = useCallback(
    (open) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("detail", open ? "open" : "closed");
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const toggleDetail = useCallback(() => {
    setDetailOpen(!detailOpen);
  }, [detailOpen, setDetailOpen]);

  return { detailOpen, setDetailOpen, toggleDetail };
}
