import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/** Shared table + sidebar rule filter via `?q=` */
export function useLibrarySearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = useMemo(() => searchParams.get("q") || "", [searchParams]);

  const setSearchTerm = useCallback(
    (next) => {
      const value = typeof next === "function" ? next(searchTerm) : next;
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          const trimmed = (value || "").trim();
          if (trimmed) params.set("q", trimmed);
          else params.delete("q");
          return params;
        },
        { replace: true }
      );
    },
    [searchTerm, setSearchParams]
  );

  const clearSearch = useCallback(() => setSearchTerm(""), [setSearchTerm]);

  return { searchTerm, setSearchTerm, clearSearch };
}
