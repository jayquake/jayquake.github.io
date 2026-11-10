import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import EngineRulesTable from "./EngineRulesTable";
import { theme } from "../../../theme";

function renderTable(props) {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <EngineRulesTable
          layout="library"
          filteredRules={[]}
          populatedCount={0}
          selectedRuleId={null}
          onSelectRule={() => {}}
          searchTerm=""
          setSearchTerm={() => {}}
          categoryFilter="all"
          setCategoryFilter={() => {}}
          impactFilter="all"
          setImpactFilter={() => {}}
          wcagLevelFilter="all"
          setWcagLevelFilter={() => {}}
          wcagCriteriaFilter="all"
          setWcagCriteriaFilter={() => {}}
          legacyRuleFilter="all"
          setLegacyRuleFilter={() => {}}
          wcagLevels={[]}
          wcagCriteriaIds={[]}
          {...props}
        />
      </ThemeProvider>
    </MemoryRouter>
  );
}

test("shows a loading indicator while the catalog is empty", () => {
  renderTable({ loading: true });
  expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  expect(screen.queryByText(/no rules match your filters/i)).not.toBeInTheDocument();
});

test("shows the empty state after the catalog loads with no matches", () => {
  renderTable({ loading: false });
  expect(screen.getByText(/no rules match your filters/i)).toBeInTheDocument();
  expect(screen.queryByRole("status", { name: "Loading" })).not.toBeInTheDocument();
});
