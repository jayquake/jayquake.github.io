import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Science as ScienceIcon,
  Search as SearchIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import engineRulesData from "../../../data/engine-rules-metadata.json";
/**
 * EngineLibrary
 *
 * Similar in spirit to `Criteria/Keyboard/Keyboard.jsx`, this page is
 * a focused library view that renders a card grid of ALL engine rules,
 * driven directly from `engine-rules-metadata.json`.
 */
const EngineLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [impactFilter, setImpactFilter] = useState("all");

  const filteredRules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return engineRulesData.filter((rule) => {
      const matchesImpact =
        impactFilter === "all" ||
        (rule.impact || "").toLowerCase() === impactFilter.toLowerCase();

      if (!term) return matchesImpact;

      const haystack = [rule.id, rule.title, rule.description, rule.advice]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesImpact && haystack.includes(term);
    });
  }, [searchTerm, impactFilter]);

  const getSeverityColor = (impact) => {
    switch ((impact || "").toLowerCase()) {
      case "critical":
        return { bg: "rgba(211, 47, 47, 0.1)", color: "#d32f2f" };
      case "serious":
        return { bg: "rgba(245, 124, 0, 0.1)", color: "#f57c00" };
      case "moderate":
        return { bg: "rgba(25, 118, 210, 0.1)", color: "#1976d2" };
      case "minor":
        return { bg: "rgba(56, 142, 60, 0.1)", color: "#388e3c" };
      default:
        return { bg: "rgba(148, 163, 184, 0.12)", color: "#64748b" };
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow:
            "0 20px 40px rgba(15, 23, 42, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background:
              "linear-gradient(135deg, rgba(102,126,234,0.95) 0%, rgba(124,58,237,0.95) 100%)",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                background: "rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(15,23,42,0.35)",
              }}
            >
              <ScienceIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                Engine Rules Library
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, mt: 0.5, fontWeight: 400 }}
              >
                Browse {engineRulesData.length}+ automated accessibility engine
                rules as cards.
              </Typography>
            </Box>
          </Box>
          <Chip
            label="Engine Rules"
            sx={{
              backgroundColor: "rgba(15,23,42,0.25)",
              borderRadius: 999,
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Controls */}
        <Box
          sx={{
            px: 3,
            py: 3,
            borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by ID, title, description, or advice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "rgba(148,163,184,0.9)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Impact</InputLabel>
                <Select
                  value={impactFilter}
                  label="Impact"
                  onChange={(e) => setImpactFilter(e.target.value)}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="all">All impacts</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="serious">Serious</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="minor">Minor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                Showing {filteredRules.length} of {engineRulesData.length} rules
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Cards */}
        <Box sx={{ px: 3, py: 3 }}>
          {filteredRules.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                color: "text.secondary",
              }}
            >
              <Typography variant="h6" gutterBottom>
                No engine rules match your filters
              </Typography>
              <Typography variant="body2">
                Try clearing the search term or selecting a different impact
                level.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredRules.map((rule) => {
                const colors = getSeverityColor(rule.impact);
                return (
                  <Grid item xs={12} sm={6} md={4} key={rule.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.9)",
                        boxShadow:
                          "0 10px 30px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                        border: "1px solid rgba(226,232,240,0.9)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background:
                            "linear-gradient(90deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Chip
                            icon={<ScienceIcon sx={{ fontSize: 18 }} />}
                            label={rule.id}
                            size="small"
                            sx={{
                              fontFamily: "monospace",
                              fontWeight: 600,
                              backgroundColor: "rgba(79,70,229,0.08)",
                              color: "#3730a3",
                              "& .MuiChip-icon": { color: "#4f46e5" },
                            }}
                          />
                          <Chip
                            label={(rule.impact || "unknown").toUpperCase()}
                            size="small"
                            sx={{
                              backgroundColor: colors.bg,
                              color: colors.color,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                            }}
                          />
                        </Box>

                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "#111827",
                          }}
                        >
                          {rule.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {rule.description}
                        </Typography>
                      </CardContent>

                      <CardActions
                        sx={{
                          px: 3,
                          pb: 3,
                          pt: 0,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          component={Link}
                          to={rule.detailUrl}
                          size="small"
                          variant="contained"
                          endIcon={<LaunchIcon />}
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontWeight: 600,
                            background:
                              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          }}
                        >
                          View details
                        </Button>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {rule.refs?.length || 0} references
                        </Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default EngineLibrary;
