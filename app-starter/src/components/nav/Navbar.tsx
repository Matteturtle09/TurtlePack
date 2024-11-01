'use client';
import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeSwitch from '../ui/themeSwitch';
import AuthButton from '../auth/AuthButton';

type NavItems = { title: string; href: string }[];

interface NavbarProps {
  navItems: NavItems;
}

const Navbar = ({ navItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed sticky top-0 z-50 w-full bg-transparent bg-opacity-10 bg-clip-padding shadow-sm backdrop-blur-sm backdrop-filter">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0">
              <h1 className="font-[family-name:var(--font-geist-sans)] text-lg font-bold text-slate-500 dark:text-slate-300">
                App
              </h1>
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Button key={item.title} variant="ghost" asChild>
                    <a href={item.href}>{item.title}</a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-full">
                <div className="mt-6 flow-root">
                  <div className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <React.Fragment key={item.title}>
                        <Button variant="ghost" asChild>
                          <a href={item.href}>{item.title}</a>
                        </Button>
                      </React.Fragment>
                    ))}
                    <div className="flex w-full items-center justify-center space-x-4">
                      {' '}
                      <AuthButton />
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden items-center space-x-4 md:flex">
            <ThemeSwitch />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
