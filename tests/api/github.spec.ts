import { test, expect } from '@playwright/test';
import { GitHubService } from '../../services/GitHubService';

test('API_001: Authenticate using token and verify GitHub user',
    async ({ playwright }) => {

        const apiContext = await playwright.request.newContext({
            ignoreHTTPSErrors: true
        });

        try {
            const githubService = new GitHubService(apiContext);

            const response = await githubService.getAuthenticatedUser();

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.login).toBe('Fhanigituser');

        } finally {
            await apiContext.dispose();
        }
    }
);