import * as React from 'react'
import { useWatchChannels } from 'modules/services'
import ChannelList from '../organisms/ChannelList'
// import { createStyles, Theme, makeStyles, Grid } from '@material-ui/core'

export const SideBar = () => {
  const watchChannelsRef = useWatchChannels()

  return <ChannelList channels={watchChannelsRef.channels} />
}
