 
 import React, { Component, useRef, useState }  from 'react';
 
 import Tab from '../components/Tab'; 
 import Shorten from './Shorten'; 

function Main() {
 
 
  return (
    <div className="page ">
        
       {/* <Tab>
            <div label="Single URL"> */}
              <Shorten />
            {/* </div>
            <div label="Multiple"> 
             
            </div>
       </Tab> */}
         
    </div>
  );
}

export default Main;
