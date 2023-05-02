import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../../helper/helper';
import { getProductBasedOnOwner } from '../../helper/helper';
import NoServicesAdded from '../../assets/Curious-bro.png';

export default function ListingsComp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [listing, setListing] = useState('');

  useEffect(() => {
    getUsername().then((decodedToken) => {
      setUsername(decodedToken.username);
      setRole(decodedToken.role);
      getProductBasedOnOwner({ username: decodedToken.username })
        .then((data) => {
          setListing(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const handleClick = () => {
    navigate('/listings/addDigitalProduct');
  };

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
  };

  const thStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#f8f8f8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '14px',
    letterSpacing: '1px',
    borderBottom: '2px solid #dee2e6',
  };

  const tdStyle = {
    padding: '12px 15px',
    fontSize: '14px',
    borderBottom: '1px solid #dee2e6',
  };

  /* const listings = [
    {
      id: 1,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
    {
      id: 2,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
    {
      id: 3,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
    {
      id: 4,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
    {
      id: 5,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
    {
      id: 6,
      name: 'testProduct',
      href: '#',
      price: '$$$',
      stock: '12',
      category: '65',
      imageSrc:
        'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'testProduct',
    },
  ]; */

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
        <div style={{ display: 'flex' }}>
          <div style={div1Style}>
            <div style={{ display: 'flex' }}>
              <h3>Your listings</h3>
              <button
                style={{ backgroundColor: '#0066ff' }}
                className="ms-auto text-white py-2 px-4 rounded-lg inline-flex"
                onClick={handleClick}
              >
                <span className="">Add new product</span>
                <PlusIcon className="ml-1 h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {listing && listing.data && listing.data.length === 0 ? ( //if no listings
              <>
                <div className="text-center mt-20">
                  <img
                    className="h-60 w-60 justify-center m-auto"
                    src={NoServicesAdded}
                    alt="No Services Added"
                  />
                  <p className="text-gray-500 text-xl text-center m-10">
                    You have not added any products yet!
                  </p>
                </div>
              </>
            ) : (
              //if there are listings
              <>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Product Image</th>
                      <th style={thStyle}>Product Name</th>
                      <th style={thStyle}>Product Category</th>
                      <th style={thStyle}>Stocks</th>
                      <th style={thStyle}>Product Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listing &&
                      listing.data &&
                      listing.data.map((item) => (
                        <tr key={item.id}>
                          <td style={tdStyle}>
                            <img
                              src={`http://localhost:8080/api/products/digitalProducts/image/${item.dpImg}`}
                              alt={item.dpImg}
                              className="h-12 w-12 object-cover object-center"
                            />
                          </td>
                          <td style={tdStyle}>{item.dpName}</td>
                          <td style={tdStyle}>{item.dpCategory}</td>
                          <td style={tdStyle}>{item.dpQuantity}</td>
                          <td style={tdStyle}>{item.dpPrice}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
