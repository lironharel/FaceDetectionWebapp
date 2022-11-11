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
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

//   console.log("DB: ", db)
// Express config
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

// Routes
app.get('/', (req, res) => res.json({status: 'ok'}));
app.post('/signin', await handleSignIn(db, bcrypt));
app.post('/register', await handleRegister(db, bcrypt));
app.put('/image', await handleImage(db));
app.post('/facedetect', handleFaceDetect);

