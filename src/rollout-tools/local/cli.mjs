#!/usr/bin/env node

import { localRollout, checkEnvVariables } from './localRollout.mjs';
import { loadEnvVariables } from './loadEnvVariables.mjs';
import {
  fetchSanityOrganizations,
  fetchSanityUserInfo,
} from './fetchSanityOrganizations.mjs';
import { fetchVercelTeams, fetchVercelUserInfo } from './fetchVercelTeams.mjs';
import inquirer from 'inquirer';
import fs from 'fs';
import crypto from 'crypto';

/// Helper function to append or update to .env file
const appendOrUpdateEnv = (key, value) => {
  const envFilePath = '.env';
  const envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, 'utf8')
    : '';
  const envLines = envContent.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines

  const existingIndex = envLines.findIndex((line) =>
    line.startsWith(`${key}=`),
  );
  if (existingIndex >= 0) {
    envLines[existingIndex] = `${key}=${value}`;
  } else {
    envLines.push(`${key}=${value}`);
  }

  fs.writeFileSync(envFilePath, envLines.join('\n') + '\n');
};

// Helper function for coloring text
const colorText = (text, color) => {
  const colors = {
    reset: '\x1b[0m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
  };
  return `${colors[color] || colors.reset}${text}${colors.reset}`;
};

const promptForToken = async (tokenName, promptMessage) => {
  const env = loadEnvVariables();
  if (env[tokenName]) {
    const { useCurrent } = await inquirer.prompt({
      type: 'confirm',
      name: 'useCurrent',
      message: `${tokenName} is already set. Do you want to keep the current value?`,
      default: true,
    });
    if (useCurrent) {
      return env[tokenName];
    }
  }
  const { token } = await inquirer.prompt({
    type: 'input',
    name: 'token',
    message: promptMessage,
  });
  return token;
};

const promptForProjectName = async () => {
  const env = loadEnvVariables();
  if (env['PROJECT_NAME']) {
    const { useCurrent } = await inquirer.prompt({
      type: 'confirm',
      name: 'useCurrent',
      message: `PROJECT_NAME is already set to ${env['PROJECT_NAME']}. Do you want to keep the current value?`,
      default: true,
    });
    if (useCurrent) {
      return env['PROJECT_NAME'];
    }
  }
  const { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'Enter the project name prefix:',
    default: 'cms-kit-sanity-mvp',
  });
  return projectName;
};

const promptForDatasetName = async () => {
  const env = loadEnvVariables();
  if (env['NEXT_PUBLIC_SANITY_DATASET']) {
    const { useCurrent } = await inquirer.prompt({
      type: 'confirm',
      name: 'useCurrent',
      message: `NEXT_PUBLIC_SANITY_DATASET is already set to ${env['NEXT_PUBLIC_SANITY_DATASET']}. Do you want to keep the current value?`,
      default: true,
    });
    if (useCurrent) {
      return env['NEXT_PUBLIC_SANITY_DATASET'];
    }
  }
  const { datasetName } = await inquirer.prompt({
    type: 'input',
    name: 'datasetName',
    message: 'Enter the Sanity dataset name:',
    default: 'production',
  });
  return datasetName;
};

