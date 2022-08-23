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
  if (req.user.permission < 4)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const users = await prisma.snitchLogs.findMany({});

    // sort users by date (oldest first)
    let sortedData = users.sort((a: any, b: any) => {
      return b.createdAt - a.createdAt;
    });
    // only show users the past 2 days
    let filteredData = sortedData.filter((user: any) => {
      return user.createdAt > Date.now() - 172800000;
    });
    

    // join users and buyers
    return res.status(200).json({
      success: true,
      users: filteredData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
