import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';

export default function ListingsComp() {
  const div1Style = {
    padding: '20px',
    width: '100%',
    height: '100vh',
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

  const listings = [
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
  ];

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
              >
                <span className="">Add new product</span>
                <PlusIcon className="ml-1 h-6 w-6" aria-hidden="true" />
              </button>
            </div>

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
                {listings.map((listing) => (
                  <tr>
                    <td style={tdStyle}>
                      <img
                        src={listing.imageSrc}
                        alt={listing.imageAlt}
                        className="h-12 w-12 object-cover object-center"
                      />
                    </td>
                    <td style={tdStyle}>{listing.name}</td>
                    <td style={tdStyle}>{listing.category}</td>
                    <td style={tdStyle}>{listing.stock}</td>
                    <td style={tdStyle}>{listing.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
