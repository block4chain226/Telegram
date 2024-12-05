import { AuthService } from '../auth.service';
import { Socket } from 'socket.io';
import { NextFunction } from 'express';

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void

export const socketAuthMiddleware = (authService: AuthService): SocketMiddleware => {
  return async (socket: Socket, next) => {
    try {
      const token = socket.handshake.headers.authorization;
      if (token === undefined) next({ name: 'Unauthorized', message: 'user was unauthorized' });
      const payload = await authService.validateRawToken(token);
      if (payload === undefined) next({ name: 'Unauthorized', message: 'user was unauthorized' });
      socket.data.user = payload;
      next();
    } catch (err) {
      next({ name: 'Unauthorized', message: 'user was unauthorized' });
    }
  };
};