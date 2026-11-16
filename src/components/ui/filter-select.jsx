import { NativeSelect } from "./native-select";

/**
 * Library filter control — native `<select>` for full keyboard/a11y;
 * styled to match SearchField height and radius.
 */
function FilterSelect({ label, value, onChange, children }) {
  return (
    <NativeSelect aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
      {children}
    </NativeSelect>
  );
}

export { FilterSelect };