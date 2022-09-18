import { Request } from 'express';
 


export interface IShortUrl {
    uid: string;
    url: string;
    hash: string; 
}

export interface IGetShortUrlByUidReq extends Request<{ uid: IShortUrl['uid'] }> { }
export interface IGetShortUrlByUrlReq extends Request<{ url: IShortUrl['url'] }> { }
export interface IAddShortUrlReq extends Request{}