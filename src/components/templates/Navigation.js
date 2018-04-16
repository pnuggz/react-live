import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav id="mainNav2" className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="brand">
          <img src="/assets/logo_new.png" className="image-responsive logo-header" />
        </a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="menu-left">
            <Link to='/lobby'>LOBBY</Link>
          </li>
          <li className="menu-left">
            <Link to='/games'>GAMES</Link>
          </li>
          <li className="menu-left">
            <Link to='/help'>HELP</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);


export default Navigation;