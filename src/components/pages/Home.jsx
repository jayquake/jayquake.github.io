import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";

export default function Home({ title }) {
  // Use title directly in the useEffect hook with it as a dependency
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography m="auto" variant="overline" gutterBottom>
                  accessFlow Auditor Rules
                </Typography>
              </Paper>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography m="auto" variant="overline">
              <h3>Use Cases:</h3>
            </Typography>
            <Divider sx={{ mb: 2 }}></Divider>

            <Typography align="justify" variant="overline">
              <ol>
                <li>Testing the accessFlow Auditor</li>
                <li>Verifying Rule Success & Failure Criteria</li>
                <li>Verifying Scanner Issue Consistency</li>
              </ol>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography m="auto" variant="overline">
              Useful Tools
            </Typography>
            <Divider sx={{ mb: 2 }}></Divider>
            <Box sx={{ width: "100%" }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <Link to="/audit-rules/rules">
                    <Fab variant="extended">
                      <GavelTwoToneIcon sx={{ mr: 1 }} />
                      Rules List
                    </Fab>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Fab variant="extended">
                    <VerifiedUserTwoToneIcon sx={{ mr: 1 }} />
                    Auditor
                  </Fab>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}></Grid>
      </Grid>
    </>
  );
}
