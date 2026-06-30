import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useCallback } from "react";
import { prefetchEngineExample } from "../../../utils/engineExampleUtils";
import { mgsFonts } from "../../../theme/mgsTokens";
import {
  getRuleSlug,
  impactToSeverityLabel,
  LIBRARY_CATEGORIES,
  RULE_CATEGORY_BY_ID,
} from "./engineLibraryUtils";

const hudLabelSx = {
  fontFamily: mgsFonts.hud,
  fontSize: "0.65rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "primary.main",
};

const filterSelectSx = {
  bgcolor: "background.paper",
  fontFamily: mgsFonts.hud,
  fontSize: "0.72rem",
  letterSpacing: "0.06em",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.dark" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
};

const RuleRow = memo(function RuleRow({ rule, selected, layout, onSelect }) {
  const slug = getRuleSlug(rule);
  const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];
  const severity = impactToSeverityLabel(rule.impact);
  const category = RULE_CATEGORY_BY_ID[slug] || "—";
  const isLibrary = layout === "library";

  const handleWarm = useCallback(() => {
    prefetchEngineExample(slug, "success");
  }, [slug]);

  return (
    <TableRow
      hover
      selected={selected}
      onClick={() => onSelect(slug)}
      onMouseDown={handleWarm}
      sx={{
        cursor: "pointer",
        "&.Mui-selected td": { bgcolor: "action.selected" },
        "&.Mui-selected td:first-of-type": {
          boxShadow: (t) => `inset 2px 0 0 ${t.palette.primary.main}`,
        },
        "& td": {
          py: isLibrary ? 1 : 0.65,
          borderColor: "divider",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
    >
      <TableCell title={slug}>
        <Typography
          variant="caption"
          noWrap
          sx={{
            fontFamily: mgsFonts.hud,
            color: "primary.main",
            fontSize: isLibrary ? "0.72rem" : "0.68rem",
          }}
        >
          {isLibrary ? `[ ${slug} ]` : slug}
        </Typography>
      </TableCell>
      <TableCell title={rule.title}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: isLibrary ? "0.82rem" : "0.78rem",
            fontWeight: selected ? 600 : 400,
            color: "text.primary",
          }}
        >
          {rule.title}
        </Typography>
      </TableCell>
      {isLibrary && (
        <TableCell>
          <Typography variant="caption" sx={{ ...hudLabelSx, fontSize: "0.62rem", color: "primary.dark" }}>
            {category}
          </Typography>
        </TableCell>
      )}
      <TableCell>
        {severity !== "—" ? (
          <Chip
            label={severity}
            size="small"
            variant="outlined"
            sx={{
              height: 22,
              fontSize: "0.62rem",
              fontFamily: mgsFonts.hud,
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 0,
            }}
          />
        ) : (
          <Typography variant="caption" color="text.secondary">
            —
          </Typography>
        )}
      </TableCell>
      {isLibrary ? (
        <>
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  boxShadow: "0 0 6px rgba(0,163,141,0.6)",
                  flexShrink: 0,
                }}
              />
              <Typography variant="caption" sx={{ ...hudLabelSx, fontSize: "0.62rem" }}>
                ACTIVE
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: mgsFonts.hud, fontSize: "0.68rem" }}>
              {wcagRefs[0]?.id || "—"}
            </Typography>
          </TableCell>
        </>
      ) : (
        <TableCell>
          {wcagRefs[0] ? (
            <Chip label={wcagRefs[0].id} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.62rem" }} />
          ) : (
            <Typography variant="caption" color="text.secondary">
              —
            </Typography>
          )}
        </TableCell>
      )}
    </TableRow>
  );
});

