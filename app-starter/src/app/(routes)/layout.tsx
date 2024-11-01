import Navbar from '@/components/nav/Navbar';

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { title: 'Hi', href: '#' },
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <Navbar navItems={navItems} />
      {children}
    </>
  );
}
