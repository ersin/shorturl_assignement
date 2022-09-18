export const api = {

    get: async (url)=>{
       let response = await fetch(url);
       if(response.status===200){
            let data = await response.json();
            if(data===null){
                return null;
            }
            return data;
       }
       else{
            return null;
       }
    },
 
    post: async (url, data)=>{
        let response = await fetch(url,{ 
            method: 'POST',    
            headers: { 'Content-Type': 'application/json'  },    
            body: JSON.stringify(data)  
          });
        if(response.status===200){
             let data = await response.json();
             if(data===null ){
                 return null;
             }
             return data;
        }
        else{
             return null;
        }
     },

}



