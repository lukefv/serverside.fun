import express from 'express';
import prisma from '../../lib/prisma';
const noblox = require('noblox.js');
const router = express.Router();

router.get('/', async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  //@ts-ignore
  if (req.user.permission < 2)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  
  const logs = await prisma.loggedScripts.findMany({ include: {
    buyer: true,
  },});
  // sort logs by date (newest first)
  let sortedData = logs.sort((a: any, b: any) => {
    return b.createdAt - a.createdAt;
  });
  return res.json({ authenticated: sortedData });
});

router.post('/', async (req, res, next) => {
  const { script, robloxId, gameId } = req.body;

  const buyer = await prisma.buyers.findUnique({
    where: {
      robloxId,
    },
  });

  if (!buyer)
    return res
      .status(200)
      .json({ success: false, message: 'Failed to find buyer' });

      const universeInfo = await noblox.getUniverseInfo([Number(gameId)]);

      if (!universeInfo)
        return res
          .status(200)
          .json({ success: false, message: 'Failed to find universe info' });
      
      

  await prisma.loggedScripts.create({
    data: {
      script,
      robloxId,
      gameId,
      buyerId: buyer.id,
      // make universeInfo[0].rootPlaceId a string
      placeId: universeInfo[0].rootPlaceId + "",
      userId: buyer.userId,
      //@ts-ignore
      robloxUsername: buyer.robloxUsername,
    },
  });
  return res.json({ success: true, message: 'Script logged' });
});



export default router;
