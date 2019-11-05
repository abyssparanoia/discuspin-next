import * as React from 'react'
import { useWatchChannelList } from 'src/web/modules/services'
import ChannelList from '../organisms/ChannelList'
import { useRouter } from 'next/router'

export const SideBar = () => {
  const watchChannelsRef = useWatchChannelList()
  const router = useRouter()
  const channelID = router.query.channelID as string | undefined

  return <ChannelList channels={watchChannelsRef.channels} channelID={channelID} />
}
