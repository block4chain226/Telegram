import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { WsExceptionsHandler } from '@nestjs/websockets/exceptions/ws-exceptions-handler';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(WsException)
export class AllWsExceptions extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('=>(ws-exception.filter.ts:7) exception', exception);
    console.log('exccccccc');
    const client = host.switchToWs().getClient();
    return { ws: 'sw' };
  }
}