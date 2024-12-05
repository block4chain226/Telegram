import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthJwtSocketGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization;
    console.log('=>(auth-jwt-socket.guard.ts:9) token', token);
    return true;
  }
}