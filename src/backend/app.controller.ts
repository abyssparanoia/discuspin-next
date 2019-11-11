import { Controller, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
import { AuthUser } from './auth/auth.decorator'
import { auth } from 'firebase-admin'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(AuthGuard)
  getHello(@AuthUser() authUser: auth.DecodedIdToken): auth.DecodedIdToken {
    console.log(authUser)
    return authUser
  }
}
