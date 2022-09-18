import * as ShortUrlService from './ShortUrl.Service';
import   supertest from 'supertest';
import * as express from 'express'; 
import { app } from '../../index'; 
 
 
export const ShortUrlTest = () => { 
 
        const testData = {
            existingRecord : { 
                uid: '12312312',
                url: 'https://www.google.com',
                hash: 'ef7efc9839c3ee036f023e9635bc3b056d6ee2db'
            },
            nonExistingRecord : { 
                uid: '11111111',
                url: 'http://www.11111111111111111111111111111111.fakedata',
                hash: '236cdde4089d6ba2b0c0808cd1629f8770934ac2'
            },
            newRecord : { 
                uid: '',
                url: 'http://www.11111111111111111111111111111111'+new Date().getTime()+'.fakedata',
                hash: ''
            },
            newBadRecord : { 
                uid: '',
                url: '://www.11111111111111111111111111111111'+new Date().getTime()+'.fakedata',
                hash: ''
            }
        };
 
        describe('Testing ShortUrl.Service', () => { 
                test('Get ShortUrl By UId: Existing url', async () => { 
                    const result =  await ShortUrlService.getShortUrlByUId( testData.existingRecord.uid);
                    expect(result.uid).toBe( testData.existingRecord.uid);
                    expect(result.url).toBe( testData.existingRecord.url);
                });
            
             
                test('Insert ShortUrl: Good Url', async () => { 
                    const result =  await ShortUrlService.insertShortUrl(testData.newRecord.url);
                    expect(result.uid).toHaveLength(8);
                    expect(result.hash).toHaveLength(40);
                    expect(result.url).toBe(testData.newRecord.url);
                }); 

                test('Get ShortUrl By UId: Non existing url', async () => { 
                    const result =  await ShortUrlService.getShortUrlByUId(testData.nonExistingRecord.uid); 
                    expect(result).toBe(null); 
                });
             
        });
        
        describe('Testing ShortUrl API', () => { 

                test('Get ShortUrl By UId: Existing url', async () => {
                    const response = await supertest(app)
                    .get('/uid/'+ testData.existingRecord.uid)
                    .set('Accept', 'application/json');  
                    
                    expect(response.headers["content-type"]).toMatch(/json/);
                    expect(response.headers["content-length"]-1).toBeGreaterThan(10);
                    expect(response.status).toEqual(200); 
                    expect(response.body.uid).toBe( testData.existingRecord.uid); 
                    expect(response.body.url).toBe( testData.existingRecord.url); 
                });
            
                 
                test('Insert ShortUrl: Good url', async () => { 
                    const response = await supertest(app)
                    .post('/url').send({url:testData.newRecord.url})
                    .set('Accept', 'application/json');  
                    
                    expect(response.headers["content-type"]).toMatch(/json/);
                    expect(response.headers["content-length"]-1).toBeGreaterThan(10);
                    expect(response.status).toEqual(200); 
                    expect(response.body.uid).toHaveLength(8);
                    expect(response.body.hash).toHaveLength(40); 
                    expect(response.body.url).toBe(testData.newRecord.url); 

                    testData.newRecord = response.body;
                });
            
                test('Get ShortUrl By UId: Checking new record', async () => {
                    const response = await supertest(app)
                    .get('/uid/'+ testData.newRecord.uid)
                    .set('Accept', 'application/json');  
                    
                    expect(response.headers["content-type"]).toMatch(/json/);
                    expect(response.headers["content-length"]-1).toBeGreaterThan(10);
                    expect(response.status).toEqual(200); 
                    expect(response.body.uid).toBe( testData.newRecord.uid); 
                    expect(response.body.url).toBe( testData.newRecord.url); 
                });
            

                test('Insert ShortUrl: Bad url', async () => { 
                const response = await supertest(app)
                    .post('/url').send({url:testData.newBadRecord.url})
                    .set('Accept', 'application/json');  
                    
                    expect(response.headers["content-type"]).toMatch(/json/); 
                    expect(response.status).toEqual(500);   
                });

                
                test('Get ShortUrl By UId: Non existing url', async () => {
                    const response = await supertest(app)
                    .get('/uid/'+testData.nonExistingRecord.uid)
                    .set('Accept', 'application/json');  
                    
                    expect(response.headers["content-type"]).toMatch(/json/);
                    expect(response.headers["content-length"]-1).toBeGreaterThan(0);
                    expect(response.status).toEqual(404);  
                });
                 

        }); 

}