import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new HttpException({ message: 'no authrization header' }, HttpStatus.UNAUTHORIZED)
    }

    const token = authorization.slice(7)
    const decodedToken = await this.authService.verifyIdToken(token)
    request.user = decodedToken
    return true
  }
}
