//@ts-nocheck

import express from 'express';
import prisma from '../../lib/prisma';

const fs = require('fs');
const Axios = require('axios');
const router = express.Router();
const noblox = require('noblox.js');

router.get('/', async (req, res, next) => {
  // get games
  if (!req.user)
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  try {
    const newsQuery = await prisma.news.findMany({});

    // sort news by date (newest first)
    let sortedData = newsQuery.sort((a: any, b: any) => {
      return b.createdAt - a.createdAt;
    });

    return res.status(200).json({
      success: true,
      news: sortedData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
