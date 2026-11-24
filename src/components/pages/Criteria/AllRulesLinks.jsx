import React, { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { useLoading } from "../../util/LoadingContext";
import { DataService } from "../../util/dataService";
import GlassSpinner, { GlassSkeleton } from "../../util/GlassSpinner";
import { Progress } from "../../ui/progress";

const UnifiedRulePage = lazy(() => import("../../layout/UnifiedRulePage"));

function AllRulesWithRoutes({ filters }) {
  const { showLoading, hideLoading } = useLoading();
  const [filteredFormRules, setFilteredFormRules] = useState([]);
  const [error, setError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Memoize filters if necessary
  const stableFilters = React.useMemo(() => filters, [filters]);

  useEffect(() => {
    let isMounted = true;
    let progressInterval = 0;
    let finishTimer = 0;

    const fetchData = async () => {
      try {
        setIsInitialLoading(true);
        setLoadingProgress(0);
        showLoading("Loading accessibility rules...", "progress");

        progressInterval = window.setInterval(() => {
          setLoadingProgress((prev) => Math.min(prev + Math.random() * 15, 90));
        }, 200);

        const data = await DataService.getData();
        window.clearInterval(progressInterval);
        setLoadingProgress(95);

        let filteredData = data;
        if (Array.isArray(stableFilters) && stableFilters.length) {
          filteredData = data.filter((rule) =>
            stableFilters.every((filter) => filter(rule))
          );
        }

        if (isMounted) {
          setLoadingProgress(100);
          finishTimer = window.setTimeout(() => {
            setFilteredFormRules(filteredData);
            setIsInitialLoading(false);
            hideLoading();
          }, 300);
        }
      } catch (err) {
        window.clearInterval(progressInterval);
        if (isMounted) {
          setError(err);
          setIsInitialLoading(false);
          hideLoading();
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      window.clearInterval(progressInterval);
      window.clearTimeout(finishTimer);
      hideLoading();
    };
  }, [stableFilters, showLoading, hideLoading]);


  if (error) {
    return (
      <div className="mx-auto mt-8 w-full max-w-[900px] px-4">
        <Alert variant="error" role="alert">
          <h6 className="mb-2 text-base font-semibold">Failed to Load Rules</h6>
          <p className="text-sm">{error.message}</p>
        </Alert>
      </div>
    );
  }

  if (isInitialLoading) {
    return (
      <div className="mx-auto my-8 w-full max-w-[1200px] px-4">
        <div className="border border-border bg-shell-panel p-8 shadow-sm">
          <div className="mb-8 flex flex-col items-center">
            <GlassSpinner size={32} message="Loading rules" showMessage={true} />
            <div className="mt-4 w-full max-w-md">
              <Progress value={loadingProgress} aria-label="Loading rules" />
            </div>
          </div>

          <h6 className="mb-6 text-center text-base font-semibold text-foreground-secondary">
            Preparing Accessibility Rules
          </h6>

          <div className="mb-6">
            <GlassSkeleton height={60} borderRadius={3} />
          </div>
          <div className="mb-4">
            <GlassSkeleton height={40} width="80%" borderRadius={2} />
          </div>
          <div className="mb-4">
            <GlassSkeleton height={40} width="60%" borderRadius={2} />
          </div>
          <div>
            <GlassSkeleton height={40} width="90%" borderRadius={2} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {filteredFormRules.map((formRule) => (
        <Route
          key={`${formRule.id}-${formRule.criteria}-${formRule.route}`}
          path={`${formRule.criteria}/${formRule.route}`}
          element={
            <React.Suspense fallback={null}>
              <UnifiedRulePage ruleData={formRule} ruleType="legacy" />
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
}

export default AllRulesWithRoutes;