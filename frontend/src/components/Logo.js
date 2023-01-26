import React from 'react';
import logo from '../../src/coffee-logo.png';

const Logo = () => (
  
    <img src={logo} alt="It's Kopi Logo" 
    style={{
    height: '15%',  
    width: '15%',
    margin: '10px',
    backgroundColor: 'white',
    borderRadius: '20%'
    }}/>
  
)

export default Logo;