# OrangeHRM Demo — Playwright + TypeScript Automation Suite

End-to-end test automation for the [OrangeHRM OpenSource Demo](https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index),
built with **Playwright + TypeScript** using the **Page Object Model (POM)**.

## Coverage

| Module                  | Spec file             | Page Object(s)           | Scenarios                                                                                                       |
| ----------------------- | --------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Login                   | `tests/login.spec.ts` | `LoginPage`              | Login with valid credentials, lands on dashboard                                                                |
| Admin — User Management | `tests/user.spec.ts`  | `LoginPage`, `AdminPage` | Add user, search by username, search by role, search by employee name, no-results state, delete user, edit user |

> Only `login.spec.ts` and `user.spec.ts` exist today. `DashboardPage` and `BasePage` are already scaffolded (spinner
> wait, toast helper, logout, sidebar navigation) but not yet exercised by a dedicated `dashboard.spec.ts`.

## 1. Folder Structure

```
orangehrm-automation/
├── playwright.config.ts        # Playwright runner config (projects, timeouts, reporters)
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example                 # copy to .env and fill in credentials
├── .gitignore
├── .github/workflows/playwright.yml   # CI pipeline (currently commented out, see below)
├── src/
│   ├── pages/                   # Page Object Model
│   │   ├── BasePage.ts          # shared helpers: spinner wait, toast, logout
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   └── AdminPage.ts
│   ├── data/
│   │   └── testData.ts          # credentials, fixtures data, generators
│   └── utils/
│       └── fixtures.ts          # custom Playwright fixtures (loginPage, dashboardPage, adminPage, loggedInPage)
└── tests/
    ├── login.spec.ts
    └── user.spec.ts
```

## 2. Dependencies

- **Node.js 20+** (required by `@playwright/test` 1.62)
- **npm** (bundled with Node)

Installed via `npm install` (declared in `package.json`):

- `@playwright/test` — test runner + browser automation
- `typescript`, `@types/node` — TypeScript support
- `dotenv` — load `.env` credentials

## 3. Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser binaries
npx playwright install --with-deps

# 3. Configure credentials
cp .env.example .env
# .env already defaults to the public demo creds: Admin / admin123
```

## 4. Running Tests

```bash
npm test                    # run all tests, headless
npm run test:headed         # run with visible browser
npm run test:ui             # open Playwright's interactive UI mode
npm run test:debug          # step-through debug mode

# Run a single spec
npm run test:login
npm run test:admin          # NOTE: currently points to tests/admin.spec.ts, which
                             # does not exist yet — update to tests/user.spec.ts or
                             # rename the spec file to match

# Run by browser
npm run test:chromium       # active project
npm run test:firefox        # project is commented out in playwright.config.ts
npm run test:webkit         # project is commented out in playwright.config.ts

# View the last HTML report
npm run report
```

Only the `chromium` project is enabled in `playwright.config.ts`. The `firefox`, `webkit`, and `mobile-chrome`
projects are present but commented out — uncomment them there before the corresponding npm scripts will do
anything useful.

## 5. Configuration Notes

- **Base URL**: `https://opensource-demo.orangehrmlive.com`, overridable via `BASE_URL` in `.env`.
- **Timeouts**: 45s per test, 10s default expect timeout, 15s action timeout, 30s navigation timeout.
- **Parallelism**: `fullyParallel` is disabled because the shared public demo dataset can cause race conditions
  (e.g., two tests creating a user with the same name at once). Safe to enable if you point this at your own
  dedicated OrangeHRM instance.
- **Workers**: 2 in CI, 3 locally.
- **Retries**: 1 in CI, 0 locally.
- **Reporters**: HTML (`playwright-report/`), list, and JSON (`test-results/results.json`).
- **Artifacts on failure**: trace, screenshot, and video are all retained.

## 6. Notes on the Demo Environment

- The public demo is a **shared, publicly reset environment** — data created by other users/testers may appear
  alongside yours. Prefer generating unique data (see `uniqueSuffix()` / `newUser()` in `src/data/testData.ts`)
  over asserting a clean dataset.
- Some selectors (dropdown option text, exact toast wording, nth-based locators in `AdminPage.ts`) may need
  adjustment if OrangeHRM updates its UI, or if the underlying data (e.g. the hard-coded employee "Charles Carter")
  changes on the demo instance. Run `npm run codegen` to quickly re-record a drifted selector.

## 7. Known Gaps / TODO

- `test:dashboard` and `test:admin` npm scripts reference spec files (`tests/dashboard.spec.ts`,
  `tests/admin.spec.ts`) that don't exist yet — the real admin coverage currently lives in `tests/user.spec.ts`.
- No dedicated `dashboard.spec.ts` exercises `DashboardPage` yet, despite the page object being implemented.

## 8. Extending

- Add new modules by creating a Page Object in `src/pages/`, registering it as a fixture in `src/utils/fixtures.ts`,
  and adding a spec file in `tests/`.
- Add new test data generators to `src/data/testData.ts` to keep specs declarative.
