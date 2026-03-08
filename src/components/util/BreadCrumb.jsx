import React from "react";
import { Breadcrumbs, Paper, Typography } from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 1, sm: 1.5, md: 2 },
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          borderRadius: 3,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: { xs: 14, md: 18 } }} />}
          aria-label="breadcrumb"
          sx={{ flexWrap: "nowrap" }}
        >
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
              padding: "4px 8px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              transition: "all 0.2s ease",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            Home
          </NavLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const formattedValue = capitalizeFirstLetter(value);

            return last ? (
              <Typography
                color="textPrimary"
                key={to}
                sx={{
                  fontWeight: 700,
                  background: "rgba(25, 118, 210, 0.15)",
                  backdropFilter: "blur(8px)",
                  px: { xs: 1, md: 1.5 },
                  py: 0.5,
                  borderRadius: 2,
                  border: "1px solid rgba(25, 118, 210, 0.3)",
                  color: "#1565c0",
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  maxWidth: { xs: 160, sm: 240, md: "none" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {formattedValue}
              </Typography>
            ) : (
              <NavLink
                to={to}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 600,
                  padding: "4px 8px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  transition: "all 0.2s ease",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                }}
                key={to}
              >
                {formattedValue}
              </NavLink>
            );
          })}
        </Breadcrumbs>
      </Paper>
    </>
  );
};

export default SimpleBreadcrumbs;
