import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import { Express } from 'express'

export const nestAppFactory = async (server: Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server))
  app.setGlobalPrefix('v1/api')
  return app.init()
}
