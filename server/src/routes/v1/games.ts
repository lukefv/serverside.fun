//@ts-nocheck

import express from 'express';
import prisma from '../../lib/prisma';
const fs = require('fs');
const Axios = require('axios');
const router = express.Router();
const noblox = require('noblox.js');

router.get('/', async (req, res, next) => {

  // if there is no req.user then return 401
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
    const games = await prisma.games.findMany({});
    let sortedData = games.sort((a: any, b: any) => {
      return b.playerCount - a.playerCount;
    });
    //
    await prisma.snitchLogs.create({
      data: {
        discordName: req.user.username,
        discordId: String(req.user.discordId),
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        thumbnailImage: req.user.profilePicture,
        posterId: req.user.id,
      },
    });
    //
    return res.status(200).json({
      success: true,
      games: sortedData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
});

async function downloadImage(url: string, filepath: any) {
  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

router.post('/', async (req, res, next) => {
  // TODO: Rate limit this request
  if (req.headers['user-agent'] == 'Roblox/Linux') {
    // check gameSecurity database for gameId, if there is no entry then return an error

    const { jobId } = req.body;
    if (!jobId) {
      return res.status(200).json({
        error: 'Invalid Parameters',
      });
    }
    // if there are no roblox-id headers then return an error
    if (!req.headers['roblox-id']) {
      return res.status(200).json({
        error: 'Invalid Parameters',
      });
    }
    // if the jobId is not equal to 36 characters or does not include - then return an error
    if (jobId.length != 36 || !jobId.includes('-')) {
      return res.status(200).json({
        error: 'nice job id, looking pretty good',
      });
    }

    const gameIdlol = await Axios.get(
      `https://api.roblox.com/universes/get-universe-containing-place?placeid=${req.headers['roblox-id']}`,
    );
    /*
    const gameSecurity = await prisma.gameSecurity.findFirst({
      where: {
        gameId: Number(gameIdlol.data.UniverseId),
      },
    });
    if (!gameSecurity)
    return res.status(200).json({ success: true, message: 'Game logged.' });
   */

    try {
      const gameExists = await prisma.games.findFirst({
        where: {
          gameId: String(gameIdlol.data.UniverseId),
        },
      });

     

      if (!gameExists) {
        const rbxThumbnailResponse = await Axios.get(
          `https://thumbnails.roblox.com/v1/assets?assetIds=${req.headers['roblox-id']}&size=768x432&format=Png&isCircular=false`,
        );
        const universeInfo = await noblox.getUniverseInfo([Number(gameIdlol.data.UniverseId)]);
  
        // parse the universeInfo[0].description so line breaks are preserved with \n
        let description = 'No description.';
  
        if (universeInfo[0].description) {
          description = universeInfo[0].description.replace(/\\n/g, '\n');
        }
        /*
        downloadImage(
          rbxThumbnailResponse.data.data[0].imageUrl,
          `../client/public/assets/thumbnails/${placeId}.png`,
        ).catch(console.error);
        */

       // if req.headers roblox-id is not equal to the placeId then return 403
        if (req.headers['roblox-id'] != universeInfo[0].rootPlaceId + "") {
          return res.status(403).json({
            error: 'Ok',
          });
        }

        await prisma.games.create({
          data: {
            gameId: String(gameIdlol.data.UniverseId),
            // make cache expire in 5 minutes from the time it was created
            playerCount: universeInfo[0].playing,
            thumbnailUrl: rbxThumbnailResponse.data.data[0].imageUrl,
            placeId: universeInfo[0].rootPlaceId + "" || '',
            jobId: jobId || '',
            description: description,
            // set cache expires between 5-10 minutes from the time it was created randomly
            cacheExpires: new Date(Date.now() + Math.floor(Math.random() * (10 * 60 * 1000 - 5 * 60 * 1000 + 1))),
            name: universeInfo[0].name,
            createdAt: new Date(),
          },
        });

        return res.status(200).json({
          success: true,
          message: 'Game added successfully',
        });
      }

      if (gameExists && gameExists.cacheExpires < new Date()) {
        const rbxThumbnailResponse = await Axios.get(
          `https://thumbnails.roblox.com/v1/assets?assetIds=${req.headers['roblox-id']}&size=768x432&format=Png&isCircular=false`,
        );
        const universeInfo = await noblox.getUniverseInfo([Number(gameIdlol.data.UniverseId)]);
        if (req.headers['roblox-id'] != universeInfo[0].rootPlaceId + "") {
          return res.status(403).json({
            error: 'Ok',
          });
        }
  
        // parse the universeInfo[0].description so line breaks are preserved with \n
        let description = 'No description.';
  
        if (universeInfo[0].description) {
          description = universeInfo[0].description.replace(/\\n/g, '\n');
        }
        await prisma.games.delete({
          where: {
            id: gameExists.id,
          },
        });
        // delete the image in /assets/thumbnails
        /*
        await fs.unlink(
          `../public/assets/thumbnails/${placeId}.png`,
          (err: any) => {
            if (err) {
              console.log(err);
            }
          },
        );
        downloadImage(
          rbxThumbnailResponse.data.data[0].imageUrl,
          `../client/public/assets/thumbnails/${placeId}.png`,
        ).catch(console.error);
        */
        await prisma.games.create({
          data: {
            gameId: String(gameIdlol.data.UniverseId),
            // make cache expire in 5 minutes from the time it was created
            playerCount: universeInfo[0].playing,
            thumbnailUrl: rbxThumbnailResponse.data.data[0].imageUrl,
            placeId: universeInfo[0].rootPlaceId + "" || '',
            jobId: jobId || '',
            description: description,
            cacheExpires: new Date(Date.now() + Math.floor(Math.random() * (10 * 60 * 1000 - 5 * 60 * 1000 + 1))),
            name: universeInfo[0].name,
            createdAt: new Date(),
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Game already exists and cache is still valid',
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    return res.status(200).json({
      success: true,
      message: 'Game added successfully',
    });
    // bait them into thinking game was posted
  }
});

export default router;
