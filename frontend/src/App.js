 
import './App.scss';
import ShortenMain from './shorten/Main';
import React, { Component }  from 'react';


function App() {
  return (
    <div className="app">
      <div className="app-header">
        <img src="./logo.jpg" className="app-logo" alt="logo" />

        <div className='menu'>
            <div className='menu-item selected'>Home</div>
            <div className='menu-item'>Why Us?</div>
            <div className='menu-item'>Pricing</div>
            <div className='menu-item'>Resources</div> 
        </div>

        <div className='account'> 
            <div className='menu-item'>Login</div>
            <div className='menu-item'>Register</div>
        </div>
       
      </div>
      
        <ShortenMain />  
    </div>
  );
}

export default App;
