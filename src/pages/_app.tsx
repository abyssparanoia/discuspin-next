import * as React from 'react'
import App, { AppInitialProps, AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Global } from 'src/web/components/Global'
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

    console.log(pageProps)

    return (
      <>
        <Head>
          <title>discuspin</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global {...pageProps}>
            <Component {...pageProps} />
          </Global>
        </ThemeProvider>
      </>
    )
  }
}
