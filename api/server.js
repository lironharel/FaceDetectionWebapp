import knex from 'knex';
import { createApp } from './app.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.ELEPHANTSQL_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = await createApp(db);
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
};

start();
