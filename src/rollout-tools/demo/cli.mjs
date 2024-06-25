#!/usr/bin/env node

import fetch from 'node-fetch';
import { exec } from 'child_process';
import crypto from 'crypto';

import {
  createSanityProject,
  createSanityReadToken,
  getVercelProjects,
} from '../local/services.mjs';
import { createVercelProject } from './services.mjs';
import { isValidEmail } from '../local/email.mjs';

const CMS_KIT_INTEGRATION = 'sanity';

if (process.env.GITHUB_ACTIONS !== 'true') {
  console.warn(
    'Warning: You are running this script locally. This script is intended to be run in a GitHub Actions environment.',
  );
  process.exit(1);
}

const secrets = {
  VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
  SANITY_PERSONAL_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
  SANITY_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
  ROLL_OUT_API_TOKEN: crypto.randomBytes(20).toString('hex'),
};

const inputs = {
  SANITY_ORGANIZATION_ID: process.env.SANITY_ORGANIZATION_ID,
  VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
  VERCEL_FR_TEAM_SLUG: process.env.VERCEL_FR_TEAM_SLUG,
  PROJECT_NAME: process.env.PROJECT_NAME,
  PROJECT_PREFIX: process.env.PROJECT_PREFIX,
  MAX_NUMBER_OF_PROJECTS: process.env.MAX_NUMBER_OF_PROJECTS,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  REPO_ID: process.env.REPO_ID,
  REPO_NAME: process.env.REPO_NAME,
  REPO_PROD_BRANCH: process.env.REPO_PROD_BRANCH,
  REPO_TYPE: process.env.REPO_TYPE,
};

const optional = {
  EMAIL: process.env.EMAIL,
};

const requiredEnvVars = Object.keys({ ...secrets, ...inputs });

