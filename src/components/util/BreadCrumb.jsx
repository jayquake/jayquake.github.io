import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
      aria-label="breadcrumb"
      sx={{ mb: 2, "& .MuiBreadcrumbs-li": { fontSize: "0.75rem" } }}
    >
      <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
        Home
      </NavLink>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const formattedValue = capitalizeFirstLetter(value);

        return last ? (
          <Typography key={to} color="text.secondary" variant="caption" sx={{ fontWeight: 500 }}>
            {formattedValue}
          </Typography>
        ) : (
          <NavLink key={to} to={to} style={{ textDecoration: "none", color: "inherit" }}>
            {formattedValue}
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default SimpleBreadcrumbs;
