import { Request, Response, Router } from 'express';
import ShortUrlRoutes from './src/shorturl/ShortUrl.Routes'; 


const router = Router();

router.use('/', ShortUrlRoutes); 
 
export default router;
