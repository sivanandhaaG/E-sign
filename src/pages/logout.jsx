import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }, []);
  return <div>Loging out...</div>;
};

export default Logout;
