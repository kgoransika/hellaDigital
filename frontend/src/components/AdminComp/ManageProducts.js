import React from 'react';
import { getAllProductsAdmin } from '../../helper/helper';
import Pagination from '@mui/material/Pagination';

export default function ManageProducts() {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  React.useEffect(() => {
    getAllProductsAdmin()
      .then((data) => {
        setProducts(data);
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
    products.data && products.data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const totalPages = Math.ceil(
    products.data && products.data.length / itemsPerPage
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
        <h2>Manage Products</h2>
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
              <th>Copyright Violation</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((product) => (
                <tr key={product.id}>
                  <td>{product._id}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/api/products/digitalProducts/image/${product.dpImg}`}
                      alt={product.dpImg}
                      className="h-20 w-20 object-cover object-center lg:h-20 lg:w-20"
                    />
                  </td>
                  <td>{product.dpName}</td>
                  <td>{product.dpCategory}</td>
                  <td>{product.dpPrice}</td>
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
