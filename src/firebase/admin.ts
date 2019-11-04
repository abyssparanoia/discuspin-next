import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert(require('../firebaseAdminKey.json'))
})

const app = admin.initializeApp({
  credential: admin.credential.cert(require('../firebaseAdminKey.json'))
})

const auth = app.auth()
const db = app.firestore()

export { auth, db }

export default app

declare global {
  namespace Express {
    interface Request {
      firebaseServer: admin.app.App
    }
    interface Session {
      firebaseUser: admin.auth.DecodedIdToken
      firebaseToken: string
    }
  }
}
