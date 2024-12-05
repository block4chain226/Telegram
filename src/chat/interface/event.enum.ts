export enum EventEnum {
  message = 'message',
  getOfline = 'getOfline',
  getOnline = 'getOnline',
  joinChat = 'joinChat',
  leftChat = 'leftChat',
}

export enum RedisProperty {
  usersLastSeen = 'users:lastSeen',
  usersOnline = 'users:online',
}