import { Card } from '@mui/material';
import React from 'react';
import ManageUser from './ManageUser.js';
import ManageProducts from './ManageProducts.js';
import ManageServices from './ManageServices.js';
import AdminNavbar from './AdminNavbar.js';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  const cardStyle = {
    padding: '20px',
    width: '50%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const handleManageUserClick = () => {
    navigate('/admin/manageUsers');
  };

  const handleManageProductsClick = () => {
    navigate('/admin/manageProducts');
  };

  const handleManageServicesClick = () => {
    navigate('/admin/manageServices');
  };

  return (
    <>
      <AdminNavbar />
      <div className="mt-10 ml-20 mr-20">
        <>
          <Card style={cardStyle} onClick={handleManageUserClick}>
            <h3>Manage Users</h3>
            <p>Admin Panel</p>
          </Card>
          <Card style={cardStyle} onClick={handleManageProductsClick}>
            <h3>Manage Products</h3>
            <p>Admin Panel</p>
          </Card>
          <Card style={cardStyle} onClick={handleManageServicesClick}>
            <h3>Manage Services</h3>
            <p>Admin Panel</p>
          </Card>
        </>
      </div>
    </>
  );
}
