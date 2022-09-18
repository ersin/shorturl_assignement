 const ShortUrlCache =  {
    /**
     * All UIDs stored inside this list as Key. and Value is True. 
     */
    UIDList : [],

    /**
     * All url hashes(sha1) stored inside this list as Key. and Value is True. 
     */
     hashList : [],

    /**
     * Used to store generated UIDs. ShortUrlCache.UIDList storing data like [uid]=true.
     * @param {string} uid 
     */
    addUId: function(uid){
        ShortUrlCache.UIDList[uid] = true;
    },    
    /**
    * Used to find generated UID. ShortUrlCache.UIDList storing data like [uid]=true.
    * We don't have to loop for array inside NodeJS. Instead we are using uid as array key. this works faster than for.
    * @param {string} uid 
    */
    checkUId: function(uid){
        return ShortUrlCache.UIDList[uid];
    },


    /**
     * Used to store generated url hashes (sha1). ShortUrlCache.hashList storing data like [hash]=true.
     * @param {string} hash 
     */
    addHash: function(hash){
        ShortUrlCache.hashList[hash] = true;
    },
    /**
    * Used to find generated url hashes(sha1). ShortUrlCache.hashList storing data like [hash]=true.
    * We don't have to loop for array inside NodeJS. Instead we are using hash as array key. this works faster than for.
    * @param {string} hash 
    */
    checkHash: function(hash){
        return ShortUrlCache.hashList[hash];
    }
}; 
exports.ShortUrlCache =ShortUrlCache;
