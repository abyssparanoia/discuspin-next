import { db } from 'src/firebase/client'
import { Thread } from 'src/web/modules/entities'
import moment from 'moment'

export const createThread = async (title: string, description: string, channel_id: string, user_id: string) => {
  const newDoc = db.collection('threads').doc()
  const data: Thread = {
    id: newDoc.id,
    title: title,
    description: description,
    userID: user_id,
    channelID: channel_id,
    enabled: true,
    createdAt: +moment().format('X'),
    updatedAt: +moment().format('X')
  }
  await newDoc.set(data).catch(error => {
    throw new Error(`firestoreへの投稿に失敗しました [${error}]`)
  })

  return newDoc.id
}
