import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/:robloxId', async (req, res, next) => {
  const { robloxId } = req.params;
  let scripts;
// if the user agent does not equal Roblox/Linux then return an error
  if (req.headers['user-agent'] != 'Roblox/Linux') 
    return res.status(200).json({
      success: true,
      pendingScripts: '[]',
    });
    
  const pendingScripts = await prisma.pendingScripts.findMany({
    where: {
      robloxId,
    },
  });

  scripts = pendingScripts;

  await prisma.pendingScripts.deleteMany({
    where: {
      robloxId,
    },
  });

  return res.status(200).json({
    success: true,
    pendingScripts: scripts,
  });
});

router.post('/', async (req, res, next) => {
  const { script, robloxId } = req.body;
  if (!req.user)
    return res
      .status(401)
      .json({
        success: false,
        message: 'Unauthorized. Please make sure that you are logged in.',
      });
  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  if (!buyer)
    return res.status(400).json({ success: false, message: 'No buyer found.' });

  if (!buyer.robloxId)
    return res
      .status(400)
      .json({
        success: false,
        message:
          'You must set your ROBLOX username in order for this to work. You can do this in the manage whitelist section.',
      });
      if (!buyer.robloxUsername)
      return res
        .status(400)
        .json({
          success: false,
          message:
            'No ROBLOX username found. Please set your ROBLOX username in order for this to work. You can do this in the manage whitelist section.',
        });
  const alreadyPending = await prisma.pendingScripts.findFirst({
    where: {
      //@ts-ignore
      robloxId: buyer.robloxId,
    },
  });

  if (alreadyPending)
    return res
      .status(400)
      .json({ success: false, message: 'You already have pending scripts. ' });
/*
  await prisma.activity.create({
    data: {
      //@ts-ignore
      userId: req.user.id,
      //@ts-ignore
      action: `Executed script on ${buyer.robloxUsername}`,
      //@ts-ignore
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      status: 'Success',
    },
  });
*/
 
  await prisma.pendingScripts.create({
    data: {
      script,
      robloxId,
    },
  });

  return res
    .status(200)
    .json({ success: true, message: 'Successfully executed script!' });
});

export default router;
