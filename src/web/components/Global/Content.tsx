import * as React from 'react'
import { ChannelList } from '../organisms/ChannelList'
import { ThreadList } from '../organisms/ThreadList'
import { useRouter } from 'next/router'

interface Props {
  uid: string
}

export const Content = ({ uid }: Props) => {
  const router = useRouter()
  const channelID = router.query.channelID as string | undefined

  return (
    <>
      <ChannelList />
      {channelID && <ThreadList uid={uid} />}
    </>
  )
}
