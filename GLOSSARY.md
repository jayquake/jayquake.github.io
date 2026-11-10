# Audit Rules

A reference and test bench for accessibility rules: what each rule checks, plus live pages that pass or fail it.

## Language

### Rules

**Engine rule**:
An automated accessibility check run by the RAIDEN audit engine, identified by a kebab-case id (e.g. `alt-misuse`).
_Avoid_: engine issue, detector

**Legacy rule**:
A rule from the older criteria-based catalogue, identified by its criteria (e.g. `forms`) and route.
_Avoid_: criteria rule, old rule

**Criteria**:
The legacy grouping a legacy rule belongs to (graphics, forms, keyboard, …).
_Avoid_: section, type

**Category**:
The grouping an engine rule belongs to in the library (e.g. ARIA & Roles).
_Avoid_: criteria (that's legacy), tag

**Impact**:
How severe an engine rule's violations are: critical, serious, moderate or minor.
_Avoid_: severity (except as the display label), priority

### Examples

**Example page**:
A live page that demonstrates one rule in one variant, used as a test fixture by auditors and automated tests.
_Avoid_: demo, sample

**Variant**:
Whether an example page should pass a rule (success) or violate it (failure).
_Avoid_: mode, type

### The library

**Library**:
The browsable catalogue of engine rules with search, filters and a rule detail panel.
_Avoid_: rules list, dashboard

**Library query**:
The reader's current search text, filters and detail-panel state in the library.
_Avoid_: filter state, search params

**Library location**:
Where the reader is in the library (home, a rule, or an example page) together with the library query.
_Avoid_: route state, URL state
