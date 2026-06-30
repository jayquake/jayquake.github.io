import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import engineRulesData from "../../../data/engine-rules-metadata.json";
import legacyEngineMapping from "../../../data/legacy-engine-mapping";
import legacyRulesData from "../../../data/legacy-rules.json";

const EngineLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [impactFilter, setImpactFilter] = useState("all");
  const [wcagLevelFilter, setWcagLevelFilter] = useState("all");
  const [wcagCriteriaFilter, setWcagCriteriaFilter] = useState("all");
  const [legacyRuleFilter, setLegacyRuleFilter] = useState("all");

  const hasLegacyEquivalent = (ruleId) =>
    Object.values(legacyEngineMapping).some((legacyRules) =>
      legacyRules.some((legacyRule) => legacyRule.id === ruleId)
    );

  const getLegacyRulePath = (ruleId) => {
    for (const [legacyShortCode, engineRules] of Object.entries(legacyEngineMapping)) {
      const matchingRule = engineRules.find((engineRule) => engineRule.id === ruleId);
      if (matchingRule) {
        const legacyRule = legacyRulesData.find((rule) => rule.shortCode === legacyShortCode);
        if (legacyRule?.criteria && legacyRule?.route) {
          return `/${legacyRule.criteria}/${legacyRule.route}`;
        }
      }
    }
    return null;
  };

  const wcagLevels = useMemo(() => {
    const levels = new Set();
    engineRulesData.forEach((rule) => {
      (rule.refs?.filter((r) => r.type === "WCAG") || []).forEach((ref) => {
        if (ref.level) levels.add(ref.level.toUpperCase());
      });
    });
    return Array.from(levels).sort();
  }, []);

  const wcagCriteriaIds = useMemo(() => {
    const criteria = new Set();
    engineRulesData.forEach((rule) => {
      (rule.refs?.filter((r) => r.type === "WCAG") || []).forEach((ref) => {
        if (ref.id) criteria.add(ref.id);
      });
    });
    return Array.from(criteria).sort((a, b) => {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0;
        const bVal = bParts[i] || 0;
        if (aVal !== bVal) return aVal - bVal;
      }
      return a.localeCompare(b);
    });
  }, []);

  const filteredRules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return engineRulesData.filter((rule) => {
      const matchesImpact =
        impactFilter === "all" ||
        (rule.impact || "").toLowerCase() === impactFilter.toLowerCase();

      const matchesWcagLevel =
        wcagLevelFilter === "all" ||
        (rule.refs?.filter((r) => r.type === "WCAG") || []).some(
          (ref) => ref.level?.toUpperCase() === wcagLevelFilter.toUpperCase()
        );

      const matchesWcagCriteria =
        wcagCriteriaFilter === "all" ||
        (rule.refs?.filter((r) => r.type === "WCAG") || []).some(
          (ref) => ref.id === wcagCriteriaFilter
        );

      const matchesLegacy =
        legacyRuleFilter === "all" ||
        (legacyRuleFilter === "yes"
          ? hasLegacyEquivalent(rule.id)
          : !hasLegacyEquivalent(rule.id));

      if (!term) {
        return matchesImpact && matchesWcagLevel && matchesWcagCriteria && matchesLegacy;
      }

      const haystack = [rule.id, rule.title, rule.description, rule.advice]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesImpact &&
        matchesWcagLevel &&
        matchesWcagCriteria &&
        matchesLegacy &&
        haystack.includes(term)
      );
    });
  }, [searchTerm, impactFilter, wcagLevelFilter, wcagCriteriaFilter, legacyRuleFilter]);

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 1,
          fontFamily: '"IBM Plex Mono", monospace',
          letterSpacing: "0.14em",
          color: "primary.dark",
        }}
      >
        INTEL // ENGINE RULES
      </Typography>
      <Typography variant="h5" sx={{ mb: 0.5, color: "text.primary" }}>
        Engine Rules Library
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {engineRulesData.length} automated rules · showing {filteredRules.length}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr repeat(4, 1fr)" },
          gap: 1.5,
          mb: 2,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          placeholder="Search ID, title, description…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small">
          <InputLabel>Impact</InputLabel>
          <Select value={impactFilter} label="Impact" onChange={(e) => setImpactFilter(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="serious">Serious</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="minor">Minor</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>WCAG</InputLabel>
          <Select
            value={wcagLevelFilter}
            label="WCAG"
            onChange={(e) => setWcagLevelFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {wcagLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Criteria</InputLabel>
          <Select
            value={wcagCriteriaFilter}
            label="Criteria"
            onChange={(e) => setWcagCriteriaFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {wcagCriteriaIds.map((criteria) => (
              <MenuItem key={criteria} value={criteria}>
                {criteria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Legacy</InputLabel>
          <Select
            value={legacyRuleFilter}
            label="Legacy"
            onChange={(e) => setLegacyRuleFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="yes">Has legacy</MenuItem>
            <MenuItem value="no">No legacy</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredRules.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          No rules match your filters.
        </Typography>
      ) : (
        <Table size="small" sx={{ border: 1, borderColor: "divider" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem", width: 140 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem", width: 88 }}>Impact</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem", width: 120 }}>WCAG</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "0.75rem", width: 56 }} align="right">
                Refs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRules.map((rule) => {
              const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];
              const legacyPath = hasLegacyEquivalent(rule.id) ? getLegacyRulePath(rule.id) : null;

              return (
                <TableRow key={rule.id} hover>
                  <TableCell sx={{ py: 1.25, verticalAlign: "top" }}>
                    <Link
                      component={RouterLink}
                      to={rule.detailUrl}
                      underline="hover"
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "primary.main",
                      }}
                    >
                      {rule.id}
                    </Link>
                    {legacyPath && (
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.25 }}>
                        <Link component={RouterLink} to={legacyPath} underline="hover" color="inherit">
                          legacy
                        </Link>
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ py: 1.25, verticalAlign: "top" }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.8rem", mb: 0.25 }}>
                      {rule.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {rule.description}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.25, verticalAlign: "top" }}>
                    <Chip
                      label={(rule.impact || "unknown").toLowerCase()}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.25, verticalAlign: "top" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {wcagRefs.slice(0, 2).map((ref, idx) => (
                        <Chip
                          key={idx}
                          label={`${ref.id} (${ref.level || "?"})`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.65rem" }}
                        />
                      ))}
                      {wcagRefs.length > 2 && (
                        <Chip
                          label={`+${wcagRefs.length - 2}`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.65rem" }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.25, verticalAlign: "top", color: "text.secondary" }}>
                    <Typography variant="caption" sx={{ fontFamily: "ui-monospace, monospace" }}>
                      {rule.refs?.length || 0}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default EngineLibrary;
