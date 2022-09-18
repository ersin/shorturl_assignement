export const ShortUrlQueries = {

    GetAll: `
    SELECT
        uid, url, hash
    FROM SHORTURL.SHORTURL
    `,

    GetByUId: `
    SELECT
        uid, url, hash
    FROM SHORTURL.SHORTURL
    WHERE
    uid = ? 
    `,

    GetByUrl:`
    SELECT
        uid, url, hash
    FROM SHORTURL.SHORTURL
    WHERE
    hash = ?
    `,
  
    Add: `
    INSERT INTO SHORTURL.SHORTURL (uid, url, hash)
      VALUES (?, ?, ?);
    `
  };