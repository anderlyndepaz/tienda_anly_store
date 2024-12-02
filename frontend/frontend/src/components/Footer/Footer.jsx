import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h1>Anly Store</h1>
                    <p>La mejor tienda para tus compras online.</p>
                </div>

                <div className="footer-links">
                    <ul>
                        <li><Link to="/">Productos</Link></li>
                        <li><Link to="/cesta">Cesta</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-socials">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook"></i> 
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram"></i> 
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter"></i> 
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Anly Store. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
