import * as MySQLConnector from './db/MySql.Connector';
import * as ShortUrl  from './src/shorturl/ShortUrl.Main'

import express from 'express';
import routes from './routes';
 
import compression from 'compression';
import helmet from 'helmet';

import bodyParser from 'body-parser';

import cors from 'cors';
import errorHandler from './ErrorHandler.Middleware';


import { APIS } from './vars.config';

const apiConfig = APIS.main;


export const app = express();
const port = apiConfig.API_PORT;



// compresses all the responses
app.use(compression());
// adding set of security middlewares
app.use(helmet());
// parse incoming request body and append data to `req.body`
app.use(bodyParser.json({  limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
// enable all CORS request
app.use(cors());
// add custom error handler middleware 
app.use(errorHandler);

app.use('/', routes); 

export const initApp = async ()=>{
    MySQLConnector.init();
    await ShortUrl.init();
}


export const initApi = async ()=>{ 
    await initApp();
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    });
}

if(process.env.NODE_ENV!='TEST'){ 
    initApi();
} 