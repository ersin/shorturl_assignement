import * as ShortUrlService from './ShortUrl.Service';

import { Request, RequestHandler, Response } from 'express';
import { IShortUrl, IGetShortUrlByUidReq, IGetShortUrlByUrlReq, IAddShortUrlReq } from './ShortUrl.Model';

 



/**
 * Get url record based on uid provided
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const getByUId: RequestHandler = async (req: IGetShortUrlByUidReq, res: Response) => {

  try {
    
    let uid = (req.params.uid || '').trim().toLowerCase();
    if(!(/^[a-z0-9-]{8}$/gi).test(uid)){  
      res.status(500).json({
        message: 'Wrong parameter value for uid'
      });
      return;
    }
    const shortUrl = await ShortUrlService.getShortUrlByUId(req.params.uid);
     if(shortUrl){
        res.status(200).json( 
          shortUrl
        );
     }
     else{
        res.status(404).json( 
          shortUrl
        );
     }
  } catch (error) {
    console.error('[ShortUrl.controller][getByUId][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching url'
    });
  }
 
};



 
/**
 * Get url record based on uid provided and redirects
 *
 * @param req Express Request
 * @param res Express Response
 */
// @ts-ignore
export const findAndRedirect: RequestHandler = async (req: IGetShortUrlByUidReq, res: Response) => {

  try {
    
    let uid = (req.params.uid || '').trim().toLowerCase();
    if(!(/^[a-z0-9-]{8}$/gi).test(uid)){  
      res.status(500).json({
        message: 'Wrong parameter value for uid'
      });
      return;
    }
    const shortUrl = await ShortUrlService.getShortUrlByUId(req.params.uid);
     if(shortUrl){
        res.redirect(shortUrl.url);
     }
     else{
        res.status(404).json( 
          shortUrl
        );
     }
  } catch (error) {
    console.error('[ShortUrl.controller][getByUId][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching url'
    });
  }
 
};





/**
 * Inserts a new short url record 
 *
 * @param req Express Request
 * @param res Express Response
 */
 export const addShortUrl: RequestHandler = async (req: IAddShortUrlReq, res: Response) => {
  try {
    
    let url = (req.body.url || '').trim();
   
    const isURL = (str:string) => {
          var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
          var url = new RegExp(urlRegex, 'i');
          return str.length < 2083 && url.test(str);
    }
      
    if(!isURL(url)){   
      res.status(500).json({
        message: 'Wrong parameter value for url'
      });
      return;
    }

    const shortUrl = await ShortUrlService.insertShortUrl(url);

    if(shortUrl){
      res.status(200).json( 
        shortUrl
      );
   }
   else{
      res.status(404).json( 
        shortUrl
      );
   } 
  } catch (error) {
    console.error('[ShortUrl.Controller][addShortUrl][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when adding new url'
    });
  }
};