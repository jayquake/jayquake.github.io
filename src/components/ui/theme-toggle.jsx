import { Moon, Sun } from "lucide-react";
import { useColorScheme } from "../../theme/colorScheme";
import { Button } from "./button";

export function ThemeToggle({ className }) {
  const [scheme, , toggle] = useColorScheme();
  const dark = scheme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark theme"
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={className}
    >
      {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
