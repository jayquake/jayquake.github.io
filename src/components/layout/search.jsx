import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import engineRulesData from "../../data/engine-rules-metadata.json";
import { getAllCachedResults } from "../../utils/analysisCache";

const StyledSearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  padding: theme.spacing(0.5, 2),
  gap: theme.spacing(1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const StyledDropdown = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

function AuditBadge({ ruleId }) {
  const status = useMemo(() => {
    const cached = getAllCachedResults();
    const results = cached.get(ruleId);
    if (!results || results.length === 0) return null;
    let hasCritical = false;
    let hasIssues = false;
    for (const r of results) {
      if (r.audit) {
        if (r.audit.summary.critical > 0 || r.audit.summary.serious > 0) hasCritical = true;
        if (r.audit.summary.moderate > 0 || r.audit.summary.minor > 0) hasIssues = true;
      }
    }
    if (hasCritical) return "error";
    if (hasIssues) return "warning";
    return "pass";
  }, [ruleId]);

  if (!status) return null;

  if (status === "pass") {
    return (
      <Tooltip title="No critical/serious issues">
        <CheckCircleIcon sx={{ fontSize: 16, color: "#4caf50", flexShrink: 0 }} />
      </Tooltip>
    );
  }

  return (
    <Tooltip title={status === "error" ? "Has critical/serious issues" : "Has moderate/minor issues"}>
      <WarningIcon sx={{ fontSize: 16, color: status === "error" ? "#f44336" : "#ff9800", flexShrink: 0 }} />
    </Tooltip>
  );
}

const SearchComponent = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Combine legacy rules and engine rules
  const combinedData = useMemo(() => {
    const legacyRules = (data || []).map((item) => ({
      ...item,
      type: "legacy",
      searchName: item.name,
      route: `/${item.criteria}/${item.route}`,
    }));

    const engineRules = engineRulesData.map((rule) => ({
      ...rule,
      type: "engine",
      searchName: rule.id,
      route: rule.detailUrl,
      name: rule.title,
    }));

    return [...legacyRules, ...engineRules];
  }, [data]);

  const filteredData = combinedData.filter(
    (item) =>
      item.searchName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <StyledSearchBar>
        <SearchIcon color="action" />
        <StyledInputBase
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(searchQuery.length > 0)}
          inputProps={{
            "aria-label": "Search for rules and criteria",
          }}
        />
        {searchQuery && (
          <IconButton onClick={handleClearSearch} size="small">
            <ClearIcon />
          </IconButton>
        )}
      </StyledSearchBar>

      <AnimatePresence>
        {showDropdown && (
          <StyledDropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <List>
              {filteredData.length > 0 ? (
                filteredData.slice(0, 10).map((item, index) => (
                  <ListItem
                    key={
                      item.type === "legacy"
                        ? item._id.$oid
                        : `engine-${item.id}-${index}`
                    }
                    component={Link}
                    to={item.route}
                    button
                    sx={{
                      borderLeft:
                        item.type === "engine"
                          ? "4px solid #673ab7"
                          : "4px solid #2196f3",
                      "&:hover": {
                        backgroundColor:
                          item.type === "engine"
                            ? "rgba(103, 58, 183, 0.08)"
                            : "rgba(33, 150, 243, 0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      {item.type === "engine" ? (
                        <ScienceIcon sx={{ color: "#673ab7", fontSize: 20 }} />
                      ) : (
                        <AssignmentIcon
                          sx={{ color: "#2196f3", fontSize: 20 }}
                        />
                      )}
                    </Box>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body1">
                            {item.searchName}
                          </Typography>
                          <Chip
                            label={item.type === "engine" ? "Engine" : "Legacy"}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              backgroundColor:
                                item.type === "engine" ? "#673ab7" : "#2196f3",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                          <Box sx={{ flex: 1 }} />
                          <AuditBadge ruleId={item.id || item.route} />
                        </Box>
                      }
                      secondary={
                        <>
                          {item.type === "legacy" ? (
                            <>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Severity:</strong> {item.severity}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Criteria:</strong> {item.criteria}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Impact:</strong> {item.impact}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                noWrap
                              >
                                {item.description?.substring(0, 80)}...
                              </Typography>
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                // Fallback Message for No Results
                <ListItem>
                  <ListItemText
                    primary="No results found"
                    primaryTypographyProps={{
                      align: "center",
                      color: "textSecondary",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              )}
              {filteredData.length > 10 && (
                <ListItem>
                  <ListItemText
                    primary={`Showing 10 of ${filteredData.length} results. Refine your search for more specific results.`}
                    primaryTypographyProps={{
                      align: "center",
                      color: "textSecondary",
                      variant: "caption",
                    }}
                  />
                </ListItem>
              )}
            </List>
          </StyledDropdown>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchComponent;
