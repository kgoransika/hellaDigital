import { Card } from '@mui/material';
import React from 'react';
import ManageUser from './ManageUser.js';
import ManageProducts from './ManageProducts.js';
import ManageServices from './ManageServices.js';
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
      <div
        className="header mb-5 flex"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
        }}
      >
        <h1 className="p-4">Hella Digital - Admin Panel</h1>
        <button className="btn btn-primary ms-auto me-5 mt-4 mb-4 py-2 px-4 rounded shadow border-0">
          <span className="flex items-center">
            <ChevronLeftIcon className="h-6 w-6" />
            <span>Back</span>
          </span>
        </button>
      </div>
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
