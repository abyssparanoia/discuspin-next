export interface Credential {
  uid: string
  token: string
  displayName: string
  avatarURL: string
  role: 'admin' | 'member'
}
