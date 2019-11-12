import { auth, firebase, FirebaseAuthenticationError } from 'src/firebase/client'
import { Credential } from 'src/firebase/interface'
import { AxiosClient } from './httpClient'
import { fetchMe, createUser } from './user'

export const signInWithGoogle = async () => {
  const userCredential = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  const firebaseUser = userCredential.user!

  const user = await fetchMe()

  // ユーザーが存在しなかった場合、デフォルト情報で作成
  if (!user) {
    await createUser(firebaseUser.uid, firebaseUser.displayName || undefined, firebaseUser.photoURL || undefined)
  }

  await createSession(firebaseUser)
}

interface ISignInWithEmailAndPassword {
  email: string
  password: string
}

export const signInWithEmailAndPassword = ({ email, password }: ISignInWithEmailAndPassword) =>
  auth.signInWithEmailAndPassword(email, password)

export const signOut = async () => {
  await new AxiosClient({ url: `/session` }).delete()
  await auth.signOut()
}

export const createSession = async (firebaseUser: firebase.User | null) => {
  if (!firebaseUser) {
    throw new Error('認証に失敗しました')
  }

  const idTokenResult = await firebaseUser.getIdTokenResult(true).catch(err => {
    throw new FirebaseAuthenticationError(err)
  })

  const res = await new AxiosClient({ url: `/v1/api/sign_in`, token: idTokenResult.token }).post<{ token: string }>({})

  const result = await auth.signInWithCustomToken(res.data.token)

  const newIdTokenResult = await result.user!.getIdTokenResult()

  const credential: Credential = {
    uid: firebaseUser.uid,
    token: newIdTokenResult.token,
    displayName: firebaseUser.displayName || '名無しさん',
    avatarURL:
      firebaseUser.photoURL ||
      'https://firebasestorage.googleapis.com/v0/b/discuspin.appspot.com/o/images%2Fdefaulticon.png?alt=media&token=d8fd8be0-e11a-441d-9b0b-a806cd563a83',
    role: newIdTokenResult.claims.role
  }

  await new AxiosClient({ url: `/session`, token: idTokenResult.token }).post({ ...credential })

  return credential
}
