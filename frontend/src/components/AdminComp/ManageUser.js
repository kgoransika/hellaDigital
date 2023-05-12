import React from 'react';
import { getAllUsers } from '../../helper/helper';
import Pagination from '@mui/material/Pagination';
import AdminNavbar from './AdminNavbar.js';

export default function ManageUser() {
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

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
                  <td>false</td>
                  <td
                    className="text-blue-500"
                    style={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      cursor: 'pointer',
                    }}
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
    </>
  );
}
