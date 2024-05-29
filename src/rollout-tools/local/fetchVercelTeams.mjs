export async function fetchVercelTeams(token) {
  const url = 'https://api.vercel.com/v2/teams';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.teams) || data.teams.length === 0) {
      throw new Error('No teams found.');
    }

    const teams = data.teams.map(team => ({
      name: team.name,
      slug: team.slug,
      id: team.id,
    }));

    return teams;
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    return [];
  }
}
