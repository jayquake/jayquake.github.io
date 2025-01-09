import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Modern Prism theme
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import {
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
  Fab,
  Divider,
} from "@mui/material";
import {
  ContentPaste as ContentPasteIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbDownAlt as ThumbDownAltIcon,
} from "@mui/icons-material";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import AccessibleTwoToneIcon from "@mui/icons-material/AccessibleTwoTone";
import { Link } from "react-router-dom";
import SimpleBreadcrumbs from "../util/BreadCrumb";

function ModernItemPage({ ruleData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`{
      "shortTextMarkdown": "New rule updated",
      "bodyMarkdown": "**${ruleData.name}** detection has been updated and may affect the number of issues found in your audit.",
      "ctaLink": "rules/${ruleData._id.$oid}"
    }`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [ruleData]);

  if (!ruleData) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          No item found
        </Typography>
      </Container>
    );
  }

  const sanitizedHtml = DOMPurify.sanitize(ruleData.issueResolution);

  // Function to determine severity chip colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "extreme":
        return {
          textColor: "#d32f2f", // Red
          borderColor: "#d32f2f",
          iconColor: "#d32f2f",
        };
      case "high":
        return {
          textColor: "#f57c00", // Orange
          borderColor: "#f57c00",
          iconColor: "#f57c00",
        };
      case "medium":
        return {
          textColor: "#1976d2", // Blue
          borderColor: "#1976d2",
          iconColor: "#1976d2",
        };
      case "low":
        return {
          textColor: "#388e3c", // Green
          borderColor: "#388e3c",
          iconColor: "#388e3c",
        };
      default:
        return {
          textColor: "grey",
          borderColor: "grey",
          iconColor: "grey",
        };
    }
  };

  const severityColors = getSeverityColor(ruleData.severity);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 6, borderRadius: 3 }}>
        {/* Breadcrumbs */}
        <Box mb={3}>
          <SimpleBreadcrumbs />
        </Box>

        {/* Title Section */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {ruleData.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {ruleData.shortDescription}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Issue Description */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          {ruleData.issueDescription}
        </Typography>

        {/* Chips Section */}
        <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
          <Chip
            icon={<LocalLibraryTwoToneIcon />}
            label={`Criteria: ${ruleData.criteria}`}
            variant="outlined"
            color="warning"
            sx={{
              boxShadow: 2,
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<GavelTwoToneIcon sx={{ color: severityColors.iconColor }} />}
            label={`Severity: ${ruleData.severity}`}
            variant="outlined"
            color={`${severityColors.iconColor}`}
            sx={{
              boxShadow: 2,
              fontWeight: "bold",
              color: severityColors.textColor,
              borderColor: severityColors.borderColor,
            }}
          />
          <Chip
            icon={<AccessibleTwoToneIcon />}
            label={`WCAG Level: ${ruleData.WCAGLevel}`}
            variant="outlined"
            color="primary"
            sx={{
              boxShadow: 2,
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* WCAG Documentation Section */}
        <Box
          mt={4}
          p={2}
          sx={{
            borderRadius: 2,
            boxShadow: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            WCAG Documentation:
          </Typography>
          <a
            href={ruleData.issueWCAGLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              wordBreak: "break-all",
              fontWeight: "bold",
            }}
          >
            {ruleData.issueWCAGLink}
          </a>
        </Box>

        {/* Issue Resolution Section */}
        <Box
          mt={4}
          p={3}
          sx={{
            bgcolor: "grey.100",
            borderRadius: 2,
            boxShadow: 2,
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Issue Resolution
          </Typography>
          <pre>
            <code
              className="language-html"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </pre>
        </Box>

        {/* Action Buttons */}
        <Box mt={4} display="flex" justifyContent="center" gap={3}>
          <Link
            to={`/${ruleData.criteria}/${ruleData.route}_success`}
            style={{ textDecoration: "none" }}
          >
            <Fab
              color="success"
              variant="extended"
              sx={{
                px: 4,
                boxShadow: 3,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "success.dark",
                },
              }}
            >
              <ThumbUpAltIcon sx={{ mr: 1 }} />
              Success
            </Fab>
          </Link>
          <Link
            to={`/${ruleData.criteria}/${ruleData.route}_failure`}
            style={{ textDecoration: "none" }}
          >
            <Fab
              color="error"
              variant="extended"
              sx={{
                px: 4,
                boxShadow: 3,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
            >
              <ThumbDownAltIcon sx={{ mr: 1 }} />
              Failures
            </Fab>
          </Link>
        </Box>

        {/* Rule Release JSON Section */}
        <Box
          mt={4}
          p={3}
          sx={{
            bgcolor: "background.default",
            borderRadius: 2,
            position: "relative",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Rule Release JSON
          </Typography>
          <pre>
            <code className="language-json">
              {`{
  "shortTextMarkdown": "New rule updated",
  "bodyMarkdown": "**${ruleData.name}** detection has been updated and may affect the number of issues found in your audit.",
  "ctaLink": "rules/${ruleData._id.$oid}"
}`}
            </code>
          </pre>
          <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} arrow>
            <IconButton
              onClick={handleCopy}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                boxShadow: 2,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Container>
  );
}

export default ModernItemPage; 