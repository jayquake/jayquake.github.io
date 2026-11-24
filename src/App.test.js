import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { LoadingProvider } from "./components/util/LoadingContext";
import { ToastProvider } from "./components/standalone/ToastContainer";
import { AppReadyProvider } from "./context/AppReadyContext";
import { MotionProvider } from "./components/motion/HudMotion";
import { TooltipProvider } from "./components/ui/tooltip";
import ENGINE_RULES from "../public/engine-rules.json";

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
  // Legacy /data.json is an array; the engine catalog is { rules: [...] }.
  // The catalog is cached for the whole module, so it must hold every rule a test
  // opens; an empty one makes the rule page resolve to "not found" after the first test.
  const catalog = { rules: [ENGINE_RULES.rules.find((r) => r.kebabId === "alt-misuse")] };
  global.fetch = (url) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(String(url).includes("data.json") ? [] : catalog),
    });
});

// The rule page is lazy-loaded and waits on the catalog fetch.
const SLOW = { timeout: 10000 };

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
  const banner = await screen.findByRole("banner", {}, SLOW);
  expect(within(banner).getByText("Engine Rules Library")).toBeInTheDocument();
}, 20000);

test("names the page after the rule on /engine/:ruleId", async () => {
  renderAt("/engine/alt-misuse");
  expect(await screen.findAllByText("alt-misuse", {}, SLOW)).not.toHaveLength(0);
}, 20000);
