# `sdk/` layout

```
sdk/
├── packages/          # SDK artifacts (.tgz, .whl, .jar)
│   └── node/          # @acsbe/accessflow-sdk-*.tgz
└── tests/
    ├── playwright/
    │   ├── node/      # ← JS Playwright (local demo lives here)
    │   ├── python/
    │   └── java/
    └── selenium/
        ├── node/      # JS Selenium + Jest
        ├── python/
        └── java/
```

**Run tests from:** [`tests/README.md`](tests/README.md) (`cd sdk/tests`)

**Local JS Playwright entry point:** [`tests/playwright/node/LOCAL.md`](tests/playwright/node/LOCAL.md)

**Demo test file:** `tests/playwright/node/tests/sdk-local-demo.spec.js`

Credentials and registry setup: repository root `.env` + `.env.example`.