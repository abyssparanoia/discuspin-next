import React, { useState } from 'react'
import { Tooltip, Fab, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Link from 'next/link'
import { useWatchThreadList, useCreateThread } from 'src/web/modules/services'
import { CreateThreadForm } from 'src/web/components/moleclues/ThreadForm'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      width: '21vw',
      height: '100%',
      padding: '16px 0px',
      backgroundColor: theme.palette.background.default,
      borderRight: 'solid 1px #424242',
      overflow: 'scroll'
    },
    title: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '0px 12px',
      color: '#1c54b2'
    },
    addBtn: {
      width: '30px',
      height: '30px',
      marginRight: '8px',
      flex: '1 0 auto',
      minHeight: '10px !important'
    },
    dialogContentText: {
      fontSize: '13px'
    },
    dialogFiled: {
      paddingTop: '12px',
      paddingBottom: '12px',
      fontSize: '12px'
    },
    thread: {
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
    threadActive: {
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

interface Props {
  uid: string
}

export const ThreadList = ({ uid }: Props) => {
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const router = useRouter()
  const channelID = router.query.channelID as string
  const threadID = router.query.threadID as string | undefined
  const { handleSubmit } = useCreateThread({ channelID, userID: uid })
  const { threadList } = useWatchThreadList({ channelID })
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-betweeen',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <div className={classes.title}>スレッド一覧</div>
        <Tooltip title="Add" aria-label="Add">
          <Fab color="secondary" className={classes.addBtn} size="small" onClick={() => setIsDialog(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

      {threadList.map(thread => {
        return (
          <div key={thread.id} className={thread.id === threadID ? classes.threadActive : classes.thread}>
            <Link href={`/channels/[channelID]/threads/[threadID]`} as={`/channels/${channelID}/threads/${thread.id}`}>
              <a>{thread.title}</a>
            </Link>
          </div>
        )
      })}
      <Dialog open={isDialog} aria-labelledby="form-dialog-title">
        <DialogContent>
          <CreateThreadForm onSubmit={handleSubmit} onClose={() => setIsDialog(false)} />
        </DialogContent>
        <Button onClick={() => setIsDialog(false)} color="primary">
          キャンセル
        </Button>
      </Dialog>
    </div>
  )
}
