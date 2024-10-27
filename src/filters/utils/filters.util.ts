export const extractFieldName = (message: string): string => {
  const keyIndex = message.indexOf('Key (');
  const lastIndex = message.indexOf(')');
  return message.slice(keyIndex + 5, lastIndex);
};

export const extractFieldValue = (message: string): string => {
  const keyIndex = message.indexOf(')=(');
  const lastIndex = message.lastIndexOf(')');
  return message.slice(keyIndex + 3, lastIndex);
};