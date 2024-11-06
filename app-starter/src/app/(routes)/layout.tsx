import Navbar from '@/components/nav/Navbar';
import { auth } from '../../../auth';

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  const navItems = [
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Dashboard', href: `/team/${session?.user?.teams[0] ?? "1"}/dashboard/workflows` },
  ];

  return (
    <>
      <Navbar navItems={navItems} />
      {children}
    </>
  );
}
