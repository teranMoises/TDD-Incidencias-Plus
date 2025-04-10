import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Se verifica si existe la cookie 'token'
  const isAuthenticated = document.cookie.includes('token=');
  //console.log('cookie:', document.cookie);
  //console.log('isAuthenticated:', isAuthenticated); // Para depuración
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
