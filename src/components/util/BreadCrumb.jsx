import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const linkClass = "text-inherit no-underline hover:underline";

const Separator = () => (
  <li aria-hidden="true" className="flex items-center text-foreground-muted">
    <ChevronRight className="size-3.5" />
  </li>
);

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="mb-4 text-[0.75rem] text-foreground-secondary">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const formattedValue = capitalizeFirstLetter(value);

          return (
            <Fragment key={to}>
              <Separator />
              <li>
                {last ? (
                  <span className="font-medium text-foreground-secondary">{formattedValue}</span>
                ) : (
                  <NavLink to={to} className={linkClass}>
                    {formattedValue}
                  </NavLink>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default SimpleBreadcrumbs;
