export enum EventEnum {
  message = 'message',
  getOfline = 'getOfline',
  getOnline = 'getOnline',
  joinChat = 'joinChat',
  leftChat = 'leftChat',
  lastSeen = 'lastSeen',
}

export enum RedisProperty {
  usersLastSeen = 'users:lastSeen',
  usersOnline = 'users:online',
}