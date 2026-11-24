# MUI → shadcn migration guide (arch #6)

How every MUI file in `src/` is rewritten. Read the whole guide before editing. The token and primitive foundation is already on `main` (commit `5efaa2bc`).

## Hard rules
1. **No `@mui/*` or `@emotion/*` imports** remain in the files you own. Icons come from `lucide-react`.
2. **Edit only the files you were assigned.** If a shared file needs a change, report it instead of editing it.
3. **Keep behaviour identical:**
   - same text, headings, aria-labels, roles, `data-*` attributes, test ids, routes, handlers, state and effects
   - same conditional rendering
   - only the presentation layer changes
4. **Never restyle fixture content.** Wherever example HTML or `reactContent` is rendered (`dangerouslySetInnerHTML`, iframes, `reactContent`), wrap that preview container in `data-theme="light" data-fixture` so fixtures always see the light palette and are excluded from the app's border reset in `src/index.css`. Fixtures carry intentional a11y failures and drive contrast audits.
5. **Colours come only from tokens:**
   - Tailwind classes: `bg-shell-panel`, `text-foreground-secondary`, `border-border`, `text-status-fail`, `bg-primary/10`, `text-severity-critical`, …
   - or `MGS.*` / `severityOf()` for inline styles
   - **No new hex or rgb literals.** Never append hex alpha to a token (`${MGS.x}26` is broken); use `hsl(var(--x) / 0.15)` or Tailwind `/15`.
6. Both themes must work. Don't hard-code white/black backgrounds. Use `bg-shell-*` and `text-foreground*`.
7. **Navigation uses real links.** Anything that navigates must be a `<Link to>` / `<a href>`, not `onClick={() => navigate(...)}` on a card, row, chip or span. Use `buttonClass()` from `ui/button` to style a link as a button. A clickable table row becomes a row whose primary cell holds the link. Keep `navigate()` only for programmatic redirects (after submit, etc.).
8. Before you finish, run `npx eslint <your files>` and `npx tsc --noEmit -p .`. Both must pass for your files.

## Primitives (`src/components/ui/`)
`button` (`Button`, `buttonClass`; variants default/outline/ghost; sizes default/sm/icon), `badge`, `chip` (`Chip` tone default|primary|pass|fail|warn|info; `onClick` makes it a real button), `card` (`Card`, `CardHeader`/`CardTitle`, `CardContent`), `alert` (`Alert` variant info|success|warning|error, `AlertTitle`), `dialog`, `tabs`, `dropdown-menu`, `popover`, `tooltip`, `select` (Radix), `native-select`, `filter-select`, `input`, `textarea`, `checkbox`, `switch`, `radio-group`, `label`, `toggle-group`, `accordion`, `collapsible`, `progress`, `spinner`, `skeleton`, `table` (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`), `separator`, `scroll-area`, `search-field`.

Utilities: `cn()` from `src/lib/utils`, `MGS`/`mgsFonts`/`raidenType` from `src/theme/mgsTokens` (CSS-var based), `SEVERITY`/`severityOf()` from `src/theme/severity`.

## Mapping
| MUI | Replacement |
|---|---|
| `Box`, `Stack`, `Grid` | `<div>` + Tailwind flex/grid (`flex flex-col gap-2`, `grid grid-cols-1 md:grid-cols-3 gap-3`). Keep `component="main"` etc. as the real element. |
| `Typography` | The semantic element its `variant`/`component` produced (`h1`–`h6`, `p`, `span`). **Keep heading levels exactly.** Display headings: `font-['Rajdhani',sans-serif] uppercase tracking-[0.1em]`. Mono/HUD text: `font-mono`. |
| `Paper`, `Card` | `Card` or `div.border.border-border.bg-shell-panel` |
| `Button` / `IconButton` | `Button` (icon-only needs `aria-label`, keep the existing one) |
| `Chip` | `Chip` / `Badge` |
| `Alert` | `Alert` |
| `Tooltip` | `Tooltip` + `TooltipTrigger asChild` + `TooltipContent` |
| `Dialog` / `Drawer` / `Modal` | `Dialog` (a drawer becomes a side-anchored `DialogContent` via className) |
| `Tabs`/`Tab` | `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`. Controlled `value`/`onValueChange`. |
| `Menu`/`MenuItem` | `DropdownMenu*`. A menu item that navigates uses `asChild` with a `<Link>`. |
| `Select`/`TextField select` | `Select` (Radix) or `NativeSelect`. `TextField` becomes `Label` + `Input`/`Textarea` with `id`/`htmlFor`. |
| `Checkbox`/`Switch`/`Radio` | the matching primitive + `Label` |
| `ToggleButtonGroup` | `ToggleGroup type="single"` |
| `Accordion` | `Accordion type="single" collapsible` (or `multiple`) |
| `Collapse` | `Collapsible` or conditional render |
| `LinearProgress` | `Progress` (indeterminate: `div` with `animate-progress-indeterminate`) |
| `CircularProgress` | `Spinner` |
| `Skeleton` | `Skeleton` |
| `Table*` | `ui/table` |
| `Divider` | `Separator` or `div.h-px.bg-border` |
| `List`/`ListItem` | `ul`/`li` |
| `Link` (MUI) | react-router `Link` or `<a href>`. **Never an `<a>` without `href`.** |
| `Breadcrumbs` | `nav aria-label="Breadcrumb"` > `ol` |
| `AppBar`/`Toolbar` | `header`/`div` with `border-b border-border bg-shell-elevated` |
| `Snackbar` | the existing `ToastContainer` |
| `sx={{...}}` | Tailwind classes. Use `style` only for truly dynamic values. |
| `useTheme`/`alpha()`/`styled()` | tokens + Tailwind. `useMediaQuery` becomes `useMatchMedia` from `src/hooks/useMatchMedia`. |

Icons: `CheckCircle`→`CheckCircle2`, `Error`→`XCircle`, `Warning`→`AlertTriangle`, `Info`→`Info`, `ExpandMore`→`ChevronDown`, `ChevronRight`→`ChevronRight`, `Close`→`X`, `ContentCopy`→`Copy`, `PlayArrow`→`Play`, `Stop`→`Square`, `Refresh`→`RefreshCw`, `Delete`→`Trash2`, `Search`→`Search`, `OpenInNew`→`ExternalLink`, `ArrowBack`→`ArrowLeft`, `BugReport`→`Bug`, `Code`→`Code2`, `Visibility`→`Eye`, `History`→`History`, `Settings`→`Settings`, `Science`→`FlaskConical`, `Terminal`→`Terminal`. Size with `className="size-4"`. Decorative icons get `aria-hidden="true"`.
