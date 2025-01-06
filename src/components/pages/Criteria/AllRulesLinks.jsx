import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSearch } from "../../util/SearchContext"; // Adjust path as needed
import ItemPage from "../../layout/rulePage";
import { useLoading } from "../../util/LoadingContext";

function AllRulesWithRoutes({ filters }) {
  const { query } = useSearch();
  const { showLoading, hideLoading } = useLoading();
  const [filteredFormRules, setFilteredFormRules] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  // Memoize filters if necessary
  const stableFilters = React.useMemo(() => filters, [filters]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        showLoading(); // Show loading indicator
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // If filters exist, apply them
        let filteredData = data;
        if (Array.isArray(stableFilters) && stableFilters.length) {
          filteredData = data.filter((rule) =>
            stableFilters.every((filter) => filter(rule))
          );
        }

        if (isMounted) {
          setFilteredFormRules(filteredData);
          setSearchResults(filteredData); // Initialize with all rules
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) hideLoading(); // Hide loading indicator
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [stableFilters, showLoading, hideLoading]);

  useEffect(() => {
    if (!query) {
      setSearchResults(filteredFormRules);
      return;
    }

    const results = filteredFormRules.filter((rule) =>
      rule.name.toLowerCase().includes(query.toLowerCase()) ||
      rule.criteria.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, [query, filteredFormRules]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Routes>
      {searchResults.map((formRule) => (
        <Route
          key={`${formRule.id}-${formRule.criteria}-${formRule.route}`}
          path={`${formRule.criteria}/${formRule.route}`}
          element={<ItemPage ruleData={formRule} />}
        />
      ))}
    </Routes>
  );
}

export default AllRulesWithRoutes;