requiredEnvVars.forEach((envVar) => {
  if (!{ ...secrets, ...inputs }[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

inputs.EMAIL = optional.EMAIL;

async function localRollout({ inputs, secrets }) {
  const {
    EMAIL: email,
    PROJECT_NAME: projectName,
    PROJECT_PREFIX: projectPrefix,
    NEXT_PUBLIC_SANITY_DATASET: datasetName,
    VERCEL_FR_TEAM_SLUG: selectedTeamSlug,
    SANITY_ORGANIZATION_ID: selectedOrgID,
  } = inputs;

  const summary = {};

  let username = 'i';

  if (email) {
    if (!(email && isValidEmail(email))) {
      console.error('Email is not valid');
      return;
    }

    username = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // prevent forbidden symbols
      .replace(/\./g, '') // prevent forbidden symbols
      .slice(0, 50); // prevent project name from being too long
  }

  const nameId = `${Math.round(Math.random() * 899 + 100)}`;
  const finalProjectName = `${projectPrefix}-${username}-${nameId}-${projectName}`;

  summary.username = username;
  summary.email = email;
  summary.finalProjectName = finalProjectName;

  console.log('Username: ' + username);
  console.log('Email: ' + email);
  console.log('Final Project Name (Sanity): ' + finalProjectName);

  console.log('Fetching existing Vercel projects...');
  const existingProjects = await getVercelProjects();
  console.log('Fetched existing Vercel projects.');

  const allowToCreateProject =
    existingProjects &&
    existingProjects.length < parseInt(inputs.MAX_NUMBER_OF_PROJECTS || '5');

  const existingProject = existingProjects?.find(
    (project) => project.name === finalProjectName,
  );

  if (!allowToCreateProject) {
    console.error('Limit of the projects reached');
    return;
  }
  if (existingProject) {
    console.error('Project with this email already exists');
    console.log('Existing Projects:', existingProjects);
    return;
  }

  console.log('Creating Sanity project...');
  const sanityProjectId = await createSanityProject(finalProjectName);

  if (!sanityProjectId) {
    console.error('Failed to create Sanity project.');
    process.exit(1);
  }
  console.log('Sanity project created...');

  summary.sanityProjectId = sanityProjectId;
  console.log('Sanity Project ID: ' + sanityProjectId);

  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = sanityProjectId;

  console.log('Creating Sanity read token...');
  const sanityReadToken = await createSanityReadToken(sanityProjectId);
  console.log('Sanity read token created.');

  console.log('Creating Vercel project...');
  const projectData = await createVercelProject({
    sanityReadToken: sanityReadToken,
    projectName: finalProjectName,
    sanityProjectId,
    sanityDatasetName: datasetName,
    repoName: inputs.REPO_NAME,
    vercelPersonalAuthToken: secrets.VERCEL_PERSONAL_AUTH_TOKEN,
    vercelFrTeamId: inputs.VERCEL_FR_TEAM_ID,
    email,
    cmsKitIntegration: CMS_KIT_INTEGRATION,
  });

  if (!projectData?.projectId) {
    console.error('Failed to create Vercel project.');
    process.exit(1);
  }
  console.log('Vercel project created.');

  summary.projectName = projectData.projectName;
  summary.projectId = projectData.projectId;
  summary.deploymentUrl = projectData.deploymentUrl;
  summary.studioUrl = `${projectData.deploymentUrl}/admin`;
  summary.vercelUrl = `https://vercel.com/${selectedTeamSlug}/${projectData.projectName}`;
  summary.sanityUrl = `https://www.sanity.io/organizations/${selectedOrgID}/project/${sanityProjectId}`;
  summary.datasetName = datasetName;
  summary.REPO_NAME = inputs.REPO_NAME;

  console.log('Vercel Project Name: ' + projectData.projectName);
  console.log('Vercel Project ID: ' + projectData.projectId);
  console.log('Deployment URL: ' + projectData.deploymentUrl);
  console.log('Sanity Studio: ' + summary.studioUrl);
  console.log('Sanity Dataset Name: ' + datasetName);
  console.log('Repo Name: ' + inputs.REPO_NAME);

  console.log('Starting local flow...\n\n');

  // Step 1: Add envs to Vercel project
  console.log('Adding environment variables to Vercel project...');
  await fetch(
    `https://api.vercel.com/v10/projects/${projectData.projectId}/env?teamId=${secrets.VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'VERCEL_PROJECT_ID',
        value: projectData.projectId,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    },
  );

  await fetch(
    `https://api.vercel.com/v10/projects/${projectData.projectId}/env?teamId=${secrets.VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'VERCEL_PROJECT_NAME',
        value: projectData.projectName,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    },
  );
  console.log('Environment variables added to Vercel project.');

  // Step 2: Add Sanity CORS entry
  console.log('Adding Sanity CORS entry...');
  await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/cors`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.SANITY_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: projectData.deploymentUrl,
        allowCredentials: true,
      }),
    },
  );

  await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/cors`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.SANITY_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: 'http://localhost:3000/',
        allowCredentials: true,
      }),
    },
  );
  console.log('Sanity CORS entry added.');

  // Step 3: Invite user to Sanity project
  console.log('Inviting user to Sanity project...');
  if (email) {
    await fetch(
      `https://api.sanity.io/v2021-06-07/invitations/project/${sanityProjectId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_PERSONAL_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          role: 'editor',
        }),
      },
    );
    console.log('User invited to Sanity project.');
  } else {
    console.log(`Email isn't provided. Skip adding user`);
  }

  // Step 4: Create a new Sanity dataset
  console.log('Creating a new Sanity dataset...');
  await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/datasets/${datasetName}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${secrets.SANITY_PERSONAL_AUTH_TOKEN}`,
      },
    },
  );
  console.log('New Sanity dataset created.');

  // Step 5: Fill the dataset with data from prod-copy.tar.gz
  console.log('Filling the dataset with data from prod-copy.tar.gz...');
  await new Promise((resolve, reject) => {
    exec(
      `SANITY_AUTH_TOKEN=${secrets.SANITY_PERSONAL_AUTH_TOKEN} npx sanity dataset import initial-data.tar.gz ${datasetName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error importing dataset: ${stderr}`);
          return reject(error);
        }
        console.log(`Dataset imported: ${stdout}`);
        resolve();
      },
    );
  });

  // Step 6: Add deploy hook(/api/roll-out/deploy) to Sanity project
  console.log('Adding deploy hook to Sanity project...');
  await fetch(
    `https://api.sanity.io/v2021-10-04/hooks/projects/${sanityProjectId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.SANITY_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'document',
        name: 'Sanity Studio',
        url: `https://${projectData.projectName}.vercel.app/api/roll-out/deploy`,
        httpMethod: 'POST',
        apiVersion: 'v2021-03-25',
        includeDrafts: false,
        dataset: '*',
        rule: {
          on: ['create', 'update', 'delete'],
        },
        headers: {
          Authorization: `Bearer ${secrets.ROLL_OUT_API_TOKEN}`,
        },
      }),
    },
  );
  console.log('Deploy hook added to Sanity project.');

  // Step 7: Create a new Vercel deployment
  console.log('Creating a new Vercel deployment...');
  const body = {
    name: projectData.projectName,
    project: projectData.projectId,
    target: 'production',
    gitSource: {
      repoId: inputs.REPO_ID,
      ref: inputs.REPO_PROD_BRANCH,
      type: 'github',
    },
  };
  const response = await fetch(
    `https://api.vercel.com/v13/deployments?teamId=${inputs.VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secrets.VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const data = await response.json();
  summary.buildInspectorUrl = data.inspectorUrl;
  console.log('New Vercel deployment created.');

  console.log('All steps were successful 🎉\n\n');
  return summary;
}

async function main() {
  try {
    const summary = await localRollout({ inputs, secrets });

    if (summary) {
      console.log(
        'All projects have been successfully set up and configured! 🎉\n',
      );
      console.log('Here are the details:');
      console.log(`- Deployed website: ${summary.deploymentUrl}`);
      console.log(`- Sanity Studio: ${summary.studioUrl}`);
      console.log(`- Vercel Project: ${summary.vercelUrl}`);
      console.log(`- Sanity Project: ${summary.sanityUrl}\n`);
      console.log(
        `\n- Sanity Visual Editing: ${summary.sanityUrl}/presentation/landing/36643ba6-5775-4cf5-b729-ccd85c8a3fcc?preview=/home\n`,
      );
      console.log(`- Vercel Build Inspect: ${summary.buildInspectorUrl}\n`);

      console.log('The next commands you should use:');
      console.log('> pnpm run build - to build the project locally');
      console.log('> pnpm run dev - to start the dev server');
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
}

main();
