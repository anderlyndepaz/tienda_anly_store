import React from 'react';
import '../../../styles/Header.scss';  
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
      <img 
          src={logo}
          alt="Logo Anly Store"
          className="logo"
        />
          <h1 className='titulo'>Anly Store</h1>
      </div>
    </header>
  );
};

export default Header;
