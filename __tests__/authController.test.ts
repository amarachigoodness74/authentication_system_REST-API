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

describe('Auth Controller', () => {
  let userId: string;
  const user = {
    name: 'Tester',
    email: 'test@example.com',
    password: 'hashedPass@2025',
  };

  test('POST /signup - should create a user and return 201', async () => {
    const response = await request(app).post('/auth/signup').send(user);
    userId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.payload.email).toBe(user.email);
  });

  test('POST /login - should return access token on successful login', async () => {
    const response = await request(app).post('/auth/login').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body).toHaveProperty('payload.accessToken');
    expect(response.body.payload.accessToken).toBeDefined();
  });

  test('POST /login - should return 406 if user is invalid', async () => {
    const response = await request(app).post('/auth/login').send({
      email: user.email,
      password: 'wrongpassword',
    });

    expect(response.status).toBe(406);
  });

  test('POST /forgot-password should return a reset token if user exists', async () => {
    const response = await request(app).post('/auth/forgot-password').send({
      email: user.email,
    });

    expect(response.status).toBe(200);
  });
});
