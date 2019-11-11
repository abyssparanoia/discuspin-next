import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from './auth.guard'
import { AuthController } from './auth.controller'
import { UserService } from '../user/user.service'

@Module({
  imports: [PassportModule],
  providers: [AuthService, UserService, AuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
