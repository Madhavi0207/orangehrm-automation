# OrangeHRM Demo — Playwright + TypeScript Automation Suite

End-to-end test automation for the [OrangeHRM OpenSource Demo](https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index),
built with **Playwright + TypeScript** using the **Page Object Model (POM)**.

## Coverage

| Module | File | Scenarios |
|---|---|---|
| Login | `tests/login.spec.ts` | Valid/invalid login, required-field validation, logout, forgot password, basic injection check |
| Dashboard | `tests/dashboard.spec.ts` | Load & header check, widgets, quick launch, sidebar navigation, session persistence, auth redirect |
| Admin | `tests/admin.spec.ts` | Load page, search user, no-results state, reset filters, create user, field validation, cancel, delete user |
| PIM | `tests/pim.spec.ts` | Load employee list, add employee, search employee, no-results state, reset filters, validation |
| Leave | `tests/leave.spec.ts` | Load module, Apply tab, apply for leave, Leave List tab, validation, My Leave tab |

Tags used: `@smoke`, `@critical`, `@negative`, `@security` — filter with `--grep`.

## 1. Folder Structure

```
orangehrm-automation/
├── playwright.config.ts        # Playwright runner config (projects, timeouts, reporters)
├── package.json
├── tsconfig.json
├── .env.example                 # copy to .env and fill in credentials
├── .gitignore
├── .github/workflows/playwright.yml   # CI pipeline (GitHub Actions)
├── src/
│   ├── pages/                   # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── AdminPage.ts
│   │   ├── PIMPage.ts
│   │   └── LeavePage.ts
│   ├── data/
│   │   └── testData.ts          # credentials, fixtures data, generators
│   └── utils/
│       └── fixtures.ts          # custom Playwright fixtures (auto-login, POM injection)
└── tests/
    ├── login.spec.ts
    ├── dashboard.spec.ts
    ├── admin.spec.ts
    ├── pim.spec.ts
    └── leave.spec.ts
```

## 2. Dependencies

- **Node.js 18+** (20 LTS recommended)
- **npm** (bundled with Node)

Installed via `npm install` (already declared in `package.json`):

- `@playwright/test` — test runner + browser automation
- `typescript`, `@types/node` — TypeScript support
- `dotenv` — load `.env` credentials

## 3. Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browser binaries (Chromium, Firefox, WebKit)
npx playwright install --with-deps

# 3. Configure credentials
cp .env.example .env
# .env already defaults to the public demo creds: Admin / admin123
```

## 4. Running Tests

```bash
npm test                    # run all tests, all browsers, headless
npm run test:headed         # run with visible browser
npm run test:ui             # open Playwright's interactive UI mode
npm run test:debug          # step-through debug mode

# Run a single module
npm run test:login
npm run test:dashboard
npm run test:admin
npm run test:pim
npm run test:leave

# Run by browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @critical

# View the last HTML report
npm run report
```

## 5. Notes on the Demo Environment

- The public demo (https://opensource-demo.orangehrmlive.com) is a **shared, publicly reset environment** — data
  created by other users/testers may appear alongside yours. Tests are written to search for records they created
  themselves (using timestamp-suffixed usernames/names) rather than assuming a clean dataset.
- `fullyParallel` is disabled in `playwright.config.ts` because the shared demo dataset can cause race conditions
  (e.g., two parallel tests creating a user with the same name). Increase parallelism safely if you point this at
  your own dedicated OrangeHRM instance.
- Some selectors (e.g., dropdown option text, exact toast wording) may need minor adjustment if OrangeHRM updates
  its UI — this is normal for any UI test suite pointed at a live third-party site. Run `npm run codegen` to
  quickly re-record any selector that drifts.
- CI workflow (`.github/workflows/playwright.yml`) runs on push/PR and nightly, uploading the HTML report as a
  build artifact.

## 6. Extending

- Add new modules by creating a Page Object in `src/pages/`, registering it in `src/utils/fixtures.ts`, and adding
  a spec file in `tests/`.
- Add new test data generators to `src/data/testData.ts` to keep specs declarative.
