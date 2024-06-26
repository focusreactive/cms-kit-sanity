import fetch from 'node-fetch';
import { getVercelProjects } from '../local/services.mjs';
import { isValidEmail } from '../local/email.mjs';

const CMS_KIT_INTEGRATION = 'sanity';

async function fetchExistingProjects() {
  const existingProjects = await getVercelProjects();
  if (!existingProjects) {
    throw new Error('Failed to fetch existing Vercel projects.');
  }
  return existingProjects;
}

function findFreeProject(existingProjects) {
  for (let i = existingProjects.length - 1; i >= 0; i--) {
    const project = existingProjects[i];
    const clientEmail = project.env?.find(
      (envVar) => envVar.key === 'CLIENT_EMAIL',
    );
    const cmsIntegration = project.env?.find(
      (envVar) => envVar.key === 'CMS_KIT_INTEGRATION',
    )?.value;
    if (
      (!clientEmail || !clientEmail.value) &&
      cmsIntegration === CMS_KIT_INTEGRATION
    ) {
      return project;
    }
  }
  return null;
}


async function assignClientToProject({ project, email, authToken, teamId }) {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${project.id}/env?teamId=${teamId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'CLIENT_EMAIL',
        value: email,
        type: 'plain',
        target: ['production', 'preview', 'development'],
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to assign client email to Vercel project.');
  }
}

async function addClientToSanityProject({ email, sanityProjectId, authToken }) {
  const response = await fetch(
    `https://api.sanity.io/v2021-06-07/invitations/project/${sanityProjectId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        role: 'editor',
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to invite user to Sanity project.');
  }
}

async function getProject(email) {
  if (!isValidEmail(email)) {
    return {
      error: true,
      code: 400,
      message: 'Invalid email provided.',
    };
  }

  try {
    const existingProjects = await fetchExistingProjects();
    const freeProject = findFreeProject(existingProjects);

    if (!freeProject) {
      return {
        error: true,
        code: 404,
        message: `No free project available. Total projects: ${existingProjects.length}`,
      };
    }

    await assignClientToProject({
      project: freeProject,
      email: email,
      authToken: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
      teamId: process.env.VERCEL_FR_TEAM_ID,
    });

    const sanityProjectId = freeProject.env?.find(
      (envVar) => envVar.key === 'NEXT_PUBLIC_SANITY_PROJECT_ID',
    )?.value;

    if (!sanityProjectId) {
      throw new Error(
        'Sanity project ID not found in Vercel project environment variables.',
      );
    }

    await addClientToSanityProject({
      email: email,
      sanityProjectId: sanityProjectId,
      authToken: process.env.SANITY_PERSONAL_AUTH_TOKEN,
    });

    const deploymentUrl = `https://${freeProject.name}.vercel.app`;
    const vercelUrl = `https://vercel.com/${process.env.VERCEL_FR_TEAM_SLUG}/${freeProject.name}`;
    const sanityUrl = `https://www.sanity.io/organizations/${process.env.SANITY_ORGANIZATION_ID}/project/${sanityProjectId}`;
    const studioUrl = `${deploymentUrl}/admin`;

    return {
      error: false,
      message: 'Client successfully assigned to project.',
      projectDetails: {
        projectName: freeProject.name,
        sanityProjectId: sanityProjectId,
        vercelProjectId: freeProject.id,
        deploymentUrl: deploymentUrl,
        studioUrl: studioUrl,
        vercelUrl: vercelUrl,
        sanityUrl: sanityUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      code: 500,
      message: error.message,
    };
  }
}

export { getProject };
