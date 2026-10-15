# GitHub UI + API Playwright TypeScript Framework

## Purpose
Three UI tests against github.com (login, search Top repositories, open repo) and one API test using GitHub REST API `GET /user`. UI automation uses Page Object Model; API calls use a Service Layer. JSON contains non-secret test data; `.env`/GitHub Secrets contain credentials.

## Setup (Windows CMD / VS Code)

1. `npm install`
2. `npx playwright install chromium`
3. Copy `.env.example` to `.env`, then set `GITHUB_PASSWORD` and `GITHUB_TOKEN`. Do not commit `.env`.
4. `npm run test:headed` for 3 UI tests; `npm run test:api` for 1 API test; `npm test` for all four.
5. `npm run report` to open the HTML report.

## Commands

- `npm run test:ui` — all three UI tests
- `npm run test:headed` — UI tests in visible Chromium
- `npm run test:api` — API token authentication test
- `npx playwright test -g "UI_001" --headed` — first UI test only
- `npx playwright test -g "UI_002" --headed` — second UI test only
- `npx playwright test -g "UI_003" --headed` — third UI test only
- `npm test` — all tests
- `npm run typecheck` — TypeScript static validation
- `npm run report` — HTML report

## GitHub Actions

Push to `main` or use Actions > GitHub Playwright UI API > Run workflow. Configure repository secrets under Settings > Secrets and variables > Actions:

- `TEST_GITHUB_PASSWORD` — password for a dedicated test account
- `TEST_GITHUB_TOKEN` — personal access token authorized to read the test account's profile via GET /user

The test account must have access to the `demosession1212` repository. The dashboard sidebar and login UI can change; inspect live DOM if the Top repositories search selector changes. GitHub may require MFA, device verification or CAPTCHA; do not bypass those protections. For reliable CI, use an approved dedicated test account and appropriate authentication strategy. GitHub Actions may restrict access to secrets in pull requests from forks.

## API login clarification

GitHub has no supported username/password REST login endpoint. The API test validates token-based authentication via `GET https://api.github.com/user`. A token must be generated separately in GitHub account settings and stored securely.

## Framework walkthrough

- `config/appConfig.ts`: URLs, username, environment secrets.
- `data/testData.json`: non-secret test inputs.
- `pages/`: UI locators and reusable UI actions.
- `services/`: REST API calls.
- `tests/ui`: 3 UI scenarios.
- `tests/api`: 1 API scenario.
- `playwright.config.ts`: browser, retries, screenshots, traces and reporting.
- `.github/workflows/playwright.yml`: CI automation and report upload.

## Notes

Never store real account passwords in source control. If a password has been shared outside a trusted channel, rotate it. Live GitHub login and dashboard behavior may vary by account, session, MFA, or GitHub UI changes. CI may fail for reasons outside test code when interactive login verification is required.
