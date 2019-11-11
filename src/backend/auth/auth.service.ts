import { Injectable, UnauthorizedException } from '@nestjs/common'
import { auth } from '../../firebase/admin'

@Injectable()
export class AuthService {
  constructor() {}

  async verifyIdToken(token: string) {
    const decoedeToken = await auth.verifyIdToken(token).catch(err => {
      throw new UnauthorizedException(err.message)
    })

    return decoedeToken
  }
}
