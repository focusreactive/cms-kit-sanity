import ora from 'ora';
import inquirer from 'inquirer';
import {
  createSanityProject,
  createVercelProject,
  getVercelProjects,
  createSanityReadToken,
} from './services.mjs';
import { isValidEmail } from './email.mjs';
import { loadEnvVariables, appendOrUpdateEnv } from './loadEnvVariables.mjs';
import { localFlow } from './localFlow.mjs';

export function checkEnvVariables(envVars) {
  loadEnvVariables();
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      ora(`Missing environment variable: ${envVar}`).fail();
      process.exit(1);
    }
  });
}

export async function localRollout({ inputs, secrets }) {
  loadEnvVariables();
  const { email, projectName, datasetName } = inputs;
  const summary = {};

  try {
    if (email && isValidEmail(email)) {
      const username = email
        .split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // prevent forbidden symbols
        .slice(0, 90); // prevent project name from being too long
      const finalProjectName = `${username}-${projectName}`;

      summary.username = username;
      summary.email = email;
      summary.finalProjectName = finalProjectName;

      console.log(`\n${ora().succeed('Username: ' + username)}`);
      console.log(`\n${ora().succeed('Email: ' + email)}`);
      console.log(
        `\n${ora().succeed('Final Project Name (Sanity): ' + finalProjectName)}`,
      );

      // Check if NEXT_PUBLIC_SANITY_PROJECT_ID is already set
      const existingSanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      if (existingSanityProjectId) {
        const { createNewProject } = await inquirer.prompt({
          type: 'confirm',
          name: 'createNewProject',
          message:
            'A Sanity project is already created. Do you want to create a new project?',
          default: false,
        });
        if (!createNewProject) {
          ora('Using existing Sanity project ID.').info();
          summary.sanityProjectId = existingSanityProjectId;
          console.table(summary);
          return;
        }
      }

      const existingProjectsSpinner = ora(
        'Fetching existing Vercel projects...',
      ).start();
      const existingProjects = await getVercelProjects();
      existingProjectsSpinner.succeed('Fetched existing Vercel projects.');

      const allowToCreateProject =
        existingProjects &&
        existingProjects.length <
          parseInt(secrets.MAX_NUMBER_OF_PROJECTS || '5');
      const existingProject = existingProjects?.find(
        (project) => project.name === finalProjectName,
      );

      if (allowToCreateProject && !existingProject) {
        const sanityProjectSpinner = ora('Creating Sanity project...').start();
        const sanityProjectId = await createSanityProject(finalProjectName);
        if (sanityProjectId) {
          // Save new Sanity project ID to .env and update environment
          appendOrUpdateEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', sanityProjectId);
          process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = sanityProjectId;
          sanityProjectSpinner.succeed('Sanity project created.');
          summary.sanityProjectId = sanityProjectId;
          console.log(
            `\n${ora().succeed('Sanity Project ID: ' + sanityProjectId)}`,
          );

          const sanityReadTokenSpinner = ora(
            'Creating Sanity read token...',
          ).start();
          const sanityReadToken = await createSanityReadToken(sanityProjectId);
          sanityReadTokenSpinner.succeed('Sanity read token created.');

          const vercelProjectSpinner = ora(
            'Creating Vercel project...',
          ).start();
          const projectData = await createVercelProject({
            sanityReadToken: sanityReadToken || '',
            projectName: finalProjectName,
            sanityProjectId,
            sanityDatasetName: datasetName,
          });
          vercelProjectSpinner.succeed('Vercel project created.');

          if (projectData) {
            summary.projectName = projectData.projectName;
            summary.projectId = projectData.projectId;
            summary.deploymentUrl = projectData.deploymentUrl;
            summary.datasetName = datasetName;
            summary.REPO_NAME = process.env.REPO_NAME;

            console.log(
              `\n${ora().succeed('Vercel Project Name: ' + projectData.projectName)}`,
            );
            console.log(
              `\n${ora().succeed('Vercel Project ID: ' + projectData.projectId)}`,
            );
            console.log(
              `\n${ora().succeed('Deployment URL: ' + projectData.deploymentUrl)}`,
            );
            console.log(
              `\n${ora().succeed('Sanity Dataset Name: ' + datasetName)}`,
            );
            console.log(
              `\n${ora().succeed('Repo Name: ' + process.env.REPO_NAME)}`,
            );

            const localFlowSpinner = ora('Starting local flow...').start();
            const result = await localFlow({
              inputs: {
                'sanity-project-id': sanityProjectId,
                'sanity-dataset-name': datasetName,
                'vercel-project-id': projectData.projectId,
                'vercel-project-name': projectData.projectName,
                'vercel-deployment-url': projectData.deploymentUrl,
                email,
              },
              secrets: {
                VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
                VERCEL_PERSONAL_AUTH_TOKEN:
                  process.env.VERCEL_PERSONAL_AUTH_TOKEN,
                SANITY_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
                ROLL_OUT_API_TOKEN: process.env.ROLL_OUT_API_TOKEN,
                REPO_ID: process.env.REPO_ID,
                REPO_PROD_BRANCH: process.env.REPO_PROD_BRANCH,
                REPO_TYPE: process.env.REPO_TYPE,
              },
            });

            if (result === true) {
              localFlowSpinner.succeed('All steps were successful 🎉');
              console.table(summary);
              return;
            } else {
              localFlowSpinner.fail('One of the steps was not successful 😿');
              console.table(summary);
            }
          }
        } else {
          sanityProjectSpinner.fail('Failed to create Sanity project.');
        }
      } else {
        ora(
          'Limit of the projects reached or project with this email already exists',
        ).fail();
      }
    } else {
      ora('Email is not valid').fail();
    }
  } catch (error) {
    ora('An error occurred').fail();
    console.error(error);
    console.table(summary);
  }
}
