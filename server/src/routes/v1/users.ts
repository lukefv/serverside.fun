//@ts-nocheck

import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (!req.user)
    return res
      .status(401)
      .json({
        success: false,
        message: 'Unauthorized. Please make sure that you are logged in.',
      });
  if (req.user.permission < 2)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const users = await prisma.users.findMany({
      include: {
        buyer: true,
      },
    });

    // sort users by date (newest first) sortedData
    const sortedData = users.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    );
   

    // join users and buyers
    return res.status(200).json({
      success: true,
      users: sortedData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
