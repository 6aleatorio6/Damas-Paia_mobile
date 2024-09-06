import { delay, http, HttpResponse } from 'msw';
import { mswRouter } from './utils';

export const dbMock = new Map<string, User>();

const httpDelay = http.all('*', () => delay('real'));

const handlersPublic = [
  http.post('*/user', async ({ request }) => {
    const { username, email, password } = ((await request.json()) as Record<string, string>) || {};

    if (!username || !email || !password) {
      return HttpResponse.json({ message: 'Invalid body' }, { status: 400 });
    }

    dbMock.set(username, { username, email, password, uuid: Math.random().toString(10) });
    return HttpResponse.json({}, { status: 201 });
  }),
  http.post('*/auth/login', async ({ request }) => {
    const { username, password } = ((await request.json()) as Record<string, string>) || {};
    const user = dbMock.get(username);

    if (!user || user.password !== password) {
      return HttpResponse.json({ message: 'Invalid user or password' }, { status: 401 });
    }

    return HttpResponse.json({ token: user.username }, { status: 200 });
  }),
] as const;

const handlersPrivate = [
  http.get(
    '*/auth/refresh',
    mswRouter((_, user) => HttpResponse.json({ token: user.username })),
  ),

  http.get(
    '*/user',
    mswRouter((_, user) => HttpResponse.json(user)),
  ),

  http.delete(
    '*/user',
    mswRouter((_, user) => {
      dbMock.delete(user.username);
      return HttpResponse.json(null, { status: 204 });
    }),
  ),

  http.put(
    '*/user',
    mswRouter(async (info, user) => {
      const body = ((await info.request.json()) as Record<string, string>) || {};

      dbMock.set(user.username, { ...user, ...body });
      return HttpResponse.json(user, { status: 200 });
    }),
  ),
] as const;

export const handlers = [httpDelay, ...handlersPublic, ...handlersPrivate] as const;
