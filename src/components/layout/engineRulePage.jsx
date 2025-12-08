import {
  AccessibleTwoTone as AccessibleTwoToneIcon,
  CheckCircle as CheckCircleIcon,
  Code as CodeIcon,
  ContentCopy as ContentCopyIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Info as InfoIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Link as LinkIcon,
  OpenInNew as OpenInNewIcon,
  Print as PrintIcon,
  Science as ScienceIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Fab,
  Fade,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import engineLegacyMapping from "../../data/engine-legacy-mapping";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";

function EngineRulePage({ ruleData }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Simulate loading and fade in effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [ruleData]);

  // Scroll detection for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: ruleData?.title,
          text: ruleData?.description,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      handleCopy(window.location.href);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getSeverityColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "critical":
        return {
          textColor: "#d32f2f",
          borderColor: "#d32f2f",
          iconColor: "#d32f2f",
        };
      case "major":
        return {
          textColor: "#f57c00",
          borderColor: "#f57c00",
          iconColor: "#f57c00",
        };
      case "moderate":
        return {
          textColor: "#1976d2",
          borderColor: "#1976d2",
          iconColor: "#1976d2",
        };
      case "minor":
        return {
          textColor: "#388e3c",
          borderColor: "#388e3c",
          iconColor: "#388e3c",
        };
      default:
        return {
          textColor: "#666",
          borderColor: "#666",
          iconColor: "#666",
        };
    }
  };

  // Helper function to format rule ID into readable title
  const formatRuleTitle = (id) => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 4 }}>
        <Skeleton
          variant="rectangular"
          width="60%"
          height={40}
          sx={{ mb: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={2}
          sx={{ mb: 3 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={100}
          sx={{ mb: 3, borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={60}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2}>
          <Skeleton
            variant="rectangular"
            width={120}
            height={32}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={120}
            height={32}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      </Paper>
      <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 4 }}>
        <Skeleton
          variant="rectangular"
          width="40%"
          height={32}
          sx={{ mb: 3 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={120}
          sx={{ borderRadius: 2 }}
        />
      </Paper>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
        <Skeleton
          variant="rectangular"
          width="40%"
          height={32}
          sx={{ mb: 3 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={80}
          sx={{ borderRadius: 2 }}
        />
      </Paper>
    </Container>
  );

  if (!ruleData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CustomizedBreadcrumbs />
            <Divider sx={{ my: 3 }} />

            <Alert
              severity="info"
              sx={{
                mb: 3,
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.7)",
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              }}
              icon={<InfoIcon />}
            >
              <AlertTitle sx={{ fontWeight: "bold" }}>
                No Engine Rule Data Available
              </AlertTitle>
              <Typography variant="body1">
                The requested engine rule could not be found or is not available
                at this time.
              </Typography>
            </Alert>
          </Paper>
        </Fade>
      </Container>
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  const severityColors = getSeverityColor(ruleData.impact);
  const wcagRefs = ruleData.refs?.filter((r) => r.type === "WCAG") || [];
  const otherRefs = ruleData.refs?.filter((r) => r.type !== "WCAG") || [];
  const formattedTitle = formatRuleTitle(ruleData.id);
  const relatedLegacyRules = engineLegacyMapping[ruleData.id] || [];

  const speedDialActions = [
    { icon: <ShareIcon />, name: "Share", action: handleShare },
    { icon: <PrintIcon />, name: "Print", action: handlePrint },
    {
      icon: <ContentCopyIcon />,
      name: "Copy Advice",
      action: () => handleCopy(ruleData.advice),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: "relative" }}>
      {/* Scroll to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          sx={{
            position: "fixed",
            bottom: 80,
            right: 24,
            zIndex: 1000,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 20px rgba(103, 58, 183, 0.4)",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 6px 28px rgba(103, 58, 183, 0.5)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* Quick Actions Speed Dial */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          "& .MuiSpeedDial-fab": {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
            tooltipOpen
            sx={{
              "& .MuiSpeedDialAction-fab": {
                boxShadow: "0 4px 12px rgba(103, 58, 183, 0.3)",
              },
            }}
          />
        ))}
      </SpeedDial>

      {/* Header Section */}
      <Slide in direction="down" timeout={600}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CustomizedBreadcrumbs />
          <Divider sx={{ my: 3 }} />

          <Alert
            severity="info"
            sx={{
              mb: 3,
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              borderRadius: 3,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            }}
            icon={<ScienceIcon />}
          >
            <AlertTitle sx={{ fontWeight: "bold", color: "#1e293b" }}>
              Engine Rule Details
            </AlertTitle>
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              This is an automated accessibility validation rule from the audit
              engine with comprehensive testing coverage.
            </Typography>
          </Alert>

          {/* Related legacy rules (if mapping exists) */}
          {relatedLegacyRules.length > 0 && (
            <Box
              sx={{
                mb: 3,
                p: 2.5,
                borderRadius: 3,
                background: "rgba(248, 250, 252, 0.8)",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#475569", mr: 1 }}
              >
                Related legacy rule{relatedLegacyRules.length > 1 ? "s" : ""}:
              </Typography>
              {relatedLegacyRules.map((legacy) => (
                <Chip
                  key={legacy.path}
                  component={Link}
                  to={legacy.path}
                  clickable
                  label={legacy.label}
                  icon={<AccessibleTwoToneIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    fontWeight: 600,
                    borderRadius: 999,
                    px: 0.5,
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(148,163,184,0.5)",
                    color: "#1e293b",
                    "& .MuiChip-icon": {
                      color: "#2563eb",
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,1)",
                      boxShadow: "0 4px 12px rgba(15,23,42,0.18)",
                    },
                  }}
                />
              ))}
            </Box>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* Main Title - Formatted from ID */}
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  mb: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "-0.02em",
                }}
              >
                {formattedTitle}
              </Typography>

              {/* Rule ID Badge */}
              <Box sx={{ mb: 3 }}>
                <Chip
                  label={`Rule ID: ${ruleData.id}`}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    background: "rgba(103, 58, 183, 0.1)",
                    color: "#673ab7",
                    border: "1px solid rgba(103, 58, 183, 0.3)",
                    fontFamily: "monospace",
                  }}
                />
              </Box>

              {/* Rule Title from data */}
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: "#475569",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {ruleData.title}
              </Typography>

              {/* Enhanced Status Chips */}
              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                sx={{ gap: 1 }}
              >
                <Chip
                  icon={<ScienceIcon />}
                  label="Engine Rule"
                  sx={{
                    fontWeight: "bold",
                    background: "rgba(103, 58, 183, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(103, 58, 183, 0.4)",
                    color: "#673ab7",
                    boxShadow: "0 2px 8px rgba(103, 58, 183, 0.2)",
                    "& .MuiChip-icon": { color: "#673ab7" },
                  }}
                />
                <Chip
                  icon={<GavelIcon sx={{ color: severityColors.iconColor }} />}
                  label={`Impact: ${
                    ruleData.impact.charAt(0).toUpperCase() +
                    ruleData.impact.slice(1)
                  }`}
                  sx={{
                    fontWeight: "bold",
                    background: `rgba(${
                      severityColors.textColor === "#d32f2f"
                        ? "211, 47, 47"
                        : severityColors.textColor === "#f57c00"
                        ? "245, 124, 0"
                        : severityColors.textColor === "#1976d2"
                        ? "25, 118, 210"
                        : "56, 142, 60"
                    }, 0.2)`,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    color: severityColors.textColor,
                    border: `1px solid ${severityColors.borderColor}40`,
                    boxShadow: `0 2px 8px ${severityColors.borderColor}30`,
                  }}
                />
                {wcagRefs.length > 0 && (
                  <Chip
                    icon={<AccessibleTwoToneIcon />}
                    label={`WCAG Compliant (${wcagRefs.length} criteria)`}
                    sx={{
                      fontWeight: "bold",
                      background: "rgba(25, 118, 210, 0.2)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(25, 118, 210, 0.4)",
                      color: "#1976d2",
                      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
                      "& .MuiChip-icon": { color: "#1976d2" },
                    }}
                  />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Slide>

      {/* Rule Description Section */}
      <Fade in timeout={800}>
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <DescriptionIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Description
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              color: "#374151",
              background: "rgba(248, 250, 252, 0.8)",
              p: 3,
              borderRadius: 2,
              border: "1px solid rgba(203, 213, 225, 0.5)",
            }}
          >
            {ruleData.description}
          </Typography>
        </Paper>
      </Fade>

      {/* Advice Section */}
      <Fade in timeout={1000}>
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <CodeIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Implementation Advice
            </Typography>
          </Stack>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 3,
              p: 4,
              position: "relative",
              border: "2px solid rgba(34, 197, 94, 0.2)",
              boxShadow: "0 4px 16px rgba(34, 197, 94, 0.1)",
            }}
          >
            <Tooltip title={copied ? "Copied!" : "Copy advice"}>
              <IconButton
                onClick={() => handleCopy(ruleData.advice)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "#059669",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,1)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
                size="small"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                pr: 6,
                fontSize: "1.1rem",
                color: "#065f46",
                fontWeight: 500,
              }}
            >
              {ruleData.advice}
            </Typography>
          </Box>
        </Paper>
      </Fade>

      {/* View Examples Section */}
      <Zoom in timeout={1200}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: "bold", color: "#1e293b" }}
          >
            View Examples
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "#64748b" }}>
            Explore both successful implementations and common failures for this
            engine rule
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Link
              to={`/engine/${ruleData.id}_success`}
              style={{ textDecoration: "none" }}
            >
              <Fab
                color="success"
                variant="extended"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "rgba(76, 175, 80, 0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                  boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  minWidth: "180px",
                  "&:hover": {
                    background: "rgba(56, 142, 60, 0.9)",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(76, 175, 80, 0.4)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <ThumbUpIcon sx={{ mr: 1 }} />
                Success Examples
              </Fab>
            </Link>
            <Link
              to={`/engine/${ruleData.id}_failure`}
              style={{ textDecoration: "none" }}
            >
              <Fab
                color="error"
                variant="extended"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "rgba(244, 67, 54, 0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(244, 67, 54, 0.3)",
                  boxShadow: "0 8px 32px rgba(244, 67, 54, 0.3)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  minWidth: "180px",
                  "&:hover": {
                    background: "rgba(211, 47, 47, 0.9)",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(244, 67, 54, 0.4)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <ThumbDownIcon sx={{ mr: 1 }} />
                Failure Examples
              </Fab>
            </Link>
          </Stack>
        </Paper>
      </Zoom>

      {/* References Section */}
      <Fade in timeout={1400}>
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <LinkIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold" color="primary">
              References & Documentation
            </Typography>
          </Stack>

          {/* WCAG References */}
          {wcagRefs.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}
              >
                WCAG Guidelines
              </Typography>
              <Grid container spacing={2}>
                {wcagRefs.map((ref, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        p: 3,
                        background:
                          "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(21, 101, 192, 0.1) 100%)",
                        border: "2px solid rgba(25, 118, 210, 0.2)",
                        borderRadius: 3,
                        boxShadow: "0 4px 16px rgba(25, 118, 210, 0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Chip
                          label="WCAG"
                          size="small"
                          sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="#1565c0"
                        >
                          {ref.id} - Level {ref.level}
                        </Typography>
                      </Stack>
                      <Button
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        fullWidth
                        startIcon={<OpenInNewIcon />}
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#1976d2",
                          "&:hover": { backgroundColor: "#1565c0" },
                        }}
                      >
                        View WCAG Guideline
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Other References */}
          {otherRefs.length > 0 && (
            <Box>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#7c3aed", fontWeight: "bold" }}
              >
                Additional Resources
              </Typography>
              <Grid container spacing={2}>
                {otherRefs.map((ref, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        p: 3,
                        background:
                          "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)",
                        border: "2px solid rgba(124, 58, 237, 0.2)",
                        borderRadius: 3,
                        boxShadow: "0 4px 16px rgba(124, 58, 237, 0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 32px rgba(124, 58, 237, 0.2)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Chip
                          label={ref.type}
                          size="small"
                          sx={{
                            backgroundColor: "#7c3aed",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </Stack>
                      <Button
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        fullWidth
                        startIcon={<OpenInNewIcon />}
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#7c3aed",
                          "&:hover": { backgroundColor: "#6d28d9" },
                        }}
                      >
                        View Resource
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Fade>

      {/* Summary Footer */}
      <Slide in direction="up" timeout={1600}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(103, 58, 183, 0.1) 0%, rgba(81, 45, 168, 0.1) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2px solid rgba(103, 58, 183, 0.2)",
            boxShadow: "0 8px 32px rgba(103, 58, 183, 0.1)",
          }}
        >
          <ScienceIcon sx={{ fontSize: 48, color: "#673ab7", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#673ab7" }}
          >
            Engine Rule: {formattedTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "#64748b", maxWidth: "600px", mx: "auto" }}
          >
            This automated accessibility validation rule helps ensure your web
            content meets accessibility standards and provides a better
            experience for all users.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Chip
              icon={<CheckCircleIcon />}
              label="Automated Testing"
              sx={{
                fontWeight: "bold",
                background: "rgba(34, 197, 94, 0.2)",
                color: "#059669",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }}
            />
            <Chip
              icon={<AccessibleTwoToneIcon />}
              label="WCAG Compliant"
              sx={{
                fontWeight: "bold",
                background: "rgba(25, 118, 210, 0.2)",
                color: "#1976d2",
                border: "1px solid rgba(25, 118, 210, 0.3)",
              }}
            />
            <Chip
              icon={<GavelIcon />}
              label={`${
                ruleData.impact.charAt(0).toUpperCase() +
                ruleData.impact.slice(1)
              } Impact`}
              sx={{
                fontWeight: "bold",
                background: `rgba(${
                  severityColors.textColor === "#d32f2f"
                    ? "211, 47, 47"
                    : severityColors.textColor === "#f57c00"
                    ? "245, 124, 0"
                    : severityColors.textColor === "#1976d2"
                    ? "25, 118, 210"
                    : "56, 142, 60"
                }, 0.2)`,
                color: severityColors.textColor,
                border: `1px solid ${severityColors.borderColor}40`,
              }}
            />
          </Stack>
        </Paper>
      </Slide>
    </Container>
  );
}

EngineRulePage.propTypes = {
  ruleData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    advice: PropTypes.string,
    impact: PropTypes.string,
    passCondition: PropTypes.string,
    associatedDetectors: PropTypes.array,
    refs: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
        level: PropTypes.string,
        link: PropTypes.string,
      })
    ),
  }),
};

export default EngineRulePage;
