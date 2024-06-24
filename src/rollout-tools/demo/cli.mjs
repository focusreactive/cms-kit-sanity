#!/usr/bin/env node

import { localFlow } from './localFlow.mjs';
import {
  fetchSanityOrganizations,
  fetchSanityUserInfo,
} from '../local/fetchSanityOrganizations.mjs';
import {
  fetchVercelTeams,
  fetchVercelUserInfo,
} from '../local/fetchVercelTeams.mjs';
import ora from 'ora';

if (process.env.GITHUB_ACTIONS !== 'true') {
  console.warn(
    'Warning: You are running this script locally. This script is intended to be run in a GitHub Actions environment.',
  );
  process.exit(1);
}

// Check required environment variables
const requiredEnvVars = [
  'VERCEL_PERSONAL_AUTH_TOKEN',
  'SANITY_PERSONAL_AUTH_TOKEN',
  'SANITY_ORGANIZATION_ID',
  'VERCEL_FR_TEAM_ID',
  'PROJECT_NAME',
  'NEXT_PUBLIC_SANITY_DATASET',
  'MAX_NUMBER_OF_PROJECTS',
  'EMAIL',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Extract necessary environment variables
const email = process.env.EMAIL;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const sanityDatasetName = process.env.NEXT_PUBLIC_SANITY_DATASET;
const vercelProjectName = process.env.PROJECT_NAME;
const vercelToken = process.env.VERCEL_PERSONAL_AUTH_TOKEN;
const sanityToken = process.env.SANITY_PERSONAL_AUTH_TOKEN;

// Fetch user and team information
const vercelUserInfo = await fetchVercelUserInfo(vercelToken);
const vercelTeams = await fetchVercelTeams(vercelToken);
const sanityUserInfo = await fetchSanityUserInfo(sanityToken);
const sanityOrganizations = await fetchSanityOrganizations(sanityToken);

// Ensure necessary data is present
if (!sanityProjectId) {
  console.error('Sanity project ID is missing');
  process.exit(1);
}

// Define secrets and inputs for localFlow
const secrets = {
  VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
  VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
  SANITY_PERSONAL_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
  SANITY_ORGANIZATION_ID: process.env.SANITY_ORGANIZATION_ID,
  ROLL_OUT_API_TOKEN: process.env.ROLL_OUT_API_TOKEN,
  REPO_ID: process.env.REPO_ID,
  REPO_PROD_BRANCH: process.env.REPO_PROD_BRANCH,
  REPO_TYPE: process.env.REPO_TYPE,
};

const inputs = {
  email,
  'sanity-project-id': sanityProjectId,
  'sanity-dataset-name': sanityDatasetName,
  'vercel-project-name': vercelProjectName,
  'vercel-project-id': '',
  'vercel-deployment-url': '',
};

const main = async () => {
  try {
    const summary = await localFlow({ inputs, secrets });

    if (summary) {
      console.table(summary);
      ora().succeed(
        'All projects have been successfully set up and configured! 🎉\n',
      );
      ora().info('Here are the details:');
      console.log(`- Deployed website: ${summary.deploymentUrl}`);
      console.log(`- Sanity Studio: ${summary.studioUrl}`);
      console.log(`- Vercel Project: ${summary.vercelUrl}`);
      console.log(`- Sanity Project: ${summary.sanityUrl}\n`);

      ora().info('The next commands you should use:');
      console.log('> pnpm run build - to build the project locally');
      console.log('> pnpm run dev - to start the dev server');
    }
  } catch (error) {
    ora().fail('An error occurred');
    console.error(error);
  }
};

main();
