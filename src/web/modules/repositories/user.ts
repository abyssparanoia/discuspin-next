import { db, auth } from 'src/firebase/client'
import { User, buildUser, buildUserReference } from 'src/web/modules/entities'
import moment from 'moment'

export const fetchMe = async (): Promise<User | undefined> => {
  if (!auth.currentUser) return undefined
  const userID = auth.currentUser.uid
  const doc = await buildUserReference({ db, userID }).get()
  if (!doc.exists) return undefined
  return buildUser(doc.id, doc.data()!)
}

export const fetchUserOrFail = async (userID: string): Promise<User> => {
  const doc = await buildUserReference({ db, userID }).get()
  if (!doc.exists) throw new Error('ユーザーが見つかりませんでした')
  return buildUser(doc.id, doc.data()!)
}

export const createUser = async (
  userID: string,
  displayName: string,
  position?: string,
  description?: string,
  avatarURL?: string
) => {
  const timestamp = moment().format('X')
  const data: User = {
    id: userID,
    displayName,
    position,
    description,
    avatarURL:
      avatarURL ||
      'https://firebasestorage.googleapis.com/v0/b/discuspin.appspot.com/o/images%2Fdefaulticon.png?alt=media&token=d8fd8be0-e11a-441d-9b0b-a806cd563a83',
    createdAt: +timestamp,
    updatedAt: +timestamp
  }
  try {
    await buildUserReference({ db, userID }).set(data)
    return data
  } catch (error) {
    throw new Error(`ユーザーの追加に失敗しました${error}`)
  }
}

export const updateUser = async (
  userID: string,
  displayName?: string,
  position?: string,
  description?: string,
  avatarURL?: string
): Promise<User> => {
  const user = await fetchUserOrFail(userID)

  const timestamp = +moment().format('X')

  const data: Omit<User, 'id' | 'createdAt'> = {
    updatedAt: timestamp,
    displayName: displayName || '名無しさん',
    position: position,
    description: description,
    avatarURL:
      avatarURL ||
      'https://firebasestorage.googleapis.com/v0/b/discuspin.appspot.com/o/images%2Fdefaulticon.png?alt=media&token=d8fd8be0-e11a-441d-9b0b-a806cd563a83'
  }

  await buildUserReference({ db, userID })
    .update(data)
    .catch(error => {
      throw new Error(`ユーザーの編集に失敗しました${error}`)
    })

  return { ...user, ...data }
}
