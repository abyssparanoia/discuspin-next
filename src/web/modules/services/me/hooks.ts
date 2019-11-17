import { useState } from 'react'
import * as repositories from 'src/web/modules/repositories'
import { useEffectAsync } from '../util'
import { IUpdateUserForm } from './interface'

export const useUpdateUser = ({ uid }: { uid: string }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [initialValue, setInitialValue] = useState<IUpdateUserForm>({})

  useEffectAsync(() => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .fetchUserOrFail(uid)
      .then(user => {
        setIsLoading(false)
        if (user) {
          setInitialValue({
            displayName: user.displayName,
            description: user.description,
            position: user.position,
            avatarURL: user.avatarURL
          })
        }
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }, [])

  const handleSubmit = ({ displayName, position, description, avatarURL }: IUpdateUserForm) => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .updateMe(displayName, position, description, avatarURL)
      .then(() => {
        setInitialValue({ displayName, position, description, avatarURL })
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  const handleImageSubmit = (file: File) => {
    setIsLoading(true)
    setError(undefined)
    repositories
      .uploadImage(file)
      .then(url => {
        setInitialValue({ ...initialValue, avatarURL: url })
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        setError(err)
      })
  }

  return { initialValue, isLoading, error, handleSubmit, handleImageSubmit }
}
