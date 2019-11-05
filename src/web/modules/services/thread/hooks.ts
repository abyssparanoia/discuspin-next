import { useState } from 'react'
import { db } from 'src/firebase/client'
import * as entities from 'src/web/modules/entities'
import * as repositories from 'src/web/modules/repositories'
import { useCollection } from 'react-firebase-hooks/firestore'
import { CreateThreadForm } from './interface'

export const useWatchThreadList = ({ channelID }: { channelID: string }) => {
  const [value, loading, error] = useCollection(
    entities.buildThreadCollectionPath({ db, channelID }).orderBy('updatedAt', 'desc'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  const threads = value ? value.docs.map(qsnp => entities.buildThread(qsnp.id, qsnp.data())) : []

  return { threads, loading, error }
}

export const useCreateThread = ({ channelID, userID }: { channelID: string; userID: string }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleSubmit = (values: CreateThreadForm) => {
    setError(undefined)
    setIsLoading(true)
    repositories
      .createThread({ ...values, channelID, userID })
      .then(() => setIsLoading(false))
      .catch(err => {
        setIsLoading(false)
        setError(new Error(`スレッドの追加に失敗しました ${err}`))
      })
  }

  return { isLoading, error, handleSubmit }
}
