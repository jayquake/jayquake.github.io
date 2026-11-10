import React, { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container, Typography, Alert } from "@mui/material";
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


  // Error state with glass styling
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert 
          severity="error"
          sx={{
            background: 'rgba(244, 67, 54, 0.1)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(244, 67, 54, 0.15)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Failed to Load Rules
          </Typography>
          <Typography variant="body2">
            {error.message}
          </Typography>
        </Alert>
      </Container>
    );
  }

  // Loading state with glass components
  if (isInitialLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
            p: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <GlassSpinner
              size={32}
              message="Loading rules"
              showMessage={true}
            />
            <div className="mt-4 w-full max-w-md">
              <Progress value={loadingProgress} aria-label="Loading rules" />
            </div>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              mb: 3,
              color: 'rgba(30, 41, 59, 0.8)',
              fontWeight: 600
            }}
          >
            Preparing Accessibility Rules
          </Typography>
          
          {/* Glass skeleton placeholders */}
          <Box sx={{ mb: 3 }}>
            <GlassSkeleton height={60} borderRadius={3} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <GlassSkeleton height={40} width="80%" borderRadius={2} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <GlassSkeleton height={40} width="60%" borderRadius={2} />
          </Box>
          <Box>
            <GlassSkeleton height={40} width="90%" borderRadius={2} />
          </Box>
        </Box>
      </Container>
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