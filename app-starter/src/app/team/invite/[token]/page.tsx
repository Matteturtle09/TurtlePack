import React from 'react'
import { auth } from '../../../../../auth'
import { joinTeam } from '@/server-actions/teams'


const TeamInvitePage = async ({
  params,
}: {
  params: Promise<{ token: string }>
}) => {
  const token = (await params).token
  const session = await auth()
  if(!session?.user){ return }
  const formData = new FormData();
  formData.append("userId", session?.user?.id)
  formData.append("token", token)
  await joinTeam(formData)
  return (
    <></>
  )
}

export default TeamInvitePage