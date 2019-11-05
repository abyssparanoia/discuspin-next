import firebase from 'firebase'

export interface Thread {
  id: string
  title: string
  description: string
  userID: string
  channelID: string
  enabled: boolean
  createdAt: number
  updatedAt: number
}

export const buildThread = (documentID: string, data: firebase.firestore.DocumentData): Thread => ({
  id: documentID,
  title: data.title,
  description: data.description,
  userID: data.userID,
  channelID: data.channelID,
  enabled: data.enabled,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt
})

export const buildThreadCollectionPath = ({ db, channelID }: { db: firebase.firestore.Firestore; channelID: string }) =>
  db
    .collection('channels')
    .doc(channelID)
    .collection('threads')

export const buildThreadReference = ({
  db,
  channelID,
  threadID
}: {
  db: firebase.firestore.Firestore
  channelID: string
  threadID: string
}) => buildThreadCollectionPath({ db, channelID }).doc(threadID)
