import React from 'react';
import { getAllServicesAdmin } from '../../helper/helper';
import Pagination from '@mui/material/Pagination';
import AdminNavbar from './AdminNavbar.js';

export default function ManageServices() {
  const [services, setServices] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  React.useEffect(() => {
    getAllServicesAdmin()
      .then((data) => {
        setServices(data);
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
    services.data && services.data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const totalPages = Math.ceil(
    services.data && services.data.length / itemsPerPage
  );

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
        <h2>Manage Services</h2>
      </div>
      <div style={div1Style}>
        <h3>Services</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Package 1</th>
              <th>Package 2</th>
              <th>Package 3</th>
              <th>Violation</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((service) => (
                <tr key={service.id}>
                  <td>{service._id}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/api/services/digitalServices/${service.dsImg}`}
                      alt={service.dsImg}
                      className="h-20 w-20 object-cover object-center lg:h-20 lg:w-20"
                    />
                  </td>
                  <td>{service.dsName}</td>
                  <td>{service.dsSubCategory}</td>
                  <td>
                    {service.dsPkg1Name}
                    <br />
                    Delivery time: {service.dsPkg1Dt} Days
                    <br />
                    Revisions: {service.dsPkg1Revisions}
                  </td>
                  <td>
                    {service.dsPkg2Name}
                    <br />
                    Delivery time: {service.dsPkg2Dt} Days
                    <br />
                    Revisions: {service.dsPkg2Revisions}
                  </td>
                  <td>
                    {service.dsPkg3Name}
                    <br />
                    Delivery time: {service.dsPkg3Dt} Days
                    <br />
                    Revisions: {service.dsPkg3Revisions}
                  </td>
                  <td>false</td>
                  <td
                    className="text-red-500"
                    style={{
                      textDecoration: 'underline',
                      textUnderlineOffset: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
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
