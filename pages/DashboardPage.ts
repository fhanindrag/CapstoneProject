import { expect, type Page } from '@playwright/test';
import { config } from '../config/appConfig';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async verifyDashboard() {
    await expect(this.page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
  }

  async searchTopRepository() {
  
    await expect(this.page.getByTestId('dynamic-side-panel-items-search-button')).toBeVisible();
    await this.page.getByRole('heading', { name: 'Top repositories Search for' }).click();
    await this.page.getByTestId('dynamic-side-panel-items-search-button').click();
    await this.page.getByTestId('dynamic-side-panel-items-search-input').fill(config.repository);
    await this.page.waitForTimeout(5000); 
    await this.page.getByTestId('dynamic-side-panel-items-item').click();
    await this.page.waitForTimeout(5000); 
  }

  async openSearchedRepository() {
   
    await expect(this.page.getByTestId('dynamic-side-panel-items-search-button')).toBeVisible();
    await this.page.getByRole('heading', { name: 'Top repositories Search for' }).click();
    await this.page.getByTestId('dynamic-side-panel-items-search-button').click();
    await this.page.getByTestId('dynamic-side-panel-items-search-input').fill(config.repository);
    await this.page.waitForTimeout(5000); 
    await this.page.getByTestId('dynamic-side-panel-items-item').click();
    await this.page.waitForTimeout(5000); 
    await expect(this.page.getByTestId('repo-name-link')).toBeVisible();
    await expect(this.page.getByTestId('repo-name-link')).toContainText(config.repository);
  }
}
