import express, { Request, Response } from 'express'
import next from 'next'
import * as bodyParser from 'body-parser'
import session, { SessionOptions } from 'express-session'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebaseAdmin, { db, admin } from './firebase/admin'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Credential } from './firebase/interface'
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

declare global {
  namespace Express {
    interface Request {
      firebaseServer: admin.app.App
    }
    interface Session {
      firebaseUser: admin.auth.DecodedIdToken
      credential?: Credential
      firebaseToken: string
    }
  }
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

  server.get('*', (req, res) => handle(req, res))

  // set credential in session store
  server.post('/session', async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400)

    const credential = req.body

    req.session!.credential = credential

    return res.sendStatus(200)
  })

  server.delete('/session', (req: Request, res: Response) => {
    req.session = undefined
    return res.sendStatus(200)
  })

  await nestAppFactory(server)

  return server
}
