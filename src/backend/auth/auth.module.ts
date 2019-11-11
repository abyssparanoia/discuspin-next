import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [PassportModule],
  providers: [AuthService, AuthGuard]
})
export class AuthModule {}
