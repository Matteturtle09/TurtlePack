
export default async function DeletedWorkflows({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;

  return <h1>Deleted Workflows for Team: {teamId}</h1>;
}