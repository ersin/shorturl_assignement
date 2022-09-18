import * as ShortUrlService from './ShortUrl.Service';

/**
 * collects generated UIDs to prevent collision.
 */
 export const init = async () => {
    try {
      await ShortUrlService.init();
    } 
    catch (error) {
        console.error('[ShortUrl.controller][init][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    }
  };