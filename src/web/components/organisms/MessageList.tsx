import React from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageItem } from 'src/web/components/moleclues/MessageItem'
import { Message } from 'src/web/modules/entities'
import { useRouter } from 'next/router'
import { useWatchMessageList } from 'src/web/modules/services/message'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '0px 16px',
      flex: '1 1 0',
      backgroundColor: theme.palette.background.default
    },
    messageCard: {
      width: '100%',
      height: '100%',
      padding: '16px',
      boxSizing: 'border-box',
      overflow: 'scroll',
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[2],
      marginTop: '8px',
      marginBottom: '8px'
    }
  })
)

interface Props {}

export const MessageList = () => {
  const classes = useStyles()
  const router = useRouter()

  const threadID = router.query.threadID as string

  const { messageList } = useWatchMessageList({ threadID })

  return (
    <div className={classes.root}>
      <div className={classes.messageCard}>
        {messageList.map((message: Message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}
