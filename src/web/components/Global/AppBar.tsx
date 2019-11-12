import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// import Link from 'next/link'
import { Credential } from 'src/firebase/interface'
import { Link } from 'src/web/components/atoms'
import { useSignOut } from 'src/web/modules/services'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

interface Props extends Partial<Credential> {}

export const MenuAppBar = ({ uid, avatarURL }: Props) => {
  const classes = useStyles({})
  const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLButtonElement | undefined>(undefined)
  const { handleSignOut } = useSignOut()

  const open = Boolean(anchorEl)

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleClose = () => setAnchorEl(undefined)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">Discuspin</Link>{' '}
          </Typography>
          {uid && (
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
                onClose={handleClose}
              >
                <MenuItem>
                  <Link href="/login_required">
                    <a>Login Required</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          {!uid && <Link href="/sign_in">SignIn</Link>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
