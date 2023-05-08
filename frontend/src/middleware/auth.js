import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { getUsername } from '../helper/helper';

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!token && role !== 'admin') {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }
  return children;
};

export const SellerRoute = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!token) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }

  if (!username) {
    return null; // Or show a loading spinner or something similar
  }

  return role === 'dps' || role === 'dsp' ? (
    children
  ) : (
    <Navigate to={'/'} replace={true} />
  );
};
