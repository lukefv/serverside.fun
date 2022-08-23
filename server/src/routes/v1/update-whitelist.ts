import express from 'express';
import prisma from '../../lib/prisma';
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { robloxUsername } = req.body;

  if (!robloxUsername)
    return res
      .status(400)
      .json({ success: false, message: 'No roblox username provided.' });

  //@ts-ignore
  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const buyer = await prisma.buyers.findUnique({
      where: {
        //@ts-ignore
        userId: req.user.id,
      },
    });

    if (!buyer)
      return res
        .status(400)
        .json({ success: false, message: 'No buyer found.' });

    // if buyer.lastUpdated time is less than 8 hours from the current time, return an error
    //@ts-ignore
    const lastUpdated = new Date(buyer.lastUpdated);
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - lastUpdated.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 8 && lastUpdated)
      return res.status(400).json({
        success: false,
        message:
          'You must wait at least 8 hours before updating your whitelist.',
      });

    const userInfoResponse = await axios.get(
      `https://api.roblox.com/users/get-by-username?username=${robloxUsername}`,
    );
    if (!userInfoResponse.data.Id)
      return res
        .status(400)
        .json({ success: false, message: 'This username does not exist!' });
    await prisma.buyers.update({
      where: {
        //@ts-ignore
        userId: req.user.id,
      },
      data: {
        //@ts-ignore
        robloxUsername: String(userInfoResponse.data.Username),
        robloxId: String(userInfoResponse.data.Id),
        //@ts-ignore
        lastUpdated: new Date(),
      },
    });

    await prisma.activity.create({
      data: {
        //@ts-ignore
        userId: req.user.id,
        //@ts-ignore
        action: `Whitelist changed to ${robloxUsername}`,
        //@ts-ignore
        ipAddress:
          req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        status: 'Success',
      },
    });
    return res.status(200).json({
      success: true,
      message: 'Successfully updated whitelist.',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
