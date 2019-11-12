import * as React from 'react'
import Head from 'next/head'
import { MenuAppBar } from './AppBar'
import { useSignOut } from 'src/web/modules/services'
import { Credential } from 'src/firebase/interface'
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

type Props = Partial<Credential>

export const Global: React.FunctionComponent<Props> = ({ children, uid }) => {
  const { isLoading, error, handleSignOut } = useSignOut()

  const classes = useStyles()

  return (
    <div>
      <Head>
        <title>discuspin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MenuAppBar uid={uid} handleSignOut={handleSignOut} />
      {isLoading && <div>{'loadign....'}</div>}
      {error && <div>{error.message}</div>}
      {uid && (
        <Grid container className={classes.root}>
          <SideBar uid={uid} />
          {children}
        </Grid>
      )}

      {!uid && (
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
