import React from 'react'
import { ExNextPageContext } from 'next'
import Router from 'next/router'
import { useSignInWithGoogle } from 'src/web/modules/services'
import { auth } from 'src/firebase/client'

type Props = {}

const SignIn = (_: Props) => {
  const { handleSignIn } = useSignInWithGoogle()

  return (
    <>
      <div>ログインページ</div>
      <button onClick={handleSignIn}>SignIn</button>
    </>
  )
}

SignIn.getInitialProps = async ({ req, res }: ExNextPageContext): Promise<void> => {
  // ログイン済みだった場合はredirectを行う
  // サーバー上での処理
  if (req && req.session && req.session.firebaseUser) {
    res!.writeHead(302, {
      Location: '/'
    })
    res!.end()
    // ブラウザ上での処理
  } else {
    if (auth.currentUser) {
      Router.push('/')
    }
  }
}

export default SignIn
