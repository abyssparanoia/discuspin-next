import { Controller, Post, UseGuards, Req } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
// import { Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(AuthGuard)
  getHello(@Req() request: any): string {
    console.log(request.user)
    return this.appService.getHello()
  }
}
