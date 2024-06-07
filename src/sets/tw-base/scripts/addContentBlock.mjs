#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assume node_modules is in the root of the project
const projectRoot = path.resolve(__dirname, '../../../../');
const hygenPath = path.resolve(projectRoot, 'node_modules/.bin/hygen');

const blockTypes = [
  {
    title: 'Simple Block',
    value: 'simple',
    path: path.resolve(__dirname, '../blocks/_templates/block/simple'), // define the correct path
  },
  // Add more block types if needed
];

async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'blockName',
      message: 'Enter the name of the new Content Block:',
    },
    {
      type: 'list',
      name: 'blockType',
      message: 'Select the type of the new Content Block:',
      choices: blockTypes.map((type) => type.title), // Map titles for selection
    },
  ]);

  const { blockName, blockType } = answers;
  const selectedBlockType = blockTypes.find((type) => type.title === blockType);

  const componentName = blockName.charAt(0).toUpperCase() + blockName.slice(1);
  const folderName = blockName;
  const schemaName = blockName.charAt(0).toLowerCase() + blockName.slice(1);
  const schemaTitle = blockName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (str) => str.toUpperCase());

  console.log(`Creating a new Content Block with the following details:
    Component Name: ${componentName}
    Folder Name: ${folderName}
    Schema Name: ${schemaName}
    Schema Title: ${schemaTitle}
    Block Type: ${blockType}
  `);

  // Execute Hygen to create the block
  execSync(
    `${hygenPath} block new --name ${blockName} --type ${blockType} --componentName ${componentName} --schemaName ${schemaName} --schemaTitle "${schemaTitle}"`,
    { stdio: 'inherit', cwd: projectRoot },
  );
}

run();
