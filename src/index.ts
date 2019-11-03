import { nextAppFactory } from './server'
import * as functions from 'firebase-functions'

export const nextApp = functions.https.onRequest(async (req, res) => {
  const server = await nextAppFactory()
  server(req as any, res as any)
})
