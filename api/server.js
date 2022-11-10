import express from "express";
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleSignIn } from "./controllers/signin.js";
import { handleImage } from "./controllers/image.js";
import { handleFaceDetect } from "./controllers/facedetect.js";

// Knex db config
const db = knex({
    client: 'pg',
    connection: {
      host : '10.100.102.2',
      port : 5432,
      user : 'postgres',
      password : 'Uxra1111',
      database : 'face_detection'
    }
  });
console.log(process.env)
// Express config
const app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});

// Routes
app.post('/', (req, res) => res.json({status: 'ok'}));
app.post('/signin', await handleSignIn(db, bcrypt));
app.post('/register', await handleRegister(db, bcrypt));
app.put('/image', await handleImage(db));
app.post('/facedetect', handleFaceDetect);

