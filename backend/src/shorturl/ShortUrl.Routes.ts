import { Router } from 'express';
import {  findAndRedirect, getByUId , addShortUrl } from './ShortUrl.Controller'
 
const router = Router();

router.route('/:uid').get(findAndRedirect); 
router.route('/uid/:uid').get(getByUId); 
router.route('/url').post(addShortUrl);

export default router;