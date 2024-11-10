import React from "react";
import {
  Breadcrumbs,
  Paper,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const CustomizedBreadcrumbs = ({ selectedOption, handleOptionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const selectedOptionFromURL = pathnames.find((pathname) =>
    pathname.includes("failure")
      ? "Failure"
      : pathname.includes("success")
      ? "Success"
      : null
  );

  const initialSelectedOption = selectedOptionFromURL || selectedOption;
  const value = initialSelectedOption.trim().replace(/^\[|\]$/g, "");
  const parts = value.split("_");
  const lastPart = parts[parts.length - 1];

  const handleOptionSelection = (selectedValue) => {
    const newURL = location.pathname.replace(
      /(_success|_failure)/,
      `_${selectedValue.toLowerCase()}`
    );
    navigate(newURL);
  };

  return (
    <Grid container item xs={12}>
      <Paper elevation={0} sx={{ padding: "8px 16px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
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
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return last ? (
              <NavLink
                to={`/${pathnames[0]}#${parts[0]}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={to}
              >
                {result}
              </NavLink>
            ) : (
              <NavLink
                to={to}
                style={{ textDecoration: "none", color: "inherit" }}
                key={to}
              >
                {formattedValue}
              </NavLink>
            );
          })}
          <Select
            value={lastPart}
            onChange={(event) => handleOptionSelection(event.target.value)}
            sx={{ marginLeft: "8px" }}
          >
            <MenuItem value="failure">Failure</MenuItem>
            <MenuItem value="success">Success</MenuItem>
          </Select>
        </Breadcrumbs>
      </Paper>
    </Grid>
  );
};

export default CustomizedBreadcrumbs;
