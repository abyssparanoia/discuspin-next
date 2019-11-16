import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { useSignOut, useUpdateUser } from 'src/web/modules/services'
import { UpdateUserForm } from 'src/web/components/moleclues/UpdateUserForm'

interface Props {
  uid: string
  avatarURL?: string
}

export const UserIcon = ({ uid, avatarURL }: Props) => {
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | undefined>(undefined)
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const { handleSignOut } = useSignOut()
  const { handleSubmit, initialValue } = useUpdateUser({ uid })

  const open = Boolean(anchorEl)

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleCloseMenu = () => setAnchorEl(undefined)

  const handleOpenDialog = () => setIsDialog(true)

  const handleCloseDialog = () => setIsDialog(false)

  const handleCloseDialogAndMenu = () => {
    setIsDialog(false)
    setAnchorEl(undefined)
  }

  return (
    <div>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {avatarURL ? (
          <img
            alt="avatar url"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '8px'
            }}
            src={avatarURL}
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenDialog}>ユーザー情報編集</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
      <Dialog open={isDialog} aria-labelledby="form-dialog-title">
        <DialogContent>
          <UpdateUserForm initialValue={initialValue} onSubmit={handleSubmit} onClose={handleCloseDialogAndMenu} />
        </DialogContent>
        <Button onClick={handleCloseDialog} color="primary">
          キャンセル
        </Button>
      </Dialog>
    </div>
  )
}
