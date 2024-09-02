import { delay, http, HttpResponse } from 'msw';

export const dbMock = new Map<string, { username: string; email: string; password: string; uuid: string }>();
const gerateId = () => Math.random().toString(10);

export const handlers = [
  http.all('*', () => delay(100)),
  http.post('*/user', async ({ request }) => {
    const { username, email, password } = ((await request.json()) as any) || {};

    if (!username || !email || !password) {
      return HttpResponse.json({ message: 'Invalid body' }, { status: 400 });
    }

    dbMock.set(username, { username, email, password, uuid: gerateId() });

    return HttpResponse.json({}, { status: 201 });
  }),
  http.post('*/auth/login', async ({ request }) => {
    const { username, password } = ((await request.json()) as any) || {};
    const user = dbMock.get(username);

    if (!user || user.password !== password) {
      return HttpResponse.json({ message: 'Invalid user or password' }, { status: 401 });
    }

    return HttpResponse.json({ token: user.username }, { status: 200 });
  }),
  http.get('*/user', ({ cookies }) => {
    const token = cookies['Authorization']?.replace('Bearer ', '');
    const user = dbMock.get(token);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json(user, { status: 200 });
  }),
  http.delete('*/user', ({ cookies }) => {
    const token = cookies['Authorization']?.replace('Bearer ', '');
    const user = dbMock.get(token);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    dbMock.delete(user.username);

    return HttpResponse.json({}, { status: 204 });
  }),
  http.put('*/user', async ({ request, cookies }) => {
    const token = cookies['Authorization']?.replace('Bearer ', '');
    const user = dbMock.get(token);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { username, email, password } = ((await request.json()) as any) || {};

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    return HttpResponse.json({}, { status: 200 });
  }),
] as const;
