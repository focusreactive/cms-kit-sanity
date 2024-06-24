#!/usr/bin/env node

if (process.env.GITHUB_ACTIONS !== 'true') {
  console.warn(
    'Warning: You are running this script locally. This script is intended to be run in a GitHub Actions environment.',
  );
  process.exit(1);
}

console.log('Script is running...');
