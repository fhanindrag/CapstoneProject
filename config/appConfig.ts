import 'dotenv/config';
import testData from '../data/testData.json';

export const config = {
  ...testData.github,
  password: process.env.GITHUB_PASSWORD ?? '',
  token: process.env.GITHUB_TOKEN ?? '',
  repoOwner: process.env.GITHUB_REPO_OWNER || testData.github.username,
};
