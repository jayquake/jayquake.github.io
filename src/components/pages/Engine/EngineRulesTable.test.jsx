import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import EngineRulesTable from "./EngineRulesTable";
import ENGINE_RULE_CATEGORIES from "../../../data/engine-rule-categories";
import { SEARCH_DEBOUNCE_MS } from "../../../hooks/useLibraryLocation";

const RULE = {
  id: "alt-misuse",
  title: "Elements other than image should not have alt attribute",
  impact: "minor",
  refs: [{ type: "WCAG", id: "4.1.2", level: "A" }],
};

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname + location.search}</output>;
}

function renderTable({ url = "/", ...props } = {}) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <EngineRulesTable
        layout="library"
        filteredRules={[]}
        populatedCount={0}
        selectedRuleId={null}
        wcagLevels={["A", "AA"]}
        wcagCriteriaIds={["1.1.1", "4.1.2"]}
        {...props}
      />
      <LocationProbe />
    </MemoryRouter>
  );
}

const currentUrl = () => screen.getByTestId("location").textContent;

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

test("filter controls reflect the URL and both layouts show all five filters", () => {
  const category = ENGINE_RULE_CATEGORIES[0].id;
  for (const layout of ["library", "compact"]) {
    const { unmount } = renderTable({ layout, url: `/?category=${category}&impact=serious&level=AA&wcag=4.1.2&legacy=1` });
    expect(screen.getByRole("combobox", { name: "Filter by category" })).toHaveValue(category);
    expect(screen.getByRole("combobox", { name: "Filter by impact" })).toHaveValue("serious");
    expect(screen.getByRole("combobox", { name: "Filter by WCAG level" })).toHaveValue("AA");
    expect(screen.getByRole("combobox", { name: "Filter by WCAG criterion" })).toHaveValue("4.1.2");
    expect(screen.getByRole("combobox", { name: "Filter by legacy equivalent" })).toHaveValue("yes");
    unmount();
  }
});

test("changing a filter rewrites the URL and keeps other params", () => {
  renderTable({ url: "/?q=alt" });
  fireEvent.change(screen.getByRole("combobox", { name: "Filter by impact" }), { target: { value: "critical" } });
  expect(currentUrl()).toBe("/?q=alt&impact=critical");
});

test("clear filters removes filters but keeps the search", () => {
  renderTable({ url: "/?q=alt&impact=minor&level=A" });
  fireEvent.click(screen.getByRole("button", { name: /clear filters \(2\)/i }));
  expect(currentUrl()).toBe("/?q=alt");
});

test("empty state can clear search and filters in one click", () => {
  renderTable({ url: "/?q=nothing&impact=minor" });
  fireEvent.click(screen.getByRole("button", { name: /clear search and filters/i }));
  expect(currentUrl()).toBe("/");
});

test("rule and example links carry search and filters", () => {
  renderTable({ url: "/?q=alt&impact=minor&detail=closed", filteredRules: [RULE], populatedCount: 1 });
  const row = screen.getByRole("link", { name: "[ alt-misuse ]" }).closest("tr");
  expect(within(row).getByRole("link", { name: "[ alt-misuse ]" })).toHaveAttribute(
    "href",
    "/engine/alt-misuse?q=alt&impact=minor"
  );
  expect(within(row).getByRole("link", { name: "Success" })).toHaveAttribute(
    "href",
    "/engine/alt-misuse_success?q=alt&impact=minor"
  );
});

test("search keeps spaces while typing and writes the trimmed query after a debounce", () => {
  jest.useFakeTimers();
  try {
    renderTable();
    const input = screen.getByRole("searchbox", { name: "Search rules" });
    fireEvent.change(input, { target: { value: "color " } });
    expect(input).toHaveValue("color ");
    expect(currentUrl()).toBe("/");
    fireEvent.change(input, { target: { value: "color contrast " } });
    act(() => {
      jest.advanceTimersByTime(SEARCH_DEBOUNCE_MS);
    });
    expect(currentUrl()).toBe("/?q=color+contrast");
    expect(input).toHaveValue("color contrast ");
  } finally {
    jest.useRealTimers();
  }
});
