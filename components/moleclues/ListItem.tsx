import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core'

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
  item?: Object
}

const ListItem: React.StatelessComponent<ItemType> = props => {
  const classes = useStyles()
  return (
    <div
      className={props.isActive ? classes.channelActive : classes.channel}
      //   onClick={(e: React.MouseEvent) => (props.onClick ? props.onClick(e, item!) : null)}
    >
      {props.title}
    </div>
  )
}

export default ListItem
