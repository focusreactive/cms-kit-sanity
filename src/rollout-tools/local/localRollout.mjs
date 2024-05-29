import {
  createSanityProject,
  createVercelProject,
  triggerGithubWorkflow,
  getVercelProjects,
  createSanityReadToken,
} from './services.mjs';
import { isValidEmail } from './email.mjs';
import { loadEnvVariables } from './loadEnvVariables.mjs';

export function checkEnvVariables(envVars) {
  loadEnvVariables();
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(`Missing environment variable: ${envVar}`);
      process.exit(1);
    }
  });
}

export async function localRollout({ inputs, secrets }) {
  loadEnvVariables();
  const { email, projectName, datasetName } = inputs;

  if (email && isValidEmail(email)) {
    const username = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // prevent forbidden symbols
      .slice(0, 90); // prevent project name from being too long
    const finalProjectName = `${username}-${projectName}`;

    const existingProjects = await getVercelProjects();

    const allowToCreateProject =
      existingProjects &&
      existingProjects.length < parseInt(secrets.MAX_NUMBER_OF_PROJECTS || '5');
    const existingProject = existingProjects?.find(
      (project) => project.name === finalProjectName,
    );

    if (allowToCreateProject && !existingProject) {
      const sanityProjectId = await createSanityProject(finalProjectName);

      if (sanityProjectId) {
        const sanityReadToken = await createSanityReadToken(sanityProjectId);

        const projectData = await createVercelProject({
          sanityReadToken: sanityReadToken || '',
          projectName: finalProjectName,
          sanityProjectId,
          sanityDatasetName: datasetName,
        });

        if (projectData) {
          const result = await triggerGithubWorkflow({
            sanityProjectId,
            sanityDatasetName: datasetName,
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
