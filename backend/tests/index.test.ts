
import { initApi } from '../index'; 
import {ShortUrlTest} from '../src/shorturl/ShortUrl.Test';
 
describe('Testing ShortUrl', () => { 

      beforeAll(async() => {  
          await initApi(); 
      });

      ShortUrlTest();
      
});