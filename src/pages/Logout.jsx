import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user'); // Clear logged-in user info
    navigate('/home'); // Redirect to home page after logout
  }, [navigate]);

  return null;
};

export default Logout;
