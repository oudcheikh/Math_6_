import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Vérifiez si les données utilisateur existent dans localStorage
  const isUserRegistered = localStorage.getItem('user');

  return isUserRegistered ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;