import * as React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Layout } from 'src/web/components/Layout'
import Head from 'next/head'
import theme from '../web/thema'

export default class extends App<AppInitialProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>discuspin</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout userID={pageProps && pageProps.userID}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </>
    )
  }
}
