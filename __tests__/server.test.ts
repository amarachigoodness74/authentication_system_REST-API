import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/server';
import connectDB from '../src/utils/dbConnect';
import redisClient from '../src/utils/redisClient';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await redisClient.quit();
  await mongoose.connection.dropCollection('users');
  await mongoose.connection.close();
});

describe('Test server.ts', () => {
  test('Home route', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ message: 'Welcome 🐻' });
  });
  test('Health Check', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.status).toEqual(200);
  });
});
