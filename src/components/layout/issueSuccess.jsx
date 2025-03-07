import React, { Component } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CustomizedBreadcrumbs from "../util/ruleBreadcrumb";

class IssueSuccess extends Component {
  state = {
    itemContent: this.props.itemContent,
    itemDescription: this.props.itemDescription,
  };

  render() {
    const { itemContent, itemDescription } = this.props;

    return (
      <>
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}> {/* container added here */}
            <Grid item xs={12}> {/* item added here */}
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <CustomizedBreadcrumbs />
                <Divider />
                <Typography
                  sx={{ p: 2 }}
                  m="auto"
                  variant="overline"
                  gutterBottom
                >
                  {itemDescription}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}> {/* container added here */}
            <Grid item xs={12}> {/* item added here */}
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography m="auto" variant="overline">
                  Success Examples
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {itemContent}
                <Grid item xs={12}> {/* item added here */}
                  <Stack direction="row" spacing={1}></Stack>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default IssueSuccess;
