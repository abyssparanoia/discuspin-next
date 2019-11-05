import { useState } from 'react'
import { db } from 'src/firebase/client'
// import { useEffectAsync } from './util'
import * as entities from 'src/web/modules/entities'
import * as repositories from 'src/web/modules/repositories'
import { useCollection } from 'react-firebase-hooks/firestore'
import { CreateChannelForm } from './interface'

export const useWatchChannelList = () => {
  const [value, loading, error] = useCollection(
    entities.buildChannelCollectionPath({ db }).orderBy('updatedAt', 'desc'),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  const channels = value ? value.docs.map(qsnp => entities.buildChannel(qsnp.id, qsnp.data())) : []

  return { channels, loading, error }
}

export const useCreateChannel = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleSubmit = (values: CreateChannelForm) => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .createChannel({ ...values })
      .then(() => setIsLoading(false))
      .catch(err => {
        setIsLoading(false)
        setError(new Error(`チャンネルの追加に失敗しました ${err}`))
      })
  }

  return { isLoading, error, handleSubmit }
}
