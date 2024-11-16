import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUser = createParamDecorator((data: any, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  console.log('ctx.getContext().req.user', ctx.getContext().req.user);
  return ctx.getContext().req.user;
});