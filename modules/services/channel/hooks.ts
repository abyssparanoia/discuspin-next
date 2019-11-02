import { useState } from 'react'
import { db } from '../../../firebase/client'
// import { useEffectAsync } from './util'
import * as entities from 'modules/entities'
import { createChannel } from 'modules/repositories'
import { useCollection } from 'react-firebase-hooks/firestore'
import { CreateChannelForm } from './interface'

export const useWatchChannelList = () => {
  const [value, loading, error] = useCollection(db.collection('channels'), {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  const channels = value ? value.docs.map(qsnp => entities.buildChannel(qsnp.id, qsnp.data())) : []

  return { channels, loading, error }
}

export const useCreateChannel = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleSubmit = (values: CreateChannelForm) => {
    setIsLoading(true)
    createChannel(values.name, values.description)
      .then(() => setIsLoading(false))
      .catch(err => {
        setIsLoading(false)
        setError(new Error(`チャンネルの追加に失敗しました ${err}`))
      })
  }

  return { isLoading, error, handleSubmit }
}