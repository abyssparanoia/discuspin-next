import { Injectable, UnauthorizedException } from '@nestjs/common'
import { auth } from '../../firebase/admin'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async verifyIdToken(token: string) {
    const decoedeToken = await auth.verifyIdToken(token).catch(err => {
      throw new UnauthorizedException(err.message)
    })

    return decoedeToken
  }

  async signIn(uid: string): Promise<string> {
    const user = await this.userService.getById(uid)
    const claims = {
      role: user.role
    }
    return auth.createCustomToken(uid, claims)
  }
}
