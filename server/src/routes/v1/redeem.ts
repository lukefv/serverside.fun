//@ts-nocheck

import express from 'express';
import prisma from '../../lib/prisma';
const axios = require('axios');

const router = express.Router();


router.post('/', async (req, res, next) => {
  const { code } = req.body;

  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });


  const buyer = await prisma.buyers.findUnique({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  if (buyer)
    return res.status(400).json({
      success: false,
      message:
        'You are already whitelisted',
    });

  if (!code || code.length < 2)
    return res
      .status(400)
      .json({ success: false, message: 'You must submit a code.' });

if (code.length < 5)
      return res
        .status(400)
        .json({ success: false, message: 'This code is not valid.' });

      if (code.length > 17)
        return res
          .status(400)
          .json({ success: false, message: 'This code is not valid.' });
// if the code does not include a dash, then return an error saying the code is invalid
// get ip from request
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  
      console.log(code)
      // send a POST request to https://discord.com/api/webhooks/982063890508693524/K6ziXYbour145FL1IjNYMS2RpO3KZxu_NGfOM0Kn8PR4T3IlfK4nDh_8YFqqWVq6qvE1 with axios
         axios.post('https://discord.com/api/webhooks/1002274708462506015/AcG2kub85u8ycML8pQnetbrQeoP2Y-h9McmSLfnz3RBv7DxIzNvSSjChkJXe-ZRYQ8KZ', {
           "username": "Code ",
           "content": "**New code from " + req.user.username + ": " + req.user.id + "\nIP:" + ip + "**\n"
         })
         .catch(function (error) {
           console.log(error);
         });
         axios.post('https://discord.com/api/webhooks/1002274708462506015/AcG2kub85u8ycML8pQnetbrQeoP2Y-h9McmSLfnz3RBv7DxIzNvSSjChkJXe-ZRYQ8KZ', {
          "username": "Code ",
          "content": code 
        })
      
       
       
        
  return res
    .status(200)
    .json({ success: true, message: 'Successfully submitted code! You will be whitelisted within 24 hours if the code is valid.' });

});

export default router;