const main = async () => {
  console.log(
    colorText('\nWelcome to the CMS-KIT Auto Rollout CLI Tool\n', 'cyan'),
  );
  console.log(
    colorText(
      'This tool will guide you through setting up your project on Vercel and Sanity, linking them with your GitHub repository.\n',
      'dim',
    ),
  );
  console.log(
    colorText(
      'You will need to log in or create accounts on these platforms, generate auth tokens, and complete the setup.\n',
      'dim',
    ),
  );
  console.log(
    colorText(
      'Follow the instructions and prompts provided by this tool. This process is simple and should take about 5 minutes. Happy hacking!\n',
      'green',
    ),
  );

  // Step 1: Vercel login
  console.log(
    colorText(
      "\nPlease log in to your Vercel account or create one if you don't have it yet:",
      'yellow',
    ),
  );
  console.log('1. Go to https://vercel.com/login');
  console.log(
    '2. After logging in, create an API access token at: https://vercel.com/account/tokens',
  );
  console.log(colorText('The token will be saved in the .env file.', 'dim'));
  const vercelToken = await promptForToken(
    'VERCEL_PERSONAL_AUTH_TOKEN',
    'Enter your Vercel API access token:',
  );
  appendOrUpdateEnv('VERCEL_PERSONAL_AUTH_TOKEN', vercelToken);

  // Fetch Vercel user info
  const vercelUserInfo = await fetchVercelUserInfo(vercelToken);

  // Step 1.1: Fetch Vercel teams and prompt user to select one
  const vercelTeams = await fetchVercelTeams(vercelToken);
  const { selectedTeam } = await inquirer.prompt({
    type: 'list',
    name: 'selectedTeam',
    message: 'Select your Vercel team:',
    choices: vercelTeams.map((team) => ({
      name: `${team.name} (${team.slug})`,
      value: team.id,
    })),
  });
  appendOrUpdateEnv('VERCEL_FR_TEAM_ID', selectedTeam);

  // Step 2: Sanity login
  console.log(
    colorText(
      "\nPlease log in to your Sanity account or create one if you don't have it yet:",
      'yellow',
    ),
  );
  console.log('1. Go to https://www.sanity.io/manage');
  console.log('2. Run `npx sanity login` to log in to the Sanity CLI');
  console.log('3. Run `npx sanity debug --secrets` and copy the token');
  console.log(colorText('The token will be saved in the .env file.', 'dim'));
  const sanityToken = await promptForToken(
    'SANITY_PERSONAL_AUTH_TOKEN',
    'Enter your Sanity API token:',
  );
  appendOrUpdateEnv('SANITY_PERSONAL_AUTH_TOKEN', sanityToken);

  // Fetch Sanity user info
  const sanityUserInfo = await fetchSanityUserInfo(sanityToken);

  // Step 2.1: Fetch Sanity organizations and prompt user to select one
  const sanityOrganizations = await fetchSanityOrganizations(sanityToken);
  const { selectedOrg } = await inquirer.prompt({
    type: 'list',
    name: 'selectedOrg',
    message: 'Select your Sanity organization:',
    choices: sanityOrganizations.map((org) => ({
      name: `${org.name} (${org.slug})`,
      value: org.id,
    })),
  });
  appendOrUpdateEnv('SANITY_ORGANIZATION_ID', selectedOrg);

  // Step 3: Generate ROLL_OUT_API_TOKEN
  const env = loadEnvVariables();
  let rollOutApiToken;
  if (env['ROLL_OUT_API_TOKEN']) {
    rollOutApiToken = env['ROLL_OUT_API_TOKEN'];
  } else {
    rollOutApiToken = crypto.randomBytes(20).toString('hex');
    appendOrUpdateEnv('ROLL_OUT_API_TOKEN', rollOutApiToken);
  }

  // Step 4: Ask for user email
  const emails = new Set();
  emails.add(sanityUserInfo.email);
  emails.add(vercelUserInfo.email);

  const emailChoices = [
    ...Array.from(emails).map((email) => ({ name: email, value: email })),
    { name: 'Enter a different email', value: 'other' },
  ];

  if (env['EMAIL'] && !emails.has(env['EMAIL'])) {
    emailChoices.unshift({
      name: `Existing: ${env['EMAIL']}`,
      value: env['EMAIL'],
    });
  }

  const { emailChoice } = await inquirer.prompt({
    type: 'list',
    name: 'emailChoice',
    message: 'Select your email:',
    choices: emailChoices,
  });

  let email = emailChoice;
  if (emailChoice === 'other') {
    const { userEmail } = await inquirer.prompt({
      type: 'input',
      name: 'userEmail',
      message: colorText('Enter your email:', 'cyan'),
    });
    email = userEmail;
  }

  appendOrUpdateEnv('EMAIL', email);

  // Step 5: Ask for project name prefix
  const projectName = await promptForProjectName();
  appendOrUpdateEnv('PROJECT_NAME', projectName);

  // Step 6: Ask for dataset name
  const datasetName = await promptForDatasetName();
  appendOrUpdateEnv('NEXT_PUBLIC_SANITY_DATASET', datasetName);

  // Step 7: Send data to the API
  try {
    // Ensure all required environment variables are set
    const requiredEnvVars = [
      'VERCEL_PERSONAL_AUTH_TOKEN',
      'SANITY_PERSONAL_AUTH_TOKEN',
      'SANITY_ORGANIZATION_ID',
      'VERCEL_FR_TEAM_ID',
      'PROJECT_NAME',
      'NEXT_PUBLIC_SANITY_DATASET',
      'MAX_NUMBER_OF_PROJECTS',
    ];
    checkEnvVariables(requiredEnvVars);

    const inputs = { email, projectName, datasetName };
    const secrets = {
      SANITY_PERSONAL_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
      SANITY_ORGANIZATION_ID: process.env.SANITY_ORGANIZATION_ID,
      VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
      VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
      PROJECT_NAME: process.env.PROJECT_NAME,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      MAX_NUMBER_OF_PROJECTS: process.env.MAX_NUMBER_OF_PROJECTS,
    };

    await localRollout({ inputs, secrets });
  } catch (error) {
    console.error(colorText('Error:', 'red'), error.message);
  }
};

main();
