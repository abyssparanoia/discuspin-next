import * as React from 'react'
import { ChannelList } from '../organisms/ChannelList'
import { ThreadList } from '../organisms/ThreadList'
import { useRouter } from 'next/router'

interface Props {
  userID: string
}

export const SideBar = ({ userID }: Props) => {
  const router = useRouter()
  const channelID = router.query.channelID as string | undefined
  const threadID = router.query.threadID as string | undefined

  return (
    <>
      <ChannelList channelID={channelID} />
      {channelID && <ThreadList channelID={channelID} threadID={threadID} userID={userID} />}
    </>
  )
}
