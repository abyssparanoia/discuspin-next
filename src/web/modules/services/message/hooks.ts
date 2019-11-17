import { useState } from 'react'
import { db } from 'src/firebase/client'
import * as entities from 'src/web/modules/entities'
import * as repositories from 'src/web/modules/repositories'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffectAsync } from '../util'
import { Message } from 'src/web/modules/entities'

export const useWatchMessageList = async ({ threadID }: { threadID: string }) => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const [value, loading, error] = useCollection(
    entities.buildMessageCollectionPath({ db, threadID }).orderBy('updatedAt', 'desc'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  useEffectAsync(async () => {
    const newMesasgeList = await Promise.all(
      value
        ? value.docs.map(async qsnp => {
            const user = await repositories.fetchUserOrFail(qsnp.data().userID)
            return entities.buildMessage(qsnp.id, qsnp.data(), user)
          })
        : []
    )
    setMessageList(newMesasgeList)
  }, [value])

  return { messageList, loading, error }
}
