import type { APIRequestContext } from '@playwright/test';
import { config } from '../config/appConfig';

export class GitHubService {
  constructor(private readonly request: APIRequestContext) {}

  async getAuthenticatedUser() {
    if (!config.token) throw new Error('GITHUB_TOKEN is missing. GitHub REST API does not support username/password login.');
    return this.request.get(`${config.apiBaseUrl}/user`, {
      headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
    });
  }
}
