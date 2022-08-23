import express from 'express';
import prisma from '../../lib/prisma';

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({ id: 'why have 365828 people visited this webpage lol' });
});

export default router;
