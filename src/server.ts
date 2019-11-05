import express, { Request, Response } from 'express'
import next from 'next'
import * as bodyParser from 'body-parser'
import session, { SessionOptions } from 'express-session'
import firebaseAdmin, { db } from './firebase/admin'
import { auth } from 'firebase-admin'
import { FireSessionStore } from './FireSessionStore'
import { nestAppFactory } from './backend/main'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()
const sessionOptions: SessionOptions = {
  name: '__session',
  secret: 'secretString',
  store: new FireSessionStore({ db }),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 604800000 } // week
}

export const appFactory = async () => {
  await app.prepare()
  const server = express()

  server.use(bodyParser.json())
  server.use(session(sessionOptions))

  server.use((req: Request, _: Response, next: Function) => {
    req.firebaseServer = firebaseAdmin
    next()
  })

  // nextjs routing
  server.get('*', (req, res) => handle(req, res))

  // set firebase user in session store
  server.post('/api/sign_in', async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400)

    const { token } = req.body

    const user = (await firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .catch((err: Error) => {
        console.error(err)
        res.status(403).send({ err })
      })) as auth.DecodedIdToken // ここneverとかで返したかった

    req.session!.firebaseUser = user
    req.session!.firebaseToken = token

    return res.sendStatus(200)
  })

  server.post('/api/sign_out', (req: Request, res: Response) => {
    req.session = undefined
    return res.sendStatus(200)
  })

  await nestAppFactory(server)

  return server
}
