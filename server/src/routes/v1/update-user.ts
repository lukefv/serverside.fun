import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();
router.post('/', async (req, res, next) => {
  const { userId, whitelistType, warningCount, user } = req.body;

  //@ts-ignore
  if (!req.user || req.user.permission < 4)
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Permission level 4 is required to modify users.',
    });

  if (!whitelistType)
    return res
      .status(400)
      .json({ success: false, message: 'No whitelist type provided.' });
  //@ts-ignore
  if (user.id == req.user.id)
    return res.status(400).json({
      success: false,
      message: 'You cannot perform changes to yourself.',
    });

  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      userId: user.id,
    },
  });
  console.log(whitelistType);
  if (buyer && whitelistType == 'USER')
    return res.status(400).json({
      success: false,
      message:
        'User is already a buyer, please use the blacklist button to blacklist this user.',
    });
  try {
    if (!userId) {
      await prisma.buyers.create({
        data: {
          userId: user.id,
          disabled: false,
          //@ts-ignore
          purchaseIdentifier: `[Given by ${req.user.username}]`,
          warningCount: 0,
          type: whitelistType,
          paymentMethod: 'Gift',
          robloxId: null,
          createdAt: new Date(),
          lastUpdated: null,
        },
      });
      await prisma.activity.create({
        data: {
          //@ts-ignore
          userId: user.id,
          //@ts-ignore
          action: `Given ${whitelistType} access by ${req.user.username}`,
          //@ts-ignore
          ipAddress: '?',
          status: 'Success',
        },
      });
      return res
        .status(200)
        .json({ success: true, message: 'User has been whitelisted' });
    } else {
      await prisma.buyers.update({
        where: { id: userId },
        data: {
          warningCount: Number(warningCount) || 0,
          type: whitelistType.toUpperCase(),
        },
      });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }

  return res
    .status(200)
    .json({ success: true, message: 'Successfully saved user information!' });
});

export default router;
