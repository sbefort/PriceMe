import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { UserInterface } from './User'
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Uses environment variables from .env file
const pool = new Pool({ssl: { rejectUnauthorized: false }});

const LocalStrategy = passportLocal.Strategy

// Middleware
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  session({
    secret: 'SuperDuperSecretishSecret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username: string, password: string, done) => {
  try {
    const dbResult = await pool.query(`SELECT username, password FROM public.user WHERE USERNAME = $1 LIMIT 1;`, [username]);
    if (dbResult.rowCount === 0) return done(null, false);
    bcrypt.compare(password, dbResult.rows[0].password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, { user: {username: dbResult.rows[0].username }});
      } else {
        return done(null, false);
      }
    });
  } catch (err) {
    throw err;
  }
}));

passport.serializeUser((user: UserInterface, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user: UserInterface, cb) => {
  cb(null, user)
});

// Routes
router.post('/register', async (req, res) => {
  const { username, password } = req?.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send('Invalid username or password')
    return;
  }

  if (username.length < 7) {
    res.status(400).send('Username must be at least seven characters')
    return;
  }

  if (password.length < 7) {
    res.status(400).send('Password must be at least seven characters')
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`INSERT INTO public.user (username, password) VALUES ($1, $2) RETURNING username;`, [username, hashedPassword]);
    res.send('User created successfully!')
  } catch (err) {
    res.status(500).send(err)
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user)
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('success')
});

app.use('/api/v1', router);

app.listen(3001, () => {
  console.log('Server Started');
});
