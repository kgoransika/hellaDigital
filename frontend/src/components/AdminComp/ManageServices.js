import React from 'react';
import { getAllProductsAdmin } from '../../helper/helper';
import Pagination from '@mui/material/Pagination';

export default function ManageServices() {
  const [services, setServices] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  React.useEffect(() => {
    getAllProductsAdmin()
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
      <div className="text-center">
        <h2>Manage Services</h2>
      </div>
      <div style={div1Style}>
        <h3>Users</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
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
                      src={`http://localhost:8080/api/services/digitalProducts/image/${service.dsImg}`}
                      alt={service.dsImg}
                      className="h-20 w-20 object-cover object-center lg:h-20 lg:w-20"
                    />
                  </td>
                  <td>{service.dsName}</td>
                  <td>{service.dsSubCategory}</td>
                  <td>{service.dsPrice}</td>
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