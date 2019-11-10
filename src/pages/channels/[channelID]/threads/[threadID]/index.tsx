import React from 'react'
import { authenticate } from 'src/web/modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type InitialProps = {
  token: string
  userID: string
}

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
  const { userID, token } = await authenticate(req, res, true)
  return { userID: userID!, token: token! }
}

export default Thread
