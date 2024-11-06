'use client';
import { setCookie, getCookie } from 'cookies-next';
import * as React from 'react';
import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Search,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import AuthButton from '../auth/AuthButton';
import InviteButton from '../teams/InviteButton';

interface DashboardSideBarProps {
  data: {
    teams: { name: string; teamId: string }[];
    navMain: {
      title: string;
      url: string;
      items: { title: string; url: string }[];
    }[];
  };
  children: React.ReactNode;
}

export default function DashboardSideBar({
  data,
  children,
}: DashboardSideBarProps) {
  const initialTeam = getCookie('selectedTeam')
    ? JSON.parse(getCookie('selectedTeam'))
    : data.teams[0];
  const [selectedTeam, setSelectedTeam] = React.useState(initialTeam);

  React.useEffect(() => {
    // Update the cookie whenever selectedTeam changes
    setCookie('selectedTeam', JSON.stringify(selectedTeam), {
      maxAge: 60 * 60 * 24 * 7,
    }); // 7 days
  }, [selectedTeam]);
  

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">{selectedTeam.name}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  {data.teams.map((team) => (
                    <Link
                      key={team.teamId}
                      href={`/team/${team.teamId}/dashboard/workflows`}
                    >
                      <DropdownMenuItem
                        key={team.teamId}
                        onSelect={() => setSelectedTeam(team)}
                      >
                        {team.name}
                        {team === selectedTeam && <Check className="ml-auto" />}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                  <DropdownMenuSeparator/>
                  <Link href={'/on-boarding'}>
                    <DropdownMenuItem>Add New team</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Search in this team..."
                  className="pl-8"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent>
          {data.navMain.map((navItem) => (
            <SidebarGroup key={navItem.title}>
              <SidebarGroupLabel>{navItem.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItem.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/team/${selectedTeam.teamId}/${subItem.url}`}
                        >
                          {subItem.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          <div className="mx-4 flex flex-col gap-4">
            <InviteButton teamId={selectedTeam.teamId} />
            <AuthButton />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
