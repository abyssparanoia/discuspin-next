import { useState } from 'react'
import { db } from '../../firebase/client'
// import { useEffectAsync } from './util'
import * as entities from 'modules/entities'
import { createChannel } from 'modules/repositories'
import { useCollection } from 'react-firebase-hooks/firestore'

export const useWatchChannelList = () => {
  const [value, loading, error] = useCollection(db.collection('channels'), {
    snapshotListenOptions: { includeMetadataChanges: true }
  })

  const channels = value ? value.docs.map(qsnp => entities.buildChannel(qsnp.id, qsnp.data())) : []

  return { channels, loading, error }
}

interface CreateChannelForm {
  name: string
  description: string
}

export const useCreateChannel = () => {
  const [values, setValues] = useState<CreateChannelForm>({ name: '', description: '' })
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const handleChange = (target: keyof CreateChannelForm) => (e: any) => {
    values[target] = e.target.value
    setValues(values)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    createChannel(values.name, values.description)
      .then(() => setIsLoading(false))
      .catch(err => {
        setIsLoading(false)
        setError(new Error(`チャンネルの追加に失敗しました ${err}`))
      })
  }

  return { isLoading, error, handleChange, handleSubmit }
}
