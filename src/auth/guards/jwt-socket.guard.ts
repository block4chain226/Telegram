import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'socket.io';

@Injectable()
export class JwtSocketGuard extends AuthGuard('jwt-socket') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token: string | string[] = client.handshake.query.token;

    //Extract the token from query
    if (token === undefined) {
      throw new UnauthorizedException();
    }

    const authtoken: string = Array.isArray(token) ? token[0] : token;
    client.data.token = authtoken; // Set the token on the Socket object

    return super.canActivate(context);
  }
}