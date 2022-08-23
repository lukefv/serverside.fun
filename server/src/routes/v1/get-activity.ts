import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });

  const activities = await prisma.activity.findMany({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  // sort activities by date (newest first)
  let sortedData = activities.sort((a: any, b: any) => {
    return b.createdAt - a.createdAt;
  });

  return res.status(200).json({
    success: true,
    activity: sortedData,
  });
});

export default router;
