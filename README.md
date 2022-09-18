# TypeScript Fullstack Short Url Service

# Settings

## backend .env file
PORT=3030
MYSQL_DB_HOST=127.0.0.1
MYSQL_DB_PORT=3306
MYSQL_DB_USER='testuser'
MYSQL_DB_PASSWORD='1q2w3e4r5t!Q@W#E$R%T'
MYSQL_DB_NAME='SHORTURL' 
MYSQL_DB_CONNECTION_LIMIT=4

## frontend index.js file
apiUrl: 'http://localhost:3030/url',
shortUrl: 'http://localhost:3030/',
siteUrl: 'http://localhost:8080/',


## Go to backend/db folder and import mysql data
## Go to frontend folder and run npm start
## Go to backend folder and run npm start

Feel free to use in mobile and pc

I am not a TypeScript devveloper. So I did what I can do here. 
Backend is using NodeJs + Express + Typescript 
Frontent is using React
There is a lib folder is used for StringHelpers. Is a CommonJS lib added inside project by npm i {folder}
