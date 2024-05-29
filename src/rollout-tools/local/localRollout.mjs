import {
  createSanityProject,
  createVercelProject,
  triggerGithubWorkflow,
  getVercelProjects,
  createSanityReadToken,
} from './services.mjs';
import { isValidEmail } from './email.mjs';
import { loadEnvVariables } from './loadEnv.mjs';

export function checkEnvVariables(envVars) {
  loadEnvVariables();
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(`Missing environment variable: ${envVar}`);
      process.exit(1);
    }
  });
}

// List of required environment variables
const requiredEnvVars = [
  'SANITY_PERSONAL_AUTH_TOKEN',
  'SANITY_ORGANIZATION_ID',
  'VERCEL_PERSONAL_AUTH_TOKEN',
  'VERCEL_FR_TEAM_ID',
  'PROJECT_NAME',
  'MAX_NUMBER_OF_PROJECTS',
  'NEXT_PUBLIC_SANITY_DATASET',
];

export async function localRollout({ inputs, secrets }) {
  const { email } = inputs;

  if (email && isValidEmail(email)) {
    const username = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // prevent forbidden symbols
      .slice(0, 90); // prevent project name from being too long
    const projectName = `${username}-${secrets.PROJECT_NAME}`;

    const existingProjects = await getVercelProjects();

    const allowToCreateProject =
      existingProjects &&
      existingProjects.length < parseInt(secrets.MAX_NUMBER_OF_PROJECTS || '5');
    const existingProject = existingProjects?.find(
      (project) => project.name === projectName,
    );

    if (allowToCreateProject && !existingProject) {
      const sanityProjectId = await createSanityProject(projectName);
      const sanityDatasetName =
        secrets.NEXT_PUBLIC_SANITY_DATASET || 'production';

      if (sanityProjectId) {
        const sanityReadToken = await createSanityReadToken(sanityProjectId);

        const projectData = await createVercelProject({
          sanityReadToken: sanityReadToken || '',
          projectName: projectName,
          sanityProjectId,
          sanityDatasetName,
        });

        if (projectData) {
          const result = await triggerGithubWorkflow({
            sanityProjectId,
            sanityDatasetName,
            vercelProjectId: projectData.projectId,
            vercelProjectName: projectData.projectName,
            vercelDeploymentUrl: projectData.deploymentUrl,
            email,
          });

          if (result === true) {
            console.log('All steps were successful 🎉');
            return;
          }
        }
      }

      console.log('One of the steps was not successful😿');
      return;
    }

    console.log(
      'Limit of the projects reached or project with this email already exists',
    );
    return;
  }

  console.log('Email is not valid');
}
