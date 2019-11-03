import * as admin from 'firebase-admin'

export default admin.initializeApp({
  credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS!))
})

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
