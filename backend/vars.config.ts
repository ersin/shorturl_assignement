export const DATA_SOURCES = {
    mySqlDataSource: {
      DB_HOST: process.env.MYSQL_DB_HOST,
      DB_USER: process.env.MYSQL_DB_USER,
      DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
      DB_PORT: process.env.MYSQL_DB_PORT,
      DB_NAME: process.env.MYSQL_DB_NAME,
      DB_CONNECTION_LIMIT: process.env.MYSQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MYSQL_DB_CONNECTION_LIMIT) : 4,
    }
  };
  export const APIS = {
    main: {
        API_PORT:process.env.PORT
    }
  };