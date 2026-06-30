import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const CustomizedBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [variantMenuAnchor, setVariantMenuAnchor] = useState(null);
  const pathnames = location.pathname.split("/").filter((x) => x);

  const hasVariant = /(_success|_failure)$/.test(location.pathname);
  const lastPart = location.pathname.endsWith("_failure")
    ? "failure"
    : location.pathname.endsWith("_success")
    ? "success"
    : "";

  const handleOptionSelection = (selectedValue) => {
    const basePath = location.pathname.replace(/(_success|_failure)$/, "");
    navigate(`${basePath}_${selectedValue.toLowerCase()}`);
    setVariantMenuAnchor(null);
  };

  const variantMenuOpen = Boolean(variantMenuAnchor);
  const variantLabel = lastPart === "failure" ? "Failure" : "Success";

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
      aria-label="breadcrumb"
      sx={{ mb: 2, flexWrap: "wrap", "& .MuiBreadcrumbs-li": { fontSize: "0.75rem" } }}
    >
      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
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

        const isVariantSegment = /(_success|_failure)$/.test(to);
        const targetTo = isVariantSegment ? to.replace(/(_success|_failure)$/, "") : to;

        return last ? (
          <NavLink key={to} to={targetTo} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {result}
            </Typography>
          </NavLink>
        ) : (
          <NavLink key={to} to={to} style={{ textDecoration: "none", color: "inherit" }}>
            {formattedValue}
          </NavLink>
        );
      })}

      {hasVariant && (
        <>
          <Button
            type="button"
            onClick={(event) => setVariantMenuAnchor(event.currentTarget)}
            aria-haspopup="listbox"
            aria-expanded={variantMenuOpen}
            size="small"
            variant="outlined"
            endIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
            sx={{ textTransform: "none", fontSize: "0.75rem", py: 0.25, minHeight: 28 }}
          >
            {variantLabel}
          </Button>
          <Menu
            anchorEl={variantMenuAnchor}
            open={variantMenuOpen}
            onClose={() => setVariantMenuAnchor(null)}
          >
            <MenuItem
              selected={lastPart === "failure"}
              onClick={() => handleOptionSelection("failure")}
            >
              Failure
            </MenuItem>
            <MenuItem
              selected={lastPart === "success"}
              onClick={() => handleOptionSelection("success")}
            >
              Success
            </MenuItem>
          </Menu>
        </>
      )}
    </Breadcrumbs>
  );
};

export default CustomizedBreadcrumbs;
