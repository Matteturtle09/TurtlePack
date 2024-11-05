'use client';
import { Copy, UserPlus } from 'lucide-react';
import React, { useActionState } from 'react';
import { Button } from '../ui/button';
import { createTeamInvite } from '@/server-actions/teams';
import { useFormState } from 'react-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}
interface InviteButtonProps {
  teamId: string;
}

const InviteButton = ({ teamId }: InviteButtonProps) => {
  const [state, formAction] = useActionState(createTeamInvite, {
    link: '',
    phrase: '',
  });
  const [isOpen, setOpen] = React.useState(false);

  return (
    <form action={formAction}>
      <input hidden readOnly value={teamId} name="teamId" />
      <input hidden readOnly value={crypto.randomUUID()} name="token" />
      <Button
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <UserPlus />
        Invite
      </Button>
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent className='mx-2 mt-2'>
          <DropdownMenuLabel>Invite Phrase</DropdownMenuLabel>
          <DropdownMenuItem className="flex flex-row items-center">
            {state?.phrase}
            <Button variant={'ghost'} onClick={async () => {await copyTextToClipboard(state?.phrase)}} size={'sm'}>
              <Copy />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuLabel>Invite Link</DropdownMenuLabel>
          <DropdownMenuItem className="flex flex-row items-center">
            {state?.link.slice(0, 24)}...
            <Button variant={'ghost'} onClick={async () => {await copyTextToClipboard(state?.link)}} size={'sm'}>
              <Copy />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
};

export default InviteButton;
