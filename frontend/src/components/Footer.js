/* src/components/Footer.js */
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {currentYear} Universidad Valle del Momboy | Gestión de Incidencias
        </p>
        <p>Desarrollado por Moisés Terán</p>
      </div>
    </footer>
  );
};

export default Footer;