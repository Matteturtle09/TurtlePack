"use client";
import { UserPlus } from 'lucide-react';
import React, { useActionState } from 'react'
import { Button } from '../ui/button';
import { createTeamInvite } from '@/server-actions/teams';
import { useFormState } from 'react-dom';

interface InviteButtonProps{
    teamId: string;
}

const InviteButton = ({teamId}:InviteButtonProps) => {
  const [state, formAction] = useActionState(createTeamInvite, {link: "", phrase: ""})

  return (
    <form action={formAction}>
    <input hidden readOnly value={teamId} name="teamId"/>
    <input hidden readOnly value={self?.crypto.randomUUID()} name="token"/>

    <Button>
        <UserPlus/>
        Invite
    </Button>
    {state?.link}
    </form>
  )
}

export default InviteButton