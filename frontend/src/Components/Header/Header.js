import React,{useState} from 'react';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';



const Header = ()=>{

  
return (
    <header className="header__desk flex justify-between items-center h-20 py-6 px-8" >
        
        <div className="flex items-center header_main">
            <img src={logo}/>
            <h1 className="header__title font-semibold m-0">filmFlare</h1>
        </div>
    
    </header>
)
};


export default Header;