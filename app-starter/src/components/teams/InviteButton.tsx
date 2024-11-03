'use client';
import { UserPlus } from 'lucide-react';
import React, { useActionState } from 'react';
import { Button } from '../ui/button';
import { createTeamInvite } from '@/server-actions/teams';
import { useFormState } from 'react-dom';

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

  return (
    <form action={formAction}>
      <input hidden readOnly value={teamId} name="teamId" />
      <input hidden readOnly value={self?.crypto.randomUUID()} name="token" />

      <Button onClick={async () => await copyTextToClipboard(state?.link)}>
        <UserPlus />
        Invite
      </Button>
      {state?.link}
    </form>
  );
};

export default InviteButton;
