import { useState } from 'react'
import * as repositories from 'src/web/modules/repositories'
import { User } from 'src/web/modules/entities'
import { useEffectAsync } from '../util'
import { IUpdateUserForm } from './interface'
import undefined from 'firebase/empty-import'

export const useUpdateUser = ({ uid }: { uid: string }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [initialValue, setInitialValue] = useState<User | undefined>(undefined)

  useEffectAsync(() => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .fetchUserOrFail(uid)
      .then(user => {
        setIsLoading(false)
        setInitialValue(user)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  })

  const handleSubmit = (values: IUpdateUserForm) => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .updateUser(uid, values.description, values.position, values.description, undefined)
      .then(() => {
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { initialValue, isLoading, error, handleSubmit }
}
