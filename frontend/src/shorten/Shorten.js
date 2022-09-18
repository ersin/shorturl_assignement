 import './Shorten.scss';
 import ShortUrlList from './ShortUrlList';
 import React, { Component, useRef, useState }  from 'react';

 import lib from 'url_shortening_lib';
 import {api} from './Shorten.Api'; 

 const StringHelpers = lib.StringHelpers;

function Shorten() {

  const textRef = useRef(); 
  const listRef = useRef(null);
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [startShaking, setStartShaking] = useState(false);

  let defaultItems = [];
   
  const shortenUrlClicked = () =>{
      let url = textRef.current.value; 
      if(!StringHelpers.isUrl(url)){
          setIsWrongInput(true);
          setStartShaking(true);
          setTimeout(()=>{ 
            setStartShaking(false); 
          },500);
          return;
      }
      setIsWrongInput(false);
      api.post(window.VARS.apiUrl,{url:url}).then((data)=>{
        if(data){
          urlShortened(); 
          listRef.current.onNewItemAdded(data);
        }
      });  
  }


  const urlShortened = () =>{
    textRef.current.value = ''; 
  }


  return (
    <div className="  shorten">
         
          <div className={'shorten-input '+(startShaking?' wrong ':'')}>
            <textarea ref={textRef} placeholder="Your Url starting with http/https/ftp" className="shorten-text"></textarea>
            <div className="shorten-button button button-gray" onClick={()=>shortenUrlClicked()}>Shorten</div>
          </div>
          {isWrongInput?
          <div className="warning-text">
              Please type a valid url starting with http/https/ftp
          </div>
          :null}

          <div className="shorten-desc">
              By clicking SHORTEN, you are agreeing to our 
              <a target="_blank" href="#">Terms of Service</a>, 
              <a target="_blank" href="#">Privacy Policy</a>, 
              and 
              <a target="_blank" href="#">Acceptable Use Policy</a>
          </div>
          <br/>
          <ShortUrlList ref={listRef} items={defaultItems} />
    </div>
  );
}

export default Shorten;
