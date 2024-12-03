import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AccessibleTwoToneIcon from "@mui/icons-material/AccessibleTwoTone";
import Chip from "@mui/material/Chip";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";

function ItemPage({ ruleData }) {
  if (!ruleData) {
    return (<Container sx={{ mt: 4, mb: 4 }}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CustomizedBreadcrumbs />
            <Divider />
            <Typography sx={{ p: 2 }} m="auto" variant="overline" gutterBottom>
            
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
              No items found
            </Typography>
            
           
          </Paper>
        </Grid>
      </Grid>
    </Container>)
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CustomizedBreadcrumbs />
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
              {/* Replace CodeSection with your appropriate component */}
              <CodeSection>{ruleData.issueResolution}</CodeSection>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ItemPage;
