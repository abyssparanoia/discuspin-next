import * as React from 'react'
import App, { Container, AppInitialProps, AppContext } from 'next/app'
import { firebase } from '../firebase/client'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Layout } from 'src/components/Layout'
import Head from 'next/head'
import theme from '../thema'

export default class extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    firebase.auth().onIdTokenChanged(async user => {
      // 認証が有効だった場合、サーバーサイドのtokenとuser情報を更新する
      if (user) {
        const result = await user.getIdTokenResult()
        const { token } = result
        this.setState({ token, userID: user.uid })
        await fetch('/api/sign_in', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ token })
        })
        // 認証が無効だった場合は、サーバーサイドに保存してあるsessionを破棄する
      } else {
        await fetch('/api/sign_out', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>gearchange</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout userID={pageProps && pageProps.userID}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}
