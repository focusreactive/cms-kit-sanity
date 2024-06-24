#!/usr/bin/env node

if (process.env.GITHUB_ACTIONS !== 'true') {
  console.warn(
    'Warning: You are running this script locally. This script is intended to be run in a GitHub Actions environment.',
  );
  process.exit(1);
}

const email = process.env.EMAIL;
const sanityProjectName = process.env.PROJECT_PREFIX;

if (!email) {
  console.error('Error: No email provided.');
  process.exit(1);
}

console.log(`Script is running with email: ${email}`);
console.log(`Sanity project name: ${sanityProjectName}`);

// Main script code goes here

