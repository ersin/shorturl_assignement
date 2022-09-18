import { getRecord, getRecords, insertRecord } from "../../db/MySql.Connector";

import { ShortUrlQueries } from "./ShortUrl.Queries";
import { IShortUrl } from "./ShortUrl.Model";

import sha1 from 'crypto-js/sha1';
import { nanoid } from 'nanoid';
import { ShortUrlCache } from './ShortUrl.Cache';


/**
 * collects generated UIDs to prevent collision.
 * 1M UID is about 8M bytes. Instead of looking DB for every UID we look into an key value array. 
 */
 export const init = async() => {
    const data = await getAllShortUrls(); 
    data.forEach(u=>{ 
        ShortUrlCache.addUId(u.uid);
        ShortUrlCache.addHash(u.hash);
    });
  
    console.debug('All UIDs and Hashes are cached. Total data:' + data.length);
    return true;
 };
/**
 * 
 * @returns {IShortUrl[]} 
 */
const getAllShortUrls = async () => { 
    return getRecords<IShortUrl>(ShortUrlQueries.GetAll, []); 
};
   

 /**
  * gets a shorturl based on uid provided
  * @param {string} uid 
  * @returns {IShortUrl} 
  */
export const getShortUrlByUId = async (uid: IShortUrl['uid']): Promise<IShortUrl> => { 
    if(ShortUrlCache.checkUId(uid)){ 
        return getRecord<IShortUrl>(ShortUrlQueries.GetByUId, [uid]);  
    } 
    else{
        return null;
    }
};

  
  
 
 /**
  * adds a new a shorturl record
  * @param {string} url 
  * @returns {IShortUrl} 
  */
 export const insertShortUrl = async (url: string): Promise<IShortUrl>  => {
     
    let hash = sha1(url).toString();
    
    if(ShortUrlCache.checkHash(hash)){  
        return  getRecord<IShortUrl>(ShortUrlQueries.GetByUrl, [hash]);  
    } 
    else{
        let uid = generateShortId(); 
        
        const result = insertRecord(ShortUrlQueries.Add, [ uid, url, hash ]);
       
        if(result){
            ShortUrlCache.addUId(uid); 
            ShortUrlCache.addHash(hash); 
            return  { uid, url, hash };
        }
        else{
            return null;
        }
    }   
   
  };

 

  const generateShortId = () => {
    let id = nanoid(8).toLowerCase();
    while(ShortUrlCache.checkUId(id)){ 
        id = nanoid(8).toLowerCase();
    }
    return id;
  };