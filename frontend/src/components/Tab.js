import React, { Component, useRef, useState }  from 'react';
 

function Tab(props) {

  const textRef = useRef(); 
  const listRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(0); 

  let defaultItems = [];
   
  const onTabClicked = (ind) =>{
    setSelectedTab(ind);
  }
 


  return ( 
    <div className="tabs"> 

        <div className="tab-headers">  
            {props.children.map((t,i)=> 
                  <div key={'tabh'+i} onClick={()=>onTabClicked(i)} className={'tab-header' +(selectedTab==i?' selected ':'')}>{t.props.label}</div> 
                  )}
        </div>

        <div className="tab-contents"> 
            {props.children.map((t,i)=>  
                    <div key={'tabc'+i} className={'tab-content' +(selectedTab==i?' selected ':'')}>{t.props.children}</div> 
            )}
        </div>  
    </div>
    
  );
}

export default Tab;
