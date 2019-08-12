import React from 'react'

// material ui
// import { Tooltip, Fab } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
// import AddIcon from '@material-ui/icons/Add'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import Dialog from '@material-ui/core/Dialog'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'
import ListItem from '../moleclues/ListItem'
import { Channel } from 'modules/entities'

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
    }
  })
)

interface Props {
  channels: Channel[]
}

export const ChannelList = ({ channels }: Props) => {
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
        <div className={classes.title}>チャンネル一覧</div>
        {/* <Tooltip title="Add" aria-label="Add">
              <Fab color="secondary" className={classes.addBtn} size="small" onClick={this.handleClickOpen}>
                <AddIcon />
              </Fab>
            </Tooltip> */}
      </div>

      {channels.map(item => {
        return (
          <ListItem
            item={item}
            key={item.id}
            title={item.title}
            // isActive={item.id === channelID}
            isActive={false}
            // onClick={this.handleSelectChannel}
          />
        )
      })}
    </div>
  )
}

export default ChannelList
