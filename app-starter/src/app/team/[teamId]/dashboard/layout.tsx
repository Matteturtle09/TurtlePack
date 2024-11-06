import DashboardSideBar from '@/components/nav/Sidebar';
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';
import client from '@/lib/db/mongoClient';
import { ObjectId } from 'mongodb';

export default async function DashboardLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) {

  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  if (session?.user.teams.length === 0) {
    redirect('/on-boarding');
  }
  

  const database = client.db('test');
  const data = {
    teams: await Promise.all(
      session?.user?.teams.map(async (teamId) => {
        const team = await database
          .collection('teams')
          .findOne({ _id: new ObjectId(teamId) });
        return { teamId: teamId, name: team?.name }; // Adjusting this to return only the name if that's needed
      }),
    ),
    navMain: [
      {
        title: 'Workflows',
        url: '#',
        items: [
          {
            title: 'Workflows',
            url: '/dashboard/workflows',
          },
          {
            title: 'Deleted Workflows',
            url: '/dashboard/deleted-workflows',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        items: [
          {
            title: 'Editor settings',
            url: '/dashboard/editor-settings',
          },
          {
            title: 'Team Settings',
            url: '/dashboard/team-settings',
          },
        ],
      },
    ],
  };

  return (
    <div className="">
      <DashboardSideBar data={data}>{children}</DashboardSideBar>
    </div>
  );
}
