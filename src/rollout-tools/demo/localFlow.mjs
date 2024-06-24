import { exec } from 'child_process';
import ora from 'ora';

export async function localFlow({ inputs, secrets }) {
  const vercelProjectId = inputs['vercel-project-id'] || '';
  const vercelProjectName = inputs['vercel-project-name'];
  const sanityProjectId = inputs['sanity-project-id'];
  const sanityDatasetName = inputs['sanity-dataset-name'];
  const vercelDeploymentUrl = inputs['vercel-deployment-url'];
  const email = inputs['email'];

  // Step 1: Add envs to Vercel project
  const step1Spinner = ora(
    'Adding environment variables to Vercel project...',
  ).start();
  try {
    await fetch(
      `https://api.vercel.com/v10/projects/${vercelProjectId}/env?teamId=${secrets.VERCEL_FR_TEAM_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.VERCEL_PERSONAL_AUTH_TOKEN}`,
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

    await fetch(
      `https://api.vercel.com/v10/projects/${vercelProjectId}/env?teamId=${secrets.VERCEL_FR_TEAM_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.VERCEL_PERSONAL_AUTH_TOKEN}`,
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
    step1Spinner.succeed('Environment variables added to Vercel project.');
  } catch (error) {
    step1Spinner.fail('Failed to add environment variables to Vercel project.');
    throw error;
  }

  // Step 2: Add Sanity CORS entry
  const step2Spinner = ora('Adding Sanity CORS entry...').start();
  try {
    await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/cors`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: vercelDeploymentUrl,
          allowCredentials: true,
        }),
      },
    );

    await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/cors`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: 'http://localhost:3000/',
          allowCredentials: true,
        }),
      },
    );
    step2Spinner.succeed('Sanity CORS entry added.');
  } catch (error) {
    step2Spinner.fail('Failed to add Sanity CORS entry.');
    throw error;
  }

  // Step 3: Invite user to Sanity project
  const step3Spinner = ora('Inviting user to Sanity project...').start();
  try {
    await fetch(
      `https://api.sanity.io/v2021-06-07/invitations/project/${sanityProjectId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          role: 'editor',
        }),
      },
    );
    step3Spinner.succeed('User invited to Sanity project.');
  } catch (error) {
    step3Spinner.fail('Failed to invite user to Sanity project.');
    throw error;
  }

  // Step 4: Create a new Sanity dataset
  const step4Spinner = ora('Creating a new Sanity dataset...').start();
  try {
    await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${sanityProjectId}/datasets/${sanityDatasetName}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_AUTH_TOKEN}`,
        },
      },
    );
    step4Spinner.succeed('New Sanity dataset created.');
  } catch (error) {
    step4Spinner.fail('Failed to create a new Sanity dataset.');
    throw error;
  }

  // Step 5: Fill the dataset with data from prod-copy.tar.gz
  console.log('\nFilling the dataset with data from prod-copy.tar.gz...\n');
  try {
    await new Promise((resolve, reject) => {
      exec(
        `SANITY_AUTH_TOKEN=${secrets.SANITY_AUTH_TOKEN} npx sanity dataset import initial-data.tar.gz ${sanityDatasetName}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error importing dataset: ${stderr}`);
            return reject(error);
          }
          console.log(`\n\nDataset imported: ${stdout}`);
          resolve();
        },
      );
    });
  } catch (error) {
    console.error('Failed to fill the dataset with data.');
    throw error;
  }

  // Step 6: Add deploy hook(/api/roll-out/deploy) to Sanity project
  const step6Spinner = ora('Adding deploy hook to Sanity project...').start();
  try {
    await fetch(
      `https://api.sanity.io/v2021-10-04/hooks/projects/${sanityProjectId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.SANITY_AUTH_TOKEN}`,
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
            Authorization: `Bearer ${secrets.ROLL_OUT_API_TOKEN}`,
          },
        }),
      },
    );
    step6Spinner.succeed('Deploy hook added to Sanity project.');
  } catch (error) {
    step6Spinner.fail('Failed to add deploy hook to Sanity project.');
    throw error;
  }

  // Step 7: Create a new Vercel deployment
  const step7Spinner = ora('Creating a new Vercel deployment...').start();
  try {
    const body = {
      name: vercelProjectName,
      project: vercelProjectId,
      target: 'production',
      gitSource: {
        repoId: secrets.REPO_ID,
        ref: secrets.REPO_PROD_BRANCH,
        type: 'github',
      },
    };
    const response = await fetch(
      `https://api.vercel.com/v13/deployments?teamId=${secrets.VERCEL_FR_TEAM_ID}`,
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
    step7Spinner.succeed('New Vercel deployment created.');
  } catch (error) {
    step7Spinner.fail('Failed to create a new Vercel deployment.');
    throw error;
  }

  return true;
}
