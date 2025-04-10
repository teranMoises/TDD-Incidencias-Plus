import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* <img src={`${process.env.PUBLIC_URL}/logo512-removebg-preview.png`} alt="Landing" className="landing-image" /> */}
      <h1>Bienvenido al Sistema de Gestión de Incidencias</h1>
      <p>Inicia sesión o regístrate para acceder a la aplicación.</p>
      <div className="landing-buttons">
        <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
        <Link to="/register" className="btn-secondary">Registrarse</Link>
      </div>
    </div>
  );
};

export default LandingPage;
