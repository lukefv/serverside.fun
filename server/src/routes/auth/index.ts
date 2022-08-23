import express from 'express';
import passport from 'passport';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/user', async (req, res) => {
  if (!req.user) return res.status(404).json({ message: 'User not found.' });
  const user = await prisma.users.findUnique({
    //@ts-ignore
    where: { id: req.user.id },
    include: { trial: true, buyer: true },
  });
  return res.status(200).json({ user });
});

router.get('/logout', async (req, res) => {
  if (!req.user) return res.status(404).json({ message: 'User not found.' });
  //@ts-ignore
  req.logout();
  return res.status(200).redirect(`${process.env.BASE_URL}`);
});

router.get('/discord', async (req, res, next) => {
  if (req.user) return res.redirect(`${process.env.BASE_URL}/user/dashboard`);
  return passport.authenticate('discord')(req, res, next);
});

router.get('/discord/callback', async (req, res, next) => {
  passport.authenticate(
    'discord',
    { failWithError: true },
    (error, user, info) => {
      if (error) {
        console.log(error);
        return res.send({
          success: false,
          message:
            'There was an error authenticating your discord account. Please make sure you have a valid profile picture.',
        });
      }

      if (!user) {
        console.log(info);
        return res.redirect(
          `${process.env['BASE_URL']}/?error=${encodeURI(info)}`,
        );
      }
      return req.login(user, (err: any) => {
        if (err) {
          console.log(err);
          return res.redirect(
            `${process.env['BASE_URL']}/?error=${encodeURI(
              'An error occurred while logging in.',
            )}`,
          );
        }
        return res.redirect(`${process.env['BASE_URL']}/user/dashboard`);
      });
    },
  )(req, res, next);
});

export default router;
