import axios from 'axios';

export function formatError(error: Error) {
  if (!axios.isAxiosError<{ message?: string | string[] }>(error)) return error.message;

  let message = error?.response?.data?.message;
  if (!message) message = error?.message;
  if (Array.isArray(message)) message = message.join('\n');

  return message;
}
