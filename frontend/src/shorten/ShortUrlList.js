 import './Shorten.scss'; 
 import React, { Component, useImperativeHandle, forwardRef,useState }  from 'react';

 import lib from 'url_shortening_lib';  
 const StringHelpers = lib.StringHelpers;


const ShortUrlList =  forwardRef((props, ref) => {

  const [items, setItems] = useState(props.items);
  const [canCopy, setCanCopy] = useState(true);

  useImperativeHandle(ref, () => {
      return {
        onItemsChanged: onItemsChanged,
        onNewItemAdded:onNewItemAdded
      }
  }); 

  const onItemsChanged = (newItems) => {   
    setItems([...newItems]); 
  }; 

  const onNewItemAdded = (newItem) => {  
    
    setItems([newItem, ...items.filter(i=>i.hash!=newItem.hash)]); 
  };


  const onCopyClicked =(str) =>{ 
        StringHelpers.copyToClipboard(str).then(AS => {
          setCanCopy(true); 
          alert('copied');
        })
        .catch(error => {
          setCanCopy(false);
        }); 
  }

  let shortUrl = window.VARS.shortUrl;
  
  return (
    <div className="shorturl-list">
        {items.map(i=>
          <div className="item" key={i.hash}>
            <div className="url" title={i.url}>{i.url}</div>
            <div className="short-url"><a target="_blank" href={shortUrl+i.uid}>{shortUrl+i.uid}</a> </div>
            {canCopy? 
              null:
              <div className="short-url"><input readOnly={true} value={shortUrl+i.uid} /> </div>
            }
            <div className="copy button button--sub" onClick={()=> onCopyClicked(shortUrl+i.uid)}>Copy</div>
          </div>
          )}

          
    </div>
  );
});

export default ShortUrlList;
