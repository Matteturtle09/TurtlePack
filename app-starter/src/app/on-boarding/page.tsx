import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { Input } from '@/components/ui/input';
import CustomSeparator from '@/components/ui/customSeparator';
import { createTeam, joinTeam } from '@/server-actions/teams';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function OnBoarding() {
  const session = await auth()
  if(!session?.user){
    redirect("/api/auth/signin")
  }
  return (
    <BackgroundBeamsWithCollision className="h-full min-h-screen">
      <Card className="z-[100] w-full max-w-md bg-transparent bg-opacity-10 bg-clip-padding shadow-sm backdrop-blur-sm backdrop-filter">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to App</CardTitle>
          <CardDescription>
            Get started by creating or joining a team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={createTeam}>
            <Input
              type="text"
              className="mb-4"
              name="teamName"
              placeholder="Enter Team Name"
            />
            <input hidden readOnly value={session?.user?.id} name="userId"/>
            <Button className="w-full transform py-6 text-lg transition-all duration-300 hover:scale-105">
              <Users className="mr-2 h-6 w-6" />
              Create a Team
            </Button>
          </form>
          <CustomSeparator text="or" />
          <form action={joinTeam}>
            <input hidden readOnly value={session?.user?.id} name="userId"/>
            <Input type="text" className="mb-4" name="phrase" placeholder="Enter phrase" />
            <Button className="w-full transform py-6 text-lg transition-all duration-300 hover:scale-105">
              <UserPlus className="mr-2 h-6 w-6" />
              Join a Team
            </Button>
          </form>
        </CardContent>
      </Card>
    </BackgroundBeamsWithCollision>
  );
}
