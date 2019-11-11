export interface Credential {
  uid: string
  token: string
  role: 'admin' | 'member'
}
