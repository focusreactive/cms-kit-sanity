export async function createVercelProject({
  projectName,
  sanityProjectId,
  sanityDatasetName,
  sanityReadToken,
  vercelPersonalAuthToken,
  vercelFrTeamId,
  repoName,
  email,
  cmsKitIntegration,
}) {
  const environmentVariables = [
    {
      key: 'NEXT_PUBLIC_SANITY_PROJECT_ID',
      value: sanityProjectId,
    },
    {
      key: 'NEXT_PUBLIC_SANITY_DATASET',
      value: sanityDatasetName,
    },
    {
      key: 'NEXT_PUBLIC_READ_TOKEN',
      value: sanityReadToken,
      type: 'encrypted',
    },
    {
      key: 'SANITY_STUDIO_URL',
      value: `https://${projectName}.vercel.app/admin`,
    },
    {
      key: 'NEXT_PUBLIC_PREVIEW_URL',
      value: `https://${projectName}.vercel.app`,
    },
    {
      key: 'CLIENT_EMAIL',
      value: email || '',
    },
    {
      key: 'CMS_KIT_INTEGRATION',
      value: cmsKitIntegration,
    },
  ]
    .map(
      (v) =>
        v.value && {
          ...v,
          target: ['production', 'preview', 'development'],
          type: v.type || 'plain',
        },
    )
    .filter(Boolean);

  const body = JSON.stringify({
    name: projectName,
    environmentVariables: environmentVariables,
    framework: 'nextjs',
    gitRepository: {
      repo: repoName,
      type: 'github',
    },
    publicSource: false,
    installCommand: 'pnpm i',
  });

  console.log('Start creating Vercel project...⏳');
  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects?teamId=${vercelFrTeamId}`,
      {
        headers: {
          Authorization: `Bearer ${vercelPersonalAuthToken}`,
        },
        method: 'POST',
        body,
      },
    );

    if (response.status.toString().startsWith('4')) {
      console.error('Failed to create Vercel project.');
      const message = await response.json();
      console.error(message);
      throw new Error('Error createVercelProject');
    }

    const data = await response.json();
    console.log('Vercel project created successfully! ✅');
    return {
      projectId: data.id,
      projectName: data.name,
      deploymentUrl: `https://${data.name}.vercel.app`,
    };
  } catch (error) {
    console.error('Failed to create Vercel project.');
    console.warn(error);
  }
}
