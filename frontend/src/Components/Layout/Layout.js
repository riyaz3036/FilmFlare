import React from 'react'
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Routers from '../../router/Routers';
import Aside from './../Aside/Aside.js';
import './layout.css'; 

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="sidebar"><Aside /></div>
      <div className="main-content">
        <Routers />
      </div>

      <div className="footer__layout"><Footer /></div>
    </div>
  )
};

export default Layout;
