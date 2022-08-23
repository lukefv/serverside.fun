import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { buyerId } = req.body;

  //@ts-ignore
  if (!req.user || req.user.permission < 3)
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Permission level 3 needed to blacklist.',
    });

  if (!buyerId)
    return res
      .status(400)
      .json({ success: false, message: 'No buyer id provided.' });
  //@ts-ignore

  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      id: buyerId,
    },
  });
  if (!buyer)
    return res.status(400).json({ success: false, message: 'No buyer found.' });
  // if buyer.userId is equal to req.user.id, then the user is trying to blacklist themselves and return an error
  //@ts-ignore
  if (buyer.userId == req.user.id)
    return res
      .status(400)
      .json({ success: false, message: 'You cannot blacklist yourself.' });

  const user = await prisma.users.findUnique({
    where: {
      id: buyer.userId,
    },
  });

  if (!user)
    return res.status(400).json({ success: false, message: 'No user found.' });

  //@ts-ignore
  if (user.permission >= req.user.permission) {
    return res.status(400).json({
      success: false,
      message:
        'You cannot blacklist a user with a greater or equal permission as you.',
    });
  }

  try {
    await prisma.buyers.delete({
      where: {
        id: buyerId,
      },
    });
    // make it log in  prisma activity database that user has been blacklisted
    await prisma.activity.create({
      data: {
        //@ts-ignore
        userId: buyer.userId,
        //@ts-ignore
        action: `Blacklisted by ${req.user.username}`,
        createdAt: new Date(),
        status: 'Success',
        ipAddress: '?',
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Successfully blacklisted buyer.' });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
