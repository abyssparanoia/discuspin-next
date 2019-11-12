import { useState } from 'react'
import { fetchUserOrFail } from 'src/web/modules/repositories'
import { User } from 'src/web/modules/entities'
import { useEffectAsync } from '../util'

export const useUpdateUser = ({ uid }: { uid: string }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffectAsync(() => {
    setIsLoading(true)
    setError(undefined)
    fetchUserOrFail(uid)
      .then(user => {
        setIsLoading(false)
        setUser(user)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  })

  return { user, isLoading, error }
}
