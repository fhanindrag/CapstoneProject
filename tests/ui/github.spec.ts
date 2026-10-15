import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../config/appConfig';

// Each test signs in separately; no shared mutable browser state.
test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login();
});

test('UI_001: Login and verify Dashboard', async ({ page }) => {
  await new DashboardPage(page).verifyDashboard();
});

test('UI_002: Search repository under Top Repositories', async ({ page }) => {
  await new DashboardPage(page).searchTopRepository();
});

test('UI_003: Open searched repository and log its name', async ({ page }) => {
  await new DashboardPage(page).openSearchedRepository();
  console.log(`Verified repository: ${config.repository}`);
});
