import React from 'react';
import { getAllUsers } from '../../helper/helper';
import Pagination from '@mui/material/Pagination';
import AdminNavbar from './AdminNavbar.js';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ManageUser() {
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUserClick(user) {
    setSelectedUser(user);
    setModalShow(true);
    console.log(user);
  }

  const div1Style = {
    padding: '20px',
    width: '90%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    users.data && users.data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const totalPages = Math.ceil(users.data && users.data.length / itemsPerPage);

  const handleVerifyUser = async () => {
    try {
      // Make an API request to update idVerified
      const response = await axios.put(
        `/api/admin/users/${selectedUser._id}/verify`
      );
      setSuccessMessage('User ID verified successfully');

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <style>
        {`
        td {
            border: 1px solid #dee2e6;
            padding: 10px;
        }
        `}
      </style>
      <AdminNavbar />
      <div className="text-center">
        <h2>Manage Users</h2>
      </div>
      <div style={div1Style}>
        <h3>Users</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.verified}</td>
                  <td
                    className="text-blue-500"
                    style={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleUserClick(user)}
                  >
                    View
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
      {selectedUser && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          user={selectedUser}
        />
      )}
    </>
  );

  function MyVerticallyCenteredModal({ show, onHide, user }) {
    return (
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="m-2">
                <span className="flex">
                  <label className="block text-gray-700 text-sm font-bold mb-2 mr-1">
                    Username:
                  </label>
                  <p>{user.username}</p>
                </span>
                <span className="flex">
                  <label className="block text-gray-700 text-sm font-bold mb-2 mr-1">
                    Email:
                  </label>
                  <p>{user.email}</p>
                </span>
                <div className="flex gap-5">
                  <span>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Profile Image
                    </label>
                    <img
                      src={user.profile}
                      alt="profile Img"
                      className="
                        w-40 h-40 border-2 border-gray-300 rounded-full object-cover"
                    />
                  </span>
                  <span>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      ID Image
                    </label>
                    <img
                      src={user.idImg}
                      alt="ID Img"
                      style={{
                        width: '390px',
                        height: '240px',
                      }}
                      className="border-2 border-gray-300 rounded-md object-fill"
                    />
                  </span>
                </div>
                {successMessage && (
                  <p className="text-green-500 text-center mt-5">
                    {successMessage}
                  </p>
                )}
                <button
                  className="bg-blue-600 text-white p-2 rounded-md mt-3 w-full text-center"
                  onClick={handleVerifyUser}
                >
                  Verify ID
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
