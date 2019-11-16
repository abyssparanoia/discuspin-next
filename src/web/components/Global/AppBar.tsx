import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Credential } from 'src/firebase/interface'
import { Link } from 'src/web/components/atoms'
import { UserIcon } from 'src/web/components/organisms/UserIcon'

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
          {uid && <UserIcon uid={uid} avatarURL={avatarURL} />}
          {!uid && <Link href="/sign_in">SignIn</Link>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
