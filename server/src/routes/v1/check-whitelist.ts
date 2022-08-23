import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/:id/:game', async (req, res, next) => {
  try {
    const { id, game} = req.params;
    if (!id || !game) {
      return res.status(200).json({
        error: 'Invalid Parameters',
      });
    }
    if (req.headers['user-agent'] != 'Roblox/Linux') 
    return res.status(200).json({ success: false, whitelisted: false });

    // check if there is gameId in gameSecurity database, if not, then make a new entry for game ID
    const gameSecurity = await prisma.gameSecurity.findFirst({
      where: {
        gameId: Number(game),
      },
    });
    if (!gameSecurity) {
      await prisma.gameSecurity.create({
        data: {
          gameId: Number(game)
        },
      });
    }
    
    const buyer = await prisma.buyers.findUnique({
      where: {
        robloxId: id,
      },
    });

    if (!buyer)
      return res.status(200).json({ success: false, whitelisted: false });

    const user = await prisma.users.findUnique({
      where: {
        id: buyer.userId,
      },
    });

    if (!user)
      return res.status(200).json({ success: false, whitelisted: false });

    return res.status(200).json({
      success: true,
      whitelisted: true,
      type: 'buyer',
      discord: user.discordId,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
