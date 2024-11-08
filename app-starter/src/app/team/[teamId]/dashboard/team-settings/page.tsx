import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight } from 'lucide-react';
import MembersTable from '@/components/teams/membersTable';
import { updateTeamName } from '@/server-actions/teams';
import { auth } from '../../../../../../auth';
import { getTeamById, getTeamMembersById } from '@/lib/teams';

interface TeamSettingsProps {
  params: {
    teamId: string;
  };
}

export default async function TeamSettings({ params }: TeamSettingsProps) {
  const { teamId } = await params;
  const session = await auth();
  const team = await getTeamById(teamId);

  // In a real application, you would fetch the current team settings here
  // const teamSettings = await fetchTeamSettings(teamId)
  let teamWithMembersData = await getTeamMembersById(teamId);
  let notAdminMembers = teamWithMembersData.members.map((member) => {
    return { username: member.username, email: member.email, role: 'default' };
  });
  let adminMembers = teamWithMembersData.admins.map((admin) => {
    return { username: admin.username, email: admin.email, role: 'admin' };
  });
  let members = notAdminMembers.concat(adminMembers);
  return (
    <div className="mx-4 min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-semibold">Team Settings</h1>
            <h2></h2>
          </div>
          <Button type="submit" form="updateTeamName">
            Save Changes
          </Button>
        </div>
      </header>
      <main className="container py-8">
        <section>
          <h2 className="mb-6 text-xl font-semibold">General Information</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <form id="updateTeamName" action={updateTeamName}>
                <input hidden defaultValue={session?.user?.id} name="userId" />
                <input hidden defaultValue={teamId} name="teamId" />

                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  defaultValue={team.name}
                  name="teamName"
                  placeholder="Enter team name"
                />
              </form>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-semibold">Team Members</h2>
          <div className="w-full">
            <MembersTable members={members} />
          </div>
        </section>
      </main>
    </div>
  );
}
