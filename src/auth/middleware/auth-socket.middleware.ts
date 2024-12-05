import { AuthService } from '../auth.service';
import { Socket } from 'socket.io';

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void

export const socketAuthMiddleware = (authService: AuthService): SocketMiddleware => {
  return async (socket: Socket, next) => {
    try {
      const token = socket.handshake.headers.authorization;
      if (token === undefined) next({ name: 'Unauthorized', message: 'user was unauthorized' });
      const payload = await authService.validateRawToken(token);
      console.log('=>(auth-socket.middleware.ts:11) payload', payload);
      if (payload === undefined) next({ name: 'Unauthorized', message: 'user was unauthorized' });
      socket.data.user = payload;
      next();
    } catch (err) {
      next({ name: 'Unauthorized', message: 'user was unauthorized' });
    }
  };
};