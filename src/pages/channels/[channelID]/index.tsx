import React from 'react'
import { authenticate } from 'src/web/modules/services'
import { ExNextPageContext } from 'next'
import { Credential } from 'src/firebase/interface'
import Link from 'next/link'
import { useRouter } from 'next/router'

type InitialProps = Credential

type Props = {} & InitialProps

const Channel = (_: Props) => {
  const router = useRouter()
  const channelID = (router.query.channelID as unknown) as string
  return (
    <>
      <div>channelID: {channelID}</div>
      <Link href={{ pathname: '/' }}>
        <a>トップページへ</a>
      </Link>
    </>
  )
}

Channel.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, true)
  return credential!
}

export default Channel
