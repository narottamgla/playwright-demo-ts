# Playwright TypeScript Demo

This repository is scaffolded to demonstrate a Playwright + TypeScript test structure that separates locators, actions and steps.

Quick start

1. Install dependencies (CI / fresh machine):

```bash
npm ci
npm run playwright:install
```

2. Run tests:

```bash
npm test
```

Useful scripts

- `npm test` — run Playwright tests (headless)
- `npm run test:headed` — run tests in headed mode
- `npm run test:debug` — run tests with PWDEBUG=1

Project layout

- `src/locators` — collect selectors in one place
- `src/actions` — action helpers that talk to Playwright page
- `src/steps` — Playwright tests and steps that exercise actions

ParaBank E2E tests (example)

We also include a set of example tests for the ParaBank demo app at https://parabank.parasoft.com/.
Files added:
- `src/locators/parabank.locator.ts`
- `src/actions/parabank.actions.ts`
- `src/utils/user.util.ts` — unique username generator
- `src/steps/parabank.e2e.step.ts` — UI end-to-end flow (registration, login, open accounts, transfer, bill pay)
- `src/api/parabank.api.spec.ts` — basic API checks: homepage GET and POST registration
Notes on running the UI E2E tests

- The ParaBank demo site sometimes prevents automated registrations or is rate-limited and that can make registration flaky. The Cucumber feature will attempt to register a new, unique user when needed and then continue the flows. If you see registration failures, re-run the feature in headed mode (`PARABANK_SLOWMO`) so you can inspect the browser and site behavior interactively.

Running Cucumber features (Playwright + Cucumber)

The repository also contains a Cucumber feature at `src/features/parabank.feature` and TypeScript step definitions at `src/features/step_definitions/parabank.steps.ts`.

You can run the feature using the included script (it uses ts-node to run TypeScript step defs):

```bash
npm run cucumber
```

Note: The Cucumber step definitions launch Playwright directly and exercise the same `ParaBankActions` used by the Playwright tests. The ParaBank demo site can be flaky so runs may fail — use a headed run (see below) to directly observe site behavior when diagnosing failures.

VS Code integration (navigate from feature steps to step definitions) 🔎

If you use VS Code, I recommend installing the Cucumber autocomplete / full support extension(s) so you can:

- Jump from a Gherkin step in *.feature files directly to its step definition
- Get autocompletion for step snippets and parameter hints

Recommended extensions (VS Code will prompt to install these when you open the workspace):

- alexkrechik.cucumberautocomplete — Cucumber autocomplete & Go-to-step-definition support
- cucumber.cucumber — optional general Cucumber/gherkin support

.vscode settings in this repo point the Cucumber extension at your TypeScript step files (src/features/step_definitions/**/*.ts) so "Go to Definition" and autocomplete should work out of the box.

How to navigate from a .feature step to the step definition in VS Code

1. Open any feature file (e.g., `src/features/parabank.feature`).
2. Hover or Ctrl/Cmd+Click on the step text or right-click and choose "Go to Definition" / press F12. VS Code (with the recommended extension) should open the matching step definition in `src/features/step_definitions/*.ts`.

Run Cucumber in headed (visible browser) mode

If you want to see the browser UI while running the Cucumber scenarios, set the env var `PARABANK_SHOW_BROWSER=true` or `PWDEBUG=1`. You can also add a small slow-motion delay to make interactions easier to watch using `PARABANK_SLOWMO` (ms). Example:

```bash
export PARABANK_SHOW_BROWSER=true
export PARABANK_SLOWMO=60
npm run cucumber
```

If you prefer Playwright Test runner's headed mode, use the existing script:

```bash
npm run test:headed
```

Note: Running against the public ParaBank demo site can be flaky for automated registration. If you want to visually inspect failures or ensure the browser is actually interacting with the site, run the feature in headed mode:

```bash
export PARABANK_SLOWMO=60
npm run cucumber
```
