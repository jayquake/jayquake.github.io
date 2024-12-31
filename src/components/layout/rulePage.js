import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CodeSection } from "react-code-section-lib";
import SimpleBreadcrumbs from "../util/BreadCrumb";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Box from "@mui/material/Box";
import AccessibleTwoToneIcon from "@mui/icons-material/AccessibleTwoTone";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";

function ItemPage({ ruleData }) {
  // If ruleData is null, render "No item found"
  if (!ruleData) {
    return <div>No item found</div>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <SimpleBreadcrumbs />
            <Divider />
            <Typography sx={{ p: 2 }} m="auto" variant="overline" gutterBottom>
              {ruleData.id} {ruleData.name}
            </Typography>
            <IconButton
              component="button"
              aria-label="close"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography sx={{ mb: 1.5, pt: 1.5 }} variant="overline">
                {ruleData.shortDescription}
              </Typography>
            </Grid>
            <Typography sx={{ mb: 1.5, pt: 1.5 }}>
              {ruleData.issueDescription}
            </Typography>
            <Box mt={2}>
              <Chip
                variant="outlined"
                color="warning"
                icon={<TagFacesIcon />}
                label={ruleData.criteria}
              />
            </Box>
            <Box mt={2} mb={2}>
              <Chip
                variant="outlined"
                color="primary"
                icon={<AccessibleTwoToneIcon />}
                label={ruleData.WCAGLevel}
              />
            </Box>
            <Typography variant="overline">Issue Resolution:</Typography>
            <Box sx={{ width: "100%" }} mb={2}>
              <CodeSection>{ruleData.issueResolution}</CodeSection>
            </Box>
            <DialogActions sx={{ p: 2 }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing="2"
                sx={{ p: 1 }}
              >
                <Box sx={{ width: "75%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Link
                        component="button"
                        to={`/${ruleData.criteria}/${ruleData.route}_success`}
                      >
                        <Fab color="success" variant="extended">
                          <ThumbUpAltTwoToneIcon sx={{ mr: 1 }} />
                          Success
                        </Fab>
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <Link
                        to={`/${ruleData.criteria}/${ruleData.route}_failure`}
                      >
                        <Fab
                          component="button"
                          color="error"
                          variant="extended"
                        >
                          <ThumbDownTwoToneIcon sx={{ mr: 1 }} />
                          Failures
                        </Fab>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />

                <br />
                
  <Typography variant="overline">Rule Release JSON:</Typography>
  <Box sx={{ width: "75%", bgcolor: "#f4f4f4", padding: 4, borderRadius: 1, position: "relative" }}>
  <pre
    style={{
      fontFamily: "monospace",
      fontSize: "14px",
      margin: 0,
      overflow: "auto",
      whiteSpace: "pre-wrap",
    }}
  >
    {`{
  "shortTextMarkdown": "New rule updated",
  "bodyMarkdown": "**${ruleData.name}** detection has been updated and may affect the number of issues found in your audit.",
  "ctaLink": "rules/${ruleData._id.$oid}"
}`}
  </pre>
  <IconButton
    onClick={() => {
      navigator.clipboard.writeText(`{
  "shortTextMarkdown": "New rule updated",
  "bodyMarkdown": "**${ruleData.name}** detection has been updated and may affect the number of issues found in your audit.",
  "ctaLink": "rules/${ruleData._id.$oid}"
}`);
      alert("Copied to clipboard!");
    }}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      color: (theme) => theme.palette.grey[700],
    }}
  >
    <ContentPasteIcon />
  </IconButton>
</Box>
                

              </Grid>
            </DialogActions>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ItemPage;
