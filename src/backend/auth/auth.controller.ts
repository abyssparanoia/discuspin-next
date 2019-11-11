import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthUser } from './auth.decorator'
import { auth } from 'firebase-admin'

@Controller()
export class AuthController {
  @Post('/sign_in')
  @UseGuards(AuthGuard)
  signIn(@AuthUser() authUser: auth.DecodedIdToken): auth.DecodedIdToken {
    console.log(authUser)
    return authUser
  }
}
