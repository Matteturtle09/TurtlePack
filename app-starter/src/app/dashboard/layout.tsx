import DashboardSideBar from '@/components/nav/Sidebar';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const data = {
    teams: ['Acme inc.', 'My Team', 'Tasty Restaurant'],
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
  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="">
      <DashboardSideBar data={data}>{children}</DashboardSideBar>
    </div>
  );
}
