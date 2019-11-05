import { db } from 'src/firebase/client'
import { Channel } from 'src/web/modules/entities/channel'
import moment from 'moment'

export const createChannel = async ({ title, description }: { title: string; description: string }) => {
  const newDoc = db.collection('channels').doc()
  const data: Channel = {
    id: newDoc.id,
    title,
    description,
    enabled: true,
    createdAt: +moment().format('X'),
    updatedAt: +moment().format('X')
  }
  await newDoc.set(data).catch(error => {
    throw new Error(`firestoreへの投稿に失敗しました [${error}]`)
  })

  return newDoc.id
}
