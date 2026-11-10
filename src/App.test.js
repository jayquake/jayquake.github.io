import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { LoadingProvider } from "./components/util/LoadingContext";
import { ToastProvider } from "./components/standalone/ToastContainer";
import { AppReadyProvider } from "./context/AppReadyContext";
import { MotionProvider } from "./components/motion/HudMotion";
import { TooltipProvider } from "./components/ui/tooltip";

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    ((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
  global.ResizeObserver =
    global.ResizeObserver ||
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  // Plain function, not jest.fn: CRA's resetMocks would wipe a mock implementation before each test.
  // Legacy /data.json is an array; the engine catalog is { rules: [] }.
  global.fetch = (url) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(String(url).includes("data.json") ? [] : { rules: [] }),
    });
});

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LoadingProvider>
        <ToastProvider>
          <AppReadyProvider>
            <MotionProvider>
              <TooltipProvider>
                <App />
              </TooltipProvider>
            </MotionProvider>
          </AppReadyProvider>
        </ToastProvider>
      </LoadingProvider>
    </MemoryRouter>
  );
}

test("renders the app shell with the library title on /", async () => {
  renderAt("/");
  const banner = await screen.findByRole("banner");
  expect(within(banner).getByText("Engine Rules Library")).toBeInTheDocument();
});

test("names the page after the rule on /engine/:ruleId", async () => {
  renderAt("/engine/alt-misuse");
  expect(await screen.findAllByText("alt-misuse")).not.toHaveLength(0);
});
