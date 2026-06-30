import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
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
import { getRuleSlug } from "./engineLibraryUtils";

export default function EngineRulesTable({
  filteredRules,
  populatedCount,
  selectedRuleId,
  onSelectRule,
  searchTerm,
  setSearchTerm,
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
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: { xs: 1.5, sm: 2 }, pt: 1.5, pb: 1, flexShrink: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {populatedCount} rules · showing {filteredRules.length}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              xl: "2fr repeat(4, minmax(72px, 1fr))",
            },
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search rules…"
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
            <Select value={wcagLevelFilter} label="WCAG" onChange={(e) => setWcagLevelFilter(e.target.value)}>
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
            <Select value={legacyRuleFilter} label="Legacy" onChange={(e) => setLegacyRuleFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="yes">Has legacy</MenuItem>
              <MenuItem value="no">No legacy</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer
        sx={{
          flex: 1,
          px: { xs: 1, sm: 2 },
          pb: 2,
          overflow: "auto",
        }}
      >
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
              border: 1,
              borderColor: "divider",
              "& .MuiTableCell-head": {
                bgcolor: "background.default",
                borderBottom: 1,
                borderColor: "primary.dark",
                py: 0.75,
                fontSize: "0.68rem",
              },
              "& .MuiTableRow-root.Mui-selected td": {
                bgcolor: "action.selected",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 130 }}>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell sx={{ width: 72 }}>SEV</TableCell>
                <TableCell sx={{ width: 64 }}>WCAG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRules.map((rule) => {
                const slug = getRuleSlug(rule);
                const selected = slug === selectedRuleId;
                const wcagRefs = rule.refs?.filter((r) => r.type === "WCAG") || [];
                const impact = (rule.impact || "").toLowerCase();

                return (
                  <TableRow
                    key={slug}
                    hover
                    selected={selected}
                    onClick={() => onSelectRule(slug)}
                    sx={{
                      cursor: "pointer",
                      "&.Mui-selected td": {
                        bgcolor: "action.selected",
                      },
                      "&.Mui-selected td:first-of-type": {
                        boxShadow: (t) => `inset 2px 0 0 ${t.palette.primary.main}`,
                      },
                      "& td": { py: 0.65, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
                    }}
                  >
                    <TableCell title={slug}>
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          color: "primary.main",
                          display: "block",
                        }}
                      >
                        {slug}
                      </Typography>
                    </TableCell>
                    <TableCell title={rule.title}>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          fontSize: "0.78rem",
                          fontWeight: selected ? 600 : 400,
                          color: "text.primary",
                        }}
                      >
                        {rule.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {impact ? (
                        <Chip
                          label={impact}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 20,
                            fontSize: "0.62rem",
                            borderColor: "primary.dark",
                            color: "primary.main",
                            textTransform: "uppercase",
                          }}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {wcagRefs[0] ? (
                        <Chip
                          label={`${wcagRefs[0].id}`}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.62rem" }}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
