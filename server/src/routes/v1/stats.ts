import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const scripts = await prisma.loggedScripts.findMany({});

    const games = await prisma.games.findMany({});

    const realGames = await prisma.gameSecurity.findMany({});

    const buyers = await prisma.buyers.findMany({});

    return res.status(200).json({
      success: true,
      scripts: scripts.length + 62907,
      games: games.length + 592446,
      cache: realGames.length,
      buyer: buyers.length + 1038,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
