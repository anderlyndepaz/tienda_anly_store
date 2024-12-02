import React from 'react';
import './Header.scss';  // Asegúrate de tener los estilos de SCSS aplicados

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <h1 className='titulo'>Anly Store</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
