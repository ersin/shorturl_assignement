 
 
const StringHelpers  = {
    isUrl : (str) => {
            if(!str || !str.length){  
                return false;
            }

            str = str.trim().toLowerCase();
            if(str.length<10 || str.length>2083){
                return false;
            }
            var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
            var url = new RegExp(urlRegex, 'i');
            return  url.test(str); 
    },

    copyToClipboard :  (str) => {
        return new Promise((resolve, reject) => {

                if(!str || !str.length){  
                    reject('String not valid');
                } 
                str = str.trim().toLowerCase();
                if(str.length<1){
                    reject('String not valid');
                }

                function fallbackCopyTextToClipboard(text) {
                    var result = false; 

                    var textArea = document.createElement("textarea");
                    textArea.value = text;
                    
                    // Avoid scrolling to bottom
                    textArea.style.top = "0";
                    textArea.style.left = "0";
                    textArea.style.position = "fixed";
                
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                
                    try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.debug('Fallback: Copying text command was ' + msg);
                    result = successful;
                    } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                    result = false;
                    
                    }
                
                    document.body.removeChild(textArea); 
                    return result;
                } 
                
                if (!navigator.clipboard) {
                    var result = fallbackCopyTextToClipboard(str); 
                    if(result) resolve(true);
                    else  reject('String not valid');
                }
                navigator.clipboard.writeText(str).then(function() {
                    console.debug('Async: Copying to clipboard was successful!');
                    resolve(true);
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                    reject('String not valid');
                });
                
        });
    },
}

module.exports = StringHelpers;

        // isUId: (str) => { 
        //     if(!str || !str.length){  
        //         return false;
        //     } 
        //     str = str.trim().toLowerCase();
        //     if(str.length!=8){
        //         return false;
        //     } 
        //     var regex = /^[a-z0-9-]{8}$/gi;
        //     return regex.test(str);  
        // }, 

        // isHash: (str) => {
        //     if(!str || !str.length){  
        //         return false;
        //     } 
        //     str = str.trim().toLowerCase();
        //     if(str.length!=40){
        //         return false;
        //     } 
        //     var regex = /^[a-f0-9]{40}$/gi;
        //     return regex.test(str); 
        // },

        // sha1: (str) => {
        //     if(!str || !str.length){  
        //         return null;
        //     } 
        //     str = str.trim().toLowerCase();
        //     if(str.length<8){
        //         return null;
        //     }
        //     return str;
        // },
     
// }

 