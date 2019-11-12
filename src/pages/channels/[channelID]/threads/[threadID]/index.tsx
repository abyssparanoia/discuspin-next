import React from 'react'
import { authenticate } from 'src/web/modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { Credential } from 'src/firebase/interface'
import { useRouter } from 'next/router'

type InitialProps = Credential

type Props = {} & InitialProps

const Thread = (_: Props) => {
  const router = useRouter()
  const channelID = (router.query.channelID as unknown) as string
  const threadID = (router.query.threadID as unknown) as string
  return (
    <>
      <div>channelID: {channelID}</div>
      <div>threadID: {threadID}</div>
      <Link href={{ pathname: '/' }}>
        <a>トップページへ</a>
      </Link>
    </>
  )
}

Thread.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, true)
  return credential!
}

export default Thread
