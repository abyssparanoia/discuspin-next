import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from './auth.guard'
import { AuthController } from './auth.controller'

@Module({
  imports: [PassportModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
