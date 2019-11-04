import * as admin from 'firebase-admin'

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
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
