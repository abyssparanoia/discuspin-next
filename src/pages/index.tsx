import React from 'react'
import { ExNextPageContext } from 'next'
import { authenticate } from '../web/modules/services'
import { Credential } from 'src/firebase/interface'
import Link from 'next/link'

type InitialProps = Partial<Credential>

type Props = {} & InitialProps

const Index = ({ uid }: Props) => {
  return (
    <>
      {uid && (
        <>
          <div>認証時はこれが表示される</div>
          <div>firebase uid: {uid}</div>
        </>
      )}

      {!uid && (
        <>
          <div>未認証時はこれが表示される</div>
        </>
      )}
      <Link href={{ pathname: '/login_required' }}>
        <a>ログイン必要ページへ</a>
      </Link>
    </>
  )
}

Index.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<InitialProps> => {
  const credential = await authenticate(req, res, true)
  if (!credential) return {}
  return credential
}

export default Index
