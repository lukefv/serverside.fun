import express from 'express';
import prisma from '../../lib/prisma';

import requestIP from 'request-ip';

const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, async (req, res, next) => {
  const whitelistedIPs = ['34.232.58.13', '34.195.105.136', '34.237.3.244'];
  const ip = requestIP.getClientIp(req);

  try {
    if (ip && !whitelistedIPs.includes(ip))
      return res.status(401).json({ success: false, message: 'Unauthorized.' });

    await prisma.buyers.create({
      data: {
        purchaseIdentifier: String(req.body.receipt_url),
        robloxId: '',
        paymentMethod: 'Paddle',
        userId: Number(req.body.passthrough),
        createdAt: new Date(),
        type: 'NORMAL'
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Successfully created buyer account.' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
