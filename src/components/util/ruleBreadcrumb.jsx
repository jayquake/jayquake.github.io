import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, MenuItem, Paper, Select } from "@mui/material";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const CustomizedBreadcrumbs = ({ selectedOption, handleOptionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const hasVariant = /(_success|_failure)$/.test(location.pathname);
  const lastPart = location.pathname.endsWith("_failure")
    ? "failure"
    : location.pathname.endsWith("_success")
    ? "success"
    : "";

  const handleOptionSelection = (selectedValue) => {
    const basePath = location.pathname.replace(/(_success|_failure)$/, "");
    const newURL = `${basePath}_${selectedValue.toLowerCase()}`;
    navigate(newURL);
  };

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
          sx={{ flexWrap: "nowrap", alignItems: "center" }}
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
            const result = formattedValue
              .split("_")[0]
              .replace(/-/g, " ")
              .split(" ")
              .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
              })
              .join(" ");

            const isVariantSegment = /(_success|_failure)$/.test(to);
            const targetTo = isVariantSegment
              ? to.replace(/(_success|_failure)$/, "")
              : to;

            return last ? (
              <NavLink
                to={targetTo}
                style={{
                  textDecoration: "none",
                  color: "#1565c0",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "8px",
                  background: "rgba(25, 118, 210, 0.15)",
                  border: "1px solid rgba(25, 118, 210, 0.3)",
                  transition: "all 0.2s ease",
                  fontSize: "0.8rem",
                  maxWidth: "160px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                key={to}
              >
                {result}
              </NavLink>
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

          {hasVariant && (
            <Select
              value={lastPart}
              onChange={(event) => handleOptionSelection(event.target.value)}
              aria-label="Select variant type"
              size="small"
              sx={{
                ml: 1,
                minWidth: 90,
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(25, 118, 210, 0.25)",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "#1976d2",
                "& .MuiSelect-select": { py: 0.5, px: 1.5 },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              <MenuItem aria-label="Option failure" value="failure">
                Failure
              </MenuItem>
              <MenuItem aria-label="Option success" value="success">
                Success
              </MenuItem>
            </Select>
          )}
        </Breadcrumbs>
      </Paper>
    </>
  );
};

export default CustomizedBreadcrumbs;
