export default async function Workflows({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;

  return <h1>Workflows for Team: {teamId}</h1>;
}