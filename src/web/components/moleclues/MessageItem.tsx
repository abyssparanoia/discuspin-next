import React from 'react'
import { Message } from 'src/web/modules/entities'
import ReactMarkdown from 'react-markdown'
import Box from '@material-ui/core/Box'
import moment from 'moment'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      marginBottom: '24px'
    },
    avator: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '8px',
      objectFit: 'cover',
      boxShadow: '0px 2px #000000'
    },
    username: {
      fontSize: '12px',
      color: 'white',
      marginRight: '12px',
      textShadow: theme.shadows[2]
    },
    fromnow: {
      fontSize: '10px',
      color: '#CCCCCC',
      textShadow: theme.shadows[2]
    },
    messageBody: {
      fontSize: '14px',
      padding: '10px 12px',
      borderRadius: '6px',
      wordBreak: 'break-all',
      cursor: 'pointer',
      backgroundColor: theme.palette.background.paper,
      color: 'white',
      '&:hover': {
        boxShadow: theme.shadows[5]
      }
    }
  })
)

interface Props {
  message: Message
}

export const MessageItem = ({ message }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div>
        <img alt="user avatar" className={classes.avator} src={message.user.avatarURL} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div className={classes.username}>{message.user.displayName}</div>
          <div className={classes.fromnow}>{moment(message.createdAt, 'X').fromNow()}</div>
        </div>

        <Box boxShadow={1} className={classes.messageBody}>
          <ReactMarkdown source={message.body} className="markdown" />
        </Box>
      </div>
    </div>
  )
}
