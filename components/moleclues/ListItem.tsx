import React from 'react'
import { createStyles, Theme, makeStyles, Button } from '@material-ui/core'
import Link from 'next/link'
import { Channel } from 'modules/entities'
import Router from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    channel: {
      fontSize: '13px',
      padding: '24px 12px',
      cursor: 'pointer',
      transition: '128ms',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      '&:hover': {
        background: '#424242'
      }
    },
    channelActive: {
      fontSize: '13px',
      padding: '24px 12px',
      cursor: 'pointer',
      transition: '128ms',
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
      color: theme.palette.text.primary
    }
  })
)

type ItemType = {
  title: string
  isActive: boolean
  item: Channel
}

const ListItem: React.StatelessComponent<ItemType> = props => {
  const classes = useStyles()
  return (
    <div className={props.isActive ? classes.channelActive : classes.channel}>
      <Link href={{ pathname: `/channels/${props.item.id}` }}>
        <a>{props.title}</a>
      </Link>
      <Button onClick={() => Router.push('/channels/${props.item.id}')}>aaaa</Button>
    </div>
  )
}

export default ListItem
