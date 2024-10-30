import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authcontext';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8800/api/auth/logout',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;