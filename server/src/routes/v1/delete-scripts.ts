import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { selectedScripts } = req.body;

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

  if (!selectedScripts)
    return res
      .status(400)
      .json({ success: false, message: 'No scripts selected.' });

  try {
    for (let i = 0; i < selectedScripts.length; i++) {
      const verifyScript = await prisma.privateScripts.findUnique({
        where: {
          id: selectedScripts[i].id,
        },
      });

      if (!verifyScript)
        return res
          .status(400)
          .json({ success: false, message: 'Script does not exist' });

      //@ts-ignore
      if (verifyScript.posterId != req.user.id)
        return res.status(401).json({
          success: false,
          message:
            "Nice try, you cannot delete scripts you don't own. Rinn.....",
        });

      await prisma.privateScripts.delete({
        where: {
          id: selectedScripts[i].id,
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted scripts!',
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

export default router;
