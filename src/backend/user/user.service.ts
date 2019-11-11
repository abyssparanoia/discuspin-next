import { Injectable, NotFoundException } from '@nestjs/common'
import { db, admin } from '../../firebase/admin'

interface UserEntity {
  id: string
  displayName: string
  avatarURL: string
  position?: string
  description?: string
  role: 'admin' | 'member'
  updatedAt: number
  createdAt: number
}

@Injectable()
export class UserService {
  async getById(userID: string): Promise<UserEntity> {
    const dsnp = await db
      .collection('users')
      .doc(userID)
      .get()

    if (!dsnp.exists) {
      throw new NotFoundException('user not found')
    }

    return this.buildUser(dsnp.id, dsnp.data()!)
  }

  private buildUser = (documentID: string, data: admin.firestore.DocumentData): UserEntity => ({
    id: documentID,
    displayName: data.displayName,
    description: data.description,
    avatarURL: data.avatarURL,
    position: data.position!,
    role: data.role || 'member',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  })
}
