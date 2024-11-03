export default async function TeamSettings({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;

  return <h1>Team Settings for Team: {teamId}</h1>;
}
