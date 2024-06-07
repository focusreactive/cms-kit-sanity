#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';

const blockTypes = [
  {
    title: 'Simple Block',
    value: 'simple',
    path: 'tbd...', // define later
  },
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
      choices: blockTypes.map(type => type.title), // Add your block types here
    },
  ]);

  const { blockName, blockType } = answers;

  const componentName = blockName.charAt(0).toUpperCase() + blockName.slice(1);
  const folderName = blockName;
  const schemaName = blockName.charAt(0).toLowerCase() + blockName.slice(1);
  const schemaTitle = blockName.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

  console.log(`Creating a new Content Block with the following details:
    Component Name: ${componentName}
    Folder Name: ${folderName}
    Schema Name: ${schemaName}
    Schema Title: ${schemaTitle}
    Block Type: ${blockType}
  `);

  // Execute Hygen to create the block
  execSync(`hygen block new --name ${blockName} --type ${blockType}`, { stdio: 'inherit' });
}

run();
