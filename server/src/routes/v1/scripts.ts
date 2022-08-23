//@ts-nocheck

import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
  // get games
  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  if (!buyer)
    return res
      .status(400)
      .json({
        success: false,
        message:
          'Nice try, but you are not a buyer. This attempt has been logged.',
      });

  try {
    const scriptsQuery = await prisma.publicScripts.findMany({});

   // sort oldest date first
    let sortedData = scriptsQuery.sort((a: any, b: any) => {
      return a.createdAt - b.createdAt;
    }
    );
    

    return res.status(200).json({
      success: true,
      scripts: sortedData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res, next) => {
  const { name, description, script, thumbnail } = req.body;

  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (req.user.permission < 2)
    return res.status(401).json({ success: false, message: 'Unauthorized' });

  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  if (!buyer)
    return res.status(400).json({
      success: false,
      message:
        'Nice try, but you are not a buyer. This attempt has been logged.',
    });

  if (!name || !description || !script || !thumbnail)
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });

  await prisma.publicScripts.create({
    data: {
      name,
      thumbnailImage:
        thumbnail,
      description,
      script,
      //@ts-ignore
      posterId: req.user.id,
    },
  });

  return res
    .status(200)
    .json({ success: true, message: 'Successfully added script!' });
});

export default router;
