import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { UserService } from './user/user.service'

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService]
})
export class AppModule {}
