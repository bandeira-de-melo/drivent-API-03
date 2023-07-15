import supertest from 'supertest';
import httpStatus from 'http-status';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  init();
});

beforeEach(async () => {
  cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 401 if no token is given', async () => {
    const result = await server.get('/hotels');

    expect(result.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
