type Inputs = {
  sanityProjectId: string; // ID of the Sanity project
  sanityDatasetName: string; // Name of the Sanity dataset
  vercelProjectName: string; // Name of the Vercel project
  vercelProjectId: string; // ID of the Vercel project
  vercelDeploymentUrl: string; // URL of the Vercel deployment
  email: string; // User email
};

type Secrets = {
  VERCEL_FR_TEAM_ID: string; // ID of the Vercel team
  VERCEL_PERSONAL_AUTH_TOKEN: string; // Personal authorization token for Vercel
  SANITY_AUTH_TOKEN: string; // Authorization token for Sanity
  ROLL_OUT_API_TOKEN: string; // API token for the roll-out process
  REPO_ID: string; // ID of the repository
  REPO_PROD_BRANCH: string; // Production branch of the repository
  REPO_TYPE: string; // Type of the repository (e.g., GitHub)
  REPO_NAME: string; // Name of the repository
  REPO_WORKFLOW_ID: string; // ID of the GitHub workflow
  GITHUB_PERSONAL_ACCESS_TOKEN: string; // Personal access token for GitHub
};

type DeployParams = {
  inputs: Inputs;
  secrets: Secrets;
};

import fetch from 'node-fetch';

export async function rollOutCmsKitSanity({
  inputs,
  secrets,
}: DeployParams): Promise<void> {
  const {
    sanityProjectId,
    sanityDatasetName,
    vercelProjectName,
    vercelProjectId,
    vercelDeploymentUrl,
    email,
  } = inputs;

  const {
    VERCEL_FR_TEAM_ID,
    VERCEL_PERSONAL_AUTH_TOKEN,
    SANITY_AUTH_TOKEN,
    ROLL_OUT_API_TOKEN,
    REPO_ID,
    REPO_PROD_BRANCH,
    REPO_TYPE,
    REPO_NAME,
    REPO_WORKFLOW_ID,
    GITHUB_PERSONAL_ACCESS_TOKEN,
  } = secrets;

  console.log('Starting the roll-out process...');

  // Step 1: Add VERCEL_PROJECT_ID env to vercel project
  await fetch(
    `https://api.vercel.com/v10/projects/${vercelProjectId}/env?teamId=${VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'VERCEL_PROJECT_ID',
        value: vercelProjectId,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    },
  );

  // Step 2: Add VERCEL_PROJECT_NAME env to vercel project
  await fetch(
    `https://api.vercel.com/v10/projects/${vercelProjectId}/env?teamId=${VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'VERCEL_PROJECT_NAME',
        value: vercelProjectName,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      }),
    },
  );

  // Step 3: Add vercel deployment CORS entry to sanity
  await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/cors`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: vercelDeploymentUrl,
        allowCredentials: true,
      }),
    },
  );

  // Step 4: Invite user email to sanity project
  await fetch(
    `https://api.sanity.io/v2021-06-07/invitations/project/${sanityProjectId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        role: 'editor',
      }),
    },
  );

  // Step 5: Create new dataset
  await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/datasets/${sanityDatasetName}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
      },
    },
  );

  // Step 6: Install dependencies and export dataset
  // These steps should be done in the environment where the code is running, such as a CI pipeline

  // Step 7: Add vercel deploy hook to sanity
  await fetch(
    `https://api.sanity.io/v2021-10-04/hooks/projects/${sanityProjectId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'document',
        name: 'Sanity Studio',
        url: `https://${vercelProjectName}.vercel.app/api/roll-out/deploy`,
        httpMethod: 'POST',
        apiVersion: 'v2021-03-25',
        includeDrafts: false,
        dataset: '*',
        rule: {
          on: ['create', 'update', 'delete'],
        },
        headers: {
          Authorization: `Bearer ${ROLL_OUT_API_TOKEN}`,
        },
      }),
    },
  );

  // Step 8: Trigger vercel initial deployment
  await fetch(
    `https://api.vercel.com/v13/deployments?teamId=${VERCEL_FR_TEAM_ID}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_PERSONAL_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: vercelProjectName,
        project: vercelProjectId,
        target: 'production',
        gitSource: {
          repoId: REPO_ID,
          ref: REPO_PROD_BRANCH,
          type: REPO_TYPE,
        },
      }),
    },
  );

  console.log('Roll-out process completed successfully.');
}
