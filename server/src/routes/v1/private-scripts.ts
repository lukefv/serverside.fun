import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (!req.user)
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
  const scripts = await prisma.privateScripts.findMany({
    where: {
      //@ts-ignore
      posterId: String(req.user.id),
    },
  });

  // sort scripts by createdAt (newest first)
  let sortedData = scripts.sort((a: any, b: any) => {
    return b.createdAt - a.createdAt;
  });

  return res.status(200).json({
    success: true,
    scripts: sortedData,
  });
});

router.post('/', async (req, res, next) => {
  const { name, description, script } = req.body;

  if (!req.user)
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

  if (!name || !description || !script)
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });

  await prisma.privateScripts.create({
    data: {
      name,
      thumbnailImage:
        'https://serverside.fun/scriptimage.png',
      description,
      script,
      //@ts-ignore
      posterId: String(req.user.id),
    },
  });

  return res
    .status(200)
    .json({ success: true, message: 'Successfully added script!' });
});

export default router;