export default function EngineRulesTable({
  layout = "compact",
  filteredRules,
  populatedCount,
  selectedRuleId,
  onSelectRule,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  impactFilter,
  setImpactFilter,
  wcagLevelFilter,
  setWcagLevelFilter,
  wcagCriteriaFilter,
  setWcagCriteriaFilter,
  legacyRuleFilter,
  setLegacyRuleFilter,
  wcagLevels,
  wcagCriteriaIds,
  loading = false,
}) {
  const isLibrary = layout === "library";

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          px: isLibrary ? { xs: 2, sm: 3 } : { xs: 1.5, sm: 2 },
          pt: isLibrary ? { xs: 2, sm: 2.5 } : 1.5,
          pb: 1,
          flexShrink: 0,
          borderBottom: isLibrary ? 1 : 0,
          borderColor: "divider",
        }}
      >
        {isLibrary ? (
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <DescriptionOutlinedIcon sx={{ color: "primary.main", fontSize: 22 }} />
                <Typography variant="h6" sx={{ ...hudLabelSx, fontSize: "0.85rem", color: "primary.main" }}>
                  Engine Rules Library
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", maxWidth: 520 }}>
                Manage and configure accessibility rules used by the RAIDEN engine.
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: mgsFonts.hud, flexShrink: 0 }}>
              {populatedCount} rules · {filteredRules.length} shown
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {populatedCount} rules · showing {filteredRules.length}
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isLibrary
              ? { xs: "1fr", md: "minmax(140px, 1fr) 2fr minmax(120px, 1fr)" }
              : {
                  xs: "1fr",
                  md: "1fr 1fr",
                  xl: "2fr repeat(4, minmax(72px, 1fr))",
                },
            gap: 1,
            alignItems: "center",
          }}
        >
          {isLibrary && (
            <FormControl size="small" fullWidth>
              <Select
                value={categoryFilter}
                displayEmpty
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={filterSelectSx}
              >
                <MenuItem value="all">ALL CATEGORIES</MenuItem>
                {LIBRARY_CATEGORIES.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            size="small"
            placeholder={isLibrary ? "SEARCH RULES…" : "Search rules…"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paper",
                fontFamily: mgsFonts.hud,
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" fullWidth={isLibrary}>
            {isLibrary ? (
              <Select
                value={impactFilter}
                displayEmpty
                onChange={(e) => setImpactFilter(e.target.value)}
                sx={filterSelectSx}
              >
                <MenuItem value="all">ALL SEVERITY</MenuItem>
                <MenuItem value="critical">CRITICAL</MenuItem>
                <MenuItem value="serious">SERIOUS</MenuItem>
                <MenuItem value="moderate">MODERATE</MenuItem>
                <MenuItem value="minor">MINOR</MenuItem>
              </Select>
            ) : (
              <Select value={impactFilter} onChange={(e) => setImpactFilter(e.target.value)} displayEmpty size="small">
                <MenuItem value="all">Impact: All</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="serious">Serious</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="minor">Minor</MenuItem>
              </Select>
            )}
          </FormControl>
          {!isLibrary && (
            <>
              <FormControl size="small">
                <Select value={wcagLevelFilter} onChange={(e) => setWcagLevelFilter(e.target.value)} displayEmpty size="small">
                  <MenuItem value="all">WCAG: All</MenuItem>
                  {wcagLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select
                  value={wcagCriteriaFilter}
                  onChange={(e) => setWcagCriteriaFilter(e.target.value)}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="all">Criteria: All</MenuItem>
                  {wcagCriteriaIds.map((criteria) => (
                    <MenuItem key={criteria} value={criteria}>
                      {criteria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <Select value={legacyRuleFilter} onChange={(e) => setLegacyRuleFilter(e.target.value)} displayEmpty size="small">
                  <MenuItem value="all">Legacy: All</MenuItem>
                  <MenuItem value="yes">Has legacy</MenuItem>
                  <MenuItem value="no">No legacy</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </Box>
      </Box>

      <TableContainer sx={{ flex: 1, overflow: "auto", px: isLibrary ? { xs: 2, sm: 3 } : { xs: 1, sm: 2 }, pb: 2 }}>
        {filteredRules.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
            No rules match your filters.
          </Typography>
        ) : (
          <Table
            size="small"
            stickyHeader
            sx={{
              width: "100%",
              tableLayout: isLibrary ? "fixed" : "auto",
              "& .MuiTableCell-head": {
                bgcolor: "background.default",
                borderBottom: 2,
                borderColor: "primary.dark",
                py: 1,
                ...hudLabelSx,
              },
              "& .MuiTableCell-body": {
                borderBottom: 1,
                borderColor: "divider",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: isLibrary ? "18%" : 130 }}>RULE ID</TableCell>
                <TableCell>NAME</TableCell>
                {isLibrary && <TableCell sx={{ width: "14%" }}>CATEGORY</TableCell>}
                <TableCell sx={{ width: isLibrary ? "10%" : 72 }}>SEVERITY</TableCell>
                {isLibrary ? (
                  <>
                    <TableCell sx={{ width: "10%" }}>STATUS</TableCell>
                    <TableCell sx={{ width: "10%" }}>WCAG</TableCell>
                  </>
                ) : (
                  <TableCell sx={{ width: 64 }}>WCAG</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={isLibrary ? 6 : 4}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: mgsFonts.hud }}>
                      Loading rules…
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRules.map((rule) => {
                  const slug = getRuleSlug(rule);
                  return (
                    <RuleRow
                      key={slug}
                      rule={rule}
                      selected={slug === selectedRuleId}
                      layout={layout}
                      onSelect={onSelectRule}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
