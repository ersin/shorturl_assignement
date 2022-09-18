import { createPool, Pool} from 'mysql';
import { DATA_SOURCES } from '../vars.config';

const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const init = () => {
  try { 
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_NAME,
    });

     
    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute =  <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
     if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
 
    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}


/**
 * gets one record from MySql
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
 export const getRecord =  async <T>(query: string, params: string[] | Object): Promise<T> => {

      const result = await execute<T[]>(query, params);
      if(result && result.length>0){
          return (result[0]);
      }
      else{
        return null;
      }
      
}



/**
 * gets multiple record from MySql
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
 export const getRecords =  async <T>(query: string, params: string[] | Object): Promise<T[]> => {

    const result = await execute<T[]>(query, params);
    if(result && result.length>0){
        return result;
    }
    else{
      return [];
    }
    
  }



/**
 * inserts record to MySql
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
 export const insertRecord =  async (query: string, params: string[] | Object): Promise<boolean> => {
  
    const result = await execute<{ affectedRows: number }>(query, params);
    if(result && result.affectedRows && result.affectedRows>0){
        return true;
    }
    else{
      return false;
    } 
  
}