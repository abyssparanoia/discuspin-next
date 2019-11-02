import { useState } from 'react'
import { db } from '../../firebase/client'
import { useEffectAsync } from './util'
import { Channel } from 'modules/entities'
import { getChannels, createChannel } from 'modules/repositories'
import undefined from 'firebase/empty-import'

export const useWatchChannelList = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffectAsync(async () => {
    const unsubscribe = db.collection('channels').onSnapshot(() => {
      getChannels()
        .then(channels => setChannels(channels))
        .catch(err => {
          setError(new Error(`ユーザー一覧の取得に失敗しました [${err}]`))
        })
    })

    return unsubscribe
  })

  return { channels, error }
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
