import { expect, type Page } from '@playwright/test';
import { config } from '../config/appConfig';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login() {
    if (!config.password) throw new Error('GITHUB_PASSWORD is missing. Set it in .env or GitHub Actions secrets.');
    await this.page.goto('/login');
    await this.page.locator('#login_field').fill(config.username);
    await this.page.locator('#password').fill(config.password);
    await this.page.locator('input[name="commit"]').click();
    // GitHub can require CAPTCHA, 2FA or device verification. Complete those manually if prompted.
    await expect(this.page).toHaveURL(/github\.com\/(?!login(?:\?|$))/, { timeout: 30_000 });
  }
}
