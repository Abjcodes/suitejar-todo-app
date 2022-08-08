import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

//If no user is logged in, function returns to sign in page
const Protected = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />;
  }

  return children;
};

export default Protected;