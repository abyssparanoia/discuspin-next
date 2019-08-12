import React from 'react'
import { authenticate } from 'modules/services'
import { ExNextPageContext } from 'next'
import Link from 'next/link'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'

type InitialProps = {
  token: string
  userID: string
}

type Props = {} & InitialProps

const Channels = ({ userID }: Props) => {
  const router = useRouter()
  const channelID = (router.query.channelID as unknown) as string
  return (
    <Layout userID={userID}>
      <div>channelID: {channelID}</div>
      <Link href={{ pathname: '/' }}>
        <a>トップページへ</a>
      </Link>
    </Layout>
  )
}

Channels.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const { userID, token } = await authenticate(req, res, true)
  return { userID: userID!, token: token! }
}

export default Channels
