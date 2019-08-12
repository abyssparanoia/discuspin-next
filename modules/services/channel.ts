import { useState } from 'react'
import { db } from '../../firebase/client'
import { useEffectAsync } from './util'
import { Channel } from 'modules/entities'
import { getChannels } from 'modules/repositories'

export const useWatchChannels = () => {
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
