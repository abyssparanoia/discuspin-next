import React, { useState } from 'react'

// material ui
import { Tooltip, Fab, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'
import Link from 'next/link'
import { Channel } from 'modules/entities'
import { useRouter } from 'next/router'
import { CreateChannelForm } from 'components/moleclues/ChannelForm'
import { useCreateChannel } from 'modules/services'

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

interface Props {
  channels: Channel[]
}

export const ChannelList = ({ channels }: Props) => {
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const { handleSubmit } = useCreateChannel()
  const classes = useStyles()
  const router = useRouter()

  const channelID = (router.query.channelID as unknown) as string | undefined

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
        <div className={classes.title}>チャンネル一覧</div>
        <Tooltip title="Add" aria-label="Add">
          <Fab color="secondary" className={classes.addBtn} size="small" onClick={() => setIsDialog(true)}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

      <Link href="/channels/D08XtXEGEflili7X7NOC">
        <a>テスト</a>
      </Link>

      {channels.map(item => {
        return (
          <div key={item.id} className={item.id === channelID ? classes.channelActive : classes.channel}>
            <Link href={`/channels/[channelID]`} as={`/channels/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </div>
        )
      })}
      <Dialog open={isDialog} aria-labelledby="form-dialog-title">
        <DialogContent>
          <CreateChannelForm onSubmit={handleSubmit} onClose={() => setIsDialog(false)} />
        </DialogContent>
        <Button onClick={() => setIsDialog(false)} color="primary">
          キャンセル
        </Button>
      </Dialog>
    </div>
  )
}

export default ChannelList
