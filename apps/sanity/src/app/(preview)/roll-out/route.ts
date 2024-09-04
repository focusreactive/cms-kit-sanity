import {
  createSanityProject,
  createVercelProject,
  triggerGithubWorkflow,
  getVercelProjects,
  createSanityReadToken,
} from '@/rollout-tools/lib/services';
import { isValidEmail } from '@/rollout-tools/lib/email';

const allowedMethods = ['POST', 'OPTIONS'];

function handleCors(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    allowedMethods.join(', '),
  );
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  const response = new Response(null, { status: 204 });
  return handleCors(response);
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (email && isValidEmail(email)) {
    const username = email
      .split('@')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // prevent forbidden symbols
      .slice(0, 90); // prevent project name from being too long
    const projectName = `${username}-${process.env.PROJECT_NAME}`;

    const existingProjects = await getVercelProjects();

    const allowToCreateProject =
      existingProjects &&
      existingProjects.length <
        parseInt(process.env.MAX_NUMBER_OF_PROJECTS || '5');
    const existingProject = existingProjects?.find(
      (project) => project.name === projectName,
    );

    if (allowToCreateProject && !existingProject) {
      const sanityProjectId = await createSanityProject(projectName);
      const sanityDatasetName =
        process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

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
            return handleCors(
              new Response(
                JSON.stringify({ message: 'All steps were successful 🎉' }),
                {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                },
              ),
            );
          }
        }
      }

      return handleCors(
        new Response(
          JSON.stringify({ error: 'One of the steps was not successful😿' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    }

    return handleCors(
      new Response(
        JSON.stringify({
          error:
            'Limit of the projects reached or project with this email already exists',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      ),
    );
  }

  return handleCors(
    new Response(JSON.stringify({ error: 'Email is not valid' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}
