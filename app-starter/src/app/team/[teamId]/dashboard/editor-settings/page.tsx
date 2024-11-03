export default async function EditorSettings({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;

  return <h1>Editor Settings for Team: {teamId}</h1>;
}