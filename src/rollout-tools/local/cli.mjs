#!/usr/bin/env node

import { localRollout, checkEnvVariables } from './localRollout.mjs';

import inquirer from 'inquirer';
import fs from 'fs';
import crypto from 'crypto';
// import fetch from 'node-fetch';
// import { stdout as output } from 'node:process';
// import { createRequire } from 'module';
// import readline from 'readline';

// Helper function to append to .env file
const appendToEnv = (key, value) => {
  fs.appendFileSync('.env', `${key}=${value}\n`);
};

// Helper function to read .env file
const readEnv = () => {
  const env = {};
  if (fs.existsSync('.env')) {
    const lines = fs.readFileSync('.env', 'utf-8').split('\n');
    for (const line of lines) {
      const [key, value] = line.split('=');
      if (key && value) {
        env[key] = value;
      }
    }
  }
  return env;
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
  const env = readEnv();
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
  appendToEnv('VERCEL_PERSONAL_AUTH_TOKEN', vercelToken);

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
  appendToEnv('SANITY_PERSONAL_AUTH_TOKEN', sanityToken);

  // Step 3: Generate ROLL_OUT_API_TOKEN
  const env = readEnv();
  let rollOutApiToken;
  if (env['ROLL_OUT_API_TOKEN']) {
    rollOutApiToken = env['ROLL_OUT_API_TOKEN'];
  } else {
    rollOutApiToken = crypto.randomBytes(20).toString('hex');
    appendToEnv('ROLL_OUT_API_TOKEN', rollOutApiToken);
  }

  // Step 4: Ask for user email
  const { email } = await inquirer.prompt({
    type: 'input',
    name: 'email',
    message: colorText('Enter your email:', 'cyan'),
  });

  // Step 5: Send data to the API
  try {
    // Ensure all required environment variables are set
    const requiredEnvVars = [
      'VERCEL_PERSONAL_AUTH_TOKEN',
      'SANITY_PERSONAL_AUTH_TOKEN',
      'SANITY_ORGANIZATION_ID',
      'VERCEL_FR_TEAM_ID',
      'PROJECT_NAME',
      'MAX_NUMBER_OF_PROJECTS',
      'NEXT_PUBLIC_SANITY_DATASET',
    ];
    checkEnvVariables(requiredEnvVars);

    const inputs = { email };
    const secrets = {
      SANITY_PERSONAL_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
      SANITY_ORGANIZATION_ID: process.env.SANITY_ORGANIZATION_ID,
      VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
      VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
      PROJECT_NAME: process.env.PROJECT_NAME,
      MAX_NUMBER_OF_PROJECTS: process.env.MAX_NUMBER_OF_PROJECTS,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    };

    await localRollout({ inputs, secrets });
  } catch (error) {
    console.error(colorText('Error:', 'red'), error.message);
  }
};

main();
