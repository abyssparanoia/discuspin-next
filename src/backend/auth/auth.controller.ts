import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthUser } from './auth.decorator'
import { auth } from 'firebase-admin'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign_in')
  @UseGuards(AuthGuard)
  async signIn(@AuthUser() authUser: auth.DecodedIdToken): Promise<{ token: string }> {
    const token = await this.authService.signIn(authUser.uid)
    return { token }
  }
}
