import * as admin from 'firebase-admin'

const app = process.env.GCLOUD_PROJECT
  ? admin.initializeApp()
  : admin.initializeApp({
      credential: admin.credential.cert(require('../firebaseAdminKey.json'))
    })

const auth = app.auth()
const db = app.firestore()

export { auth, db, admin }

export default app
