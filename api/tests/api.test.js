import request from 'supertest';
import knex from 'knex';
import bcrypt from 'bcrypt';
import { createApp } from '../app.js';

let app;
let db;

beforeAll(async () => {
  db = knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  });

  await db.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.timestamp('joined');
    table.integer('entries');
  });

  await db.schema.createTable('login', table => {
    table.increments('id').primary();
    table.string('hash');
    table.string('email').unique();
  });

  app = await createApp(db);
});

afterAll(async () => {
  await db.destroy();
});

test('register endpoint creates user', async () => {
  const res = await request(app)
    .post('/register')
    .send({ name: 'Test', email: 'test@example.com', password: 'pass' });
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('ok');
  expect(res.body.user).toHaveProperty('id');
});

test('signin endpoint returns user', async () => {
  const password = 'secret';
  const hash = await bcrypt.hash(password, 10);
  await db('login').insert({ hash, email: 'signin@example.com' });
  await db('users').insert({ name: 'Signin', email: 'signin@example.com', joined: new Date(), entries: 0 });

  const res = await request(app)
    .post('/signin')
    .send({ email: 'signin@example.com', password });
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('ok');
  expect(res.body.user.email).toBe('signin@example.com');
});
