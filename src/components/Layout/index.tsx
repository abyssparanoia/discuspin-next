import * as React from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { useSignOut } from 'src/modules/services'
import { SideBar } from './SideBar'
import { createStyles, Theme, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default
    }
  })
)

type Props = {
  title?: string
  userID?: string
}

export const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title', userID }) => {
  const { isLoading, error, handleSignOut } = useSignOut()

  const classes = useStyles()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar userID={userID} handleSignOut={handleSignOut} />
      {isLoading && <div>{'loadign....'}</div>}
      {error && <div>{error.message}</div>}
      {userID && (
        <Grid container className={classes.root}>
          <SideBar />
          {children}
        </Grid>
      )}

      {!userID && (
        <Grid container className={classes.root}>
          {children}
        </Grid>
      )}

      <footer>
        <hr />
        <span> {"I'm here to stay (Footer)"}</span>
      </footer>
    </div>
  )
}
