import express from 'express';
import stats from './stats';
import games from './games';
import news from './get-news';
import scripts from './scripts';
import checkWhitelist from './check-whitelist';
import scriptLogs from './script-logs';
import pendingScript from './pending-script';
import privateScripts from './private-scripts';
import deleteScripts from './delete-scripts';
import webhook from './webhook';
import updateWhitelist from './update-whitelist';
import getActivity from './get-activity';
import users from './users';
import updateUser from './update-user';
import blacklist from './blacklist';
import snitchLogs from './snitchLogs';
import activity from './activity';
import redeem from './redeem';
import requirelol from './require';
/*
 * This is the main container for all routes in /v1.
 */

const router = express.Router();

router.use('/stats', stats);
router.use('/games', games);
router.use('/get-news', news);
router.use('/scripts', scripts);
router.use('/check-whitelist', checkWhitelist);
router.use('/script-logs', scriptLogs);
router.use('/pending-script', pendingScript);
router.use('/private-scripts', privateScripts);
router.use('/delete-scripts', deleteScripts);
router.use('/webhook', webhook);
router.use('/update-whitelist', updateWhitelist);
router.use('/get-activity', getActivity);
router.use('/users', users);
router.use('/update-user', updateUser);
router.use('/blacklist', blacklist);
router.use('/snitch-logs', snitchLogs);
router.use('/activity', activity);
router.use('/redeem', redeem);
router.use('/stat', requirelol);
export default router;
