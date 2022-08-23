import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import {
  Scope,
  Strategy,
  VerifyCallback,
} from '@oauth-everything/passport-discord';
import v1API from './routes/v1';
import authAPI from './routes/auth';
import prisma from './lib/prisma';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cookieParser(process.env.TOKEN_SECRET));
/* CUSTOM HEADER */

app.set('trust proxy', (ip: string) => {
  return true // trusted IPs
})
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.setHeader('served-by', 'serverside.fun Beta v0.1');
  next();
});
/* CUSTOM HEADER */

const whitelist = [
  'https://api.serverside.fun',
  'https://serverside.fun',
  'https://serverside.fun/',
  'https://www.serverside.fun',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(
  cors({
    origin: (origin: any, callback: any) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(
  session({
    name: 'jd-session',
    // @ts-ignore
    secret: process.env['TOKEN_SECRET'],
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 168 * 60 * 60 * 1000,
     httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
    store: new PrismaSessionStore(
     
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  }),
);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.users.findUnique({
    where: { id: Number(id) },
  });
  if (!user) return done(null, { user: null });
  return done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      callbackURL: `${process.env.API_BASE_URL}/auth/discord/callback`,
      scope: [Scope.IDENTIFY],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      callback: VerifyCallback,
    ) => {
      let pfp =
        'https://serverside.fun/defaultpfp.png';
      if (profile.photos[0]) pfp = profile.photos[0].value;

      const user = await prisma.users.findUnique({
        where: { discordId: profile.id },
      });

      if (!user) {
        const newUser = await prisma.users.create({
          data: {
            username: profile.username,
            discordId: profile.id,
            profilePicture: pfp,
            createdAt: new Date(),
          },
        });

        await prisma.activity.create({
          data: {
            userId: newUser.id,
            //@ts-ignore
            action: `Opened a serverside.fun account`,
            //@ts-ignore
            ipAddress: 'Unknown',
            status: 'Success',
          },
        });

        return callback(null, newUser); // return new user
      }

      await prisma.users.update({
        where: { discordId: profile.id },
        data: {
          profilePicture: pfp,
          username: profile.username,
        },
      });

      return callback(null, user); // return existing user
    },
  ),
);

app.use(passport.session());

app.use('/auth', authAPI);
app.use('/v1', v1API);

app.listen(port, () => {
  console.log(`API running on port: ${port}.`);
});
