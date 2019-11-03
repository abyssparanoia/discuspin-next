import * as React from 'react'
import { useWatchChannelList } from 'modules/services'
import ChannelList from '../organisms/ChannelList'
// import { createStyles, Theme, makeStyles, Grid } from '@material-ui/core'

export const SideBar = () => {
  const watchChannelsRef = useWatchChannelList()

  return <ChannelList channels={watchChannelsRef.channels} />
}
