import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import { CameraAlt } from '@material-ui/icons'
import { useSignOut, useUpdateUser } from 'src/web/modules/services'
import { UpdateUserForm } from 'src/web/components/moleclues/UpdateUserForm'

interface Props {
  uid: string
}

export const UserIcon = ({ uid }: Props) => {
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | undefined>(undefined)
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const { handleSignOut } = useSignOut()
  const { handleSubmit, initialValue, handleImageSubmit } = useUpdateUser({ uid })

  const open = Boolean(anchorEl)

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleCloseMenu = () => setAnchorEl(undefined)

  const handleOpenDialog = () => setIsDialog(true)

  const handleCloseDialog = () => setIsDialog(false)

  const handleCloseDialogAndMenu = () => {
    setIsDialog(false)
    setAnchorEl(undefined)
  }

  const getInputImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    return new Promise(resolve => {
      input.onchange = () => {
        resolve(input.files!)
      }
    })
  }

  const handleFileSubmit = async (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const files = (await getInputImage()) as FileList

    if (files) {
      handleImageSubmit(files[0])
    }
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
        {initialValue.avatarURL && (
          <img
            alt="avatar url"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '8px'
            }}
            src={initialValue.avatarURL}
          />
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
          <div
            style={{
              width: '100px',
              height: '100px',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: 'solid 1px #EAEAEA',
              backgroundColor: '#1B88FF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              cursor: 'pointer',
              margin: '20px'
            }}
            onClick={handleFileSubmit}
          >
            <img
              alt="avatar url"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: '0',
                left: '0'
              }}
              src={initialValue.avatarURL}
            />
            <CameraAlt />
          </div>
          <UpdateUserForm initialValue={initialValue} onSubmit={handleSubmit} onClose={handleCloseDialogAndMenu} />
        </DialogContent>
        <Button onClick={handleCloseDialog} color="primary">
          キャンセル
        </Button>
      </Dialog>
    </div>
  )
}
