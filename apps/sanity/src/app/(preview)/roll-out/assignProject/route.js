import { NextResponse } from 'next/server';
import { getProject } from '@/rollout-tools/demo/getProject.mjs';

export async function POST(request) {
  if (request.method === 'OPTIONS') {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(null, { headers });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: true, code: 400, message: 'Email is required.' },
        { status: 400 },
      );
    }

    const result = await getProject(email);

    if (result.error) {
      return NextResponse.json(result, { status: result.code });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, code: 500, message: error.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Placeholder for future functionality
  return NextResponse.json(
    { message: 'GET method is not implemented yet.' },
    { status: 501 },
  );
}
