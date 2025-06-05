import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleImage } from './controllers/image.js';
import { handleFaceDetect } from './controllers/facedetect.js';

export const createApp = async (db) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.get('/', (req, res) => res.json({ status: 'ok' }));
  app.post('/signin', await handleSignIn(db, bcrypt));
  app.post('/register', await handleRegister(db, bcrypt));
  app.put('/image', await handleImage(db));
  app.post('/facedetect', handleFaceDetect);
  return app;
};